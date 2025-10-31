# 流式输出（SSE）

实现流式输出有两种库

- [fetch-event-stream](https://www.npmjs.com/package/fetch-event-stream)：基于 Fetch API，适用于现代浏览器环境
- [fetch-event-source](https://www.npmjs.com/package/fetch-event-source)：基于 EventSource，适用于更广泛的环境

还有一些其他的方法：

- 直接使用原生的 [EventSource API](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)
  优点：浏览器原生支持，不需要额外库
  缺点：只支持GET请求（想POST？没门！😅）、不能自定义请求头（想带token？抱歉！）只支持UTF-8编码
- Fetch API + ReadableStream - 最灵活但手酸
    优点：完全自定义请求和响应处理
    缺点：实现复杂，需处理流解析和错误管理

## React 示例

```jsx
 const { start: startOptimize, stop: stopOptimize, loading: optimizeLoading } = useSseWithEvent("/api/v1/aiBot/optimizePrompt");
     const runOptimizeFlow = async ({ prompt, requirement, setTarget }: { prompt?: string; requirement?: string; setTarget: React.Dispatch<React.SetStateAction<string>> }) => {
        // 开始前清空目标展示区，开启流式
        setTarget('');
        try { stopOptimize(); } catch (_) { }

        // 输出节奏控制：将服务端增量累积到 fullBuffer，按固定速率“打字机”式地展示到 UI
        // 可调整以下两项以控制速度（示例：每 50ms 展示 2 个字符 ≈ 40 chars/s，偏慢）：
        const TICK_MS = 50; // 每次展示的时间间隔（毫秒）
        const CHARS_PER_TICK = 2; // 每次展示的字符数量

        let fullBuffer = '';
        let shownLength = 0;
        let tickerId: number | null = null;
        let finishedFlag = false; // 服务端宣告完成后仍可继续以既定速度展示剩余内容

        const stopTickerIfDone = () => {
            if (tickerId != null && shownLength >= fullBuffer.length && finishedFlag) {
                clearInterval(tickerId);
                tickerId = null;
            }
        };

        const ensureTicker = () => {
            if (tickerId != null) return;
            tickerId = window.setInterval(() => {
                // 若当前已展示到末尾，等待更多内容或等待 finishedFlag
                if (shownLength >= fullBuffer.length) {
                    stopTickerIfDone();
                    return;
                }
                // 逐步推进展示长度
                shownLength = Math.min(shownLength + CHARS_PER_TICK, fullBuffer.length);
                setTarget(fullBuffer.slice(0, shownLength));
                stopTickerIfDone();
            }, TICK_MS);
        };

        try {
            const data: any = { botId: detail?.data?.id };
            if (typeof prompt === 'string') data.prompt = prompt;
            if (typeof requirement === 'string') data.requirement = requirement;

            await startOptimize({
                data,
                onMessage: (msg: string) => {
                    const handleUpd = (updRaw: { text: string; replace: boolean; status?: string }) => {
                        if (!updRaw || !updRaw.text) return;
                        setOptimizeInProgress(true);
                        // 更新累积缓冲
                        if (updRaw.replace) {
                            fullBuffer = updRaw.text;
                            if (shownLength > fullBuffer.length) shownLength = fullBuffer.length;
                        } else {
                            fullBuffer = (fullBuffer || '') + updRaw.text;
                        }
                        // 确保打字机 ticker 启动
                        ensureTicker();

                        // 处理服务端状态通知
                        const s = (updRaw.status || '').toString().toUpperCase();
                        if (s === 'END' || s === 'FINISHED' || s === 'COMPLETE' || s === 'DONE' || s === 'MIDDLE-OVER') {
                            finishedFlag = true;
                            setOptimizeInProgress(false);
                            try { stopOptimize(); } catch (_) { }
                            stopTickerIfDone();
                        }
                    };

                    // 由 streaming helper 传入的 msg 通常是一个 JSON 字符串：{ event, data }
                    try {
                        const payload = JSON.parse(msg);
                        const upd = extractUpdate(payload?.data ?? '');
                        handleUpd(upd);
                    } catch (_) {
                        // 如果上层不是 JSON（极少数情况），直接把整段当作 data 解析
                        const upd = extractUpdate(msg);
                        handleUpd(upd);
                    }
                },
                onError: () => {
                    message.error('优化提示词失败');
                    finishedFlag = true;
                    try { setOptimizeInProgress(false); } catch (_) { }
                    stopTickerIfDone();
                },
                onFinished: () => {
                    // 服务端完成：不强制立刻全部展示，保持既定速度收尾；若你希望立刻展示完，可在此处将 shownLength=fullBuffer.length 并 setTarget(fullBuffer)
                    finishedFlag = true;
                    try { setOptimizeInProgress(false); } catch (_) { }
                    stopTickerIfDone();
                }
            });
        } catch (err) {
            console.error('runOptimizeFlow error:', err);
            message.error('优化提示词异常');
        } finally {
            // 保障：组件切换或异常时清理 ticker
            // 注意：此 finally 在 startOptimize 结束后才会触发，正常流程中 ticker 也会被 stopTickerIfDone 清理
        }
    };

    // 解析 SSE data（服务器返回的每条 data 字符串），仅以 fullContent 为主进行流式展示
    const extractUpdate = (raw: string): { text: string; replace: boolean; status?: string } => {
        if (!raw && raw !== '0') return { text: '', replace: false };

        const toStr = (val: any) => (val == null ? '' : String(val));
        const decodeMaybeEscaped = (val: any): string => {
            const s = toStr(val);
            // 优先尝试把形如 "..." 的转义字符串解码
            try {
                const maybe = JSON.parse(s);
                if (typeof maybe === 'string') return maybe;
            } catch (_) { }
            // 常见反转义
            return s
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
                .replace(/\\t/g, '\t')
                .replace(/\\\"/g, '"');
        };

        // 结构化 JSON 的情况
        try {
            const obj = JSON.parse(raw);
            // 直接就是字符串
            if (typeof obj === 'string') return { text: decodeMaybeEscaped(obj), replace: false };

            // 可能出现包一层 data 的情况
            const inner = (obj && typeof obj === 'object' && 'data' in obj && obj.data) ? obj.data : obj;

            // 如果 inner 是字符串（例如 data 为字符串形式的 JSON），尝试解析一层
            let parsedInner: any = inner;
            if (typeof inner === 'string') {
                try {
                    parsedInner = JSON.parse(inner);
                } catch (_) {
                    parsedInner = inner;
                }
            }

            // 现在 parsedInner 可能是对象或字符串
            if (parsedInner && typeof parsedInner === 'object') {
                // status 字段优先读取（若存在）
                const status = parsedInner.status || parsedInner.state || undefined;
                if (parsedInner.fullContent != null) {
                    return { text: decodeMaybeEscaped(parsedInner.fullContent), replace: true, status };
                }
                if (parsedInner.messageContent != null) {
                    return { text: decodeMaybeEscaped(parsedInner.messageContent), replace: true, status };
                }
                // 其次使用常见增量字段（追加）
                if (parsedInner.delta != null) return { text: decodeMaybeEscaped(parsedInner.delta), replace: false, status };
                if (parsedInner.text != null) return { text: decodeMaybeEscaped(parsedInner.text), replace: false, status };
                if (parsedInner.content != null) return { text: decodeMaybeEscaped(parsedInner.content), replace: false, status };
                if (parsedInner.message != null) return { text: decodeMaybeEscaped(parsedInner.message), replace: false, status };
            } else {
                // parsedInner 是字符串：当作纯文本返回
                return { text: decodeMaybeEscaped(parsedInner), replace: false };
            }
        } catch (_) { /* raw 不是 JSON，降级为纯文本 */ }

        // 非 JSON：按纯文本追加
        return { text: decodeMaybeEscaped(raw), replace: false };
    }

    const handleAIPrompt = async () => {
        await runOptimizeFlow({ prompt: systemPrompt, requirement: promptInput || '', setTarget: setAiGeneralPrompt });
    }

```

useHook

```js
s/useSseWithEvent.ts
import { events } from "fetch-event-stream";
import { isBrowser } from "../libs/ssr.ts";
import { useRef, useState } from "react";

type StartParams = {
    data: any,
    onMessage: (message: string) => void,
    onError?: (err?: Error) => void,
    onFinished: () => void,
    onEvent?: (event?: any, data?: string | undefined) => void,
}

// 构造基础地址：如果未配置 VITE_APP_SERVER_ENDPOINT，则保持相对路径，走同源代理
const baseFromEnv = (import.meta as any).env?.VITE_APP_SERVER_ENDPOINT as string | undefined;
const baseUrl = baseFromEnv ? (baseFromEnv.endsWith('/') ? baseFromEnv : `${baseFromEnv}/`) : '';
const authKey = `${import.meta.env.VITE_APP_AUTH_KEY || "authKey"}`;
const tokenKey = `${import.meta.env.VITE_APP_TOKEN_KEY}`;

export const useSseWithEvent = (url: string, headers?: any, options?: any) => {
    // 持有当前活动的 AbortController；每次 start 都生成一个新的，避免被上一次 stop 后永久处于 aborted 状态
    const ctrlRef = useRef<AbortController | null>(null);
    const [loading, setLoading] = useState(false)

    let sseUrl = url;
    if (sseUrl.startsWith("/") && baseUrl) {
        sseUrl = baseUrl + sseUrl.substring(1);
    }

    const token = isBrowser ? localStorage.getItem(authKey) : null;

    const sseHeaders: Record<string, string> = {
        Authorization: token || "",
        [tokenKey]: token || "",
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
        ...headers
    };

    return {
        loading: loading,
        stop: () => {
            try {
                ctrlRef.current?.abort("by stop() invoked!");
            } catch (e) { /* ignore */ }
            setLoading(false)
        },
        start: async (params: StartParams) => {
            try {
                setLoading(true)
                // 如果上一次还未结束，先中止
                try { ctrlRef.current?.abort("by start() - previous aborted"); } catch (e) { /* ignore */ }
                // 为本次请求创建新的 controller
                ctrlRef.current = new AbortController();
                const res = await fetch(sseUrl, {
                    method: "post",
                    signal: ctrlRef.current.signal,
                    headers: sseHeaders,
                    body: JSON.stringify(params.data),
                });

                if (!res.ok) {
                    try {
                        // eslint-disable-next-line no-console
                        console.error("SSE fetch failed:", res.status, res.statusText);
                    } catch (e) {
                        // ignore
                    }
                    params.onError?.();
                    return;
                }
                try {
                    const msgEvents = events(res, ctrlRef.current.signal);
                    for await (const event of msgEvents) {

                        if (event.data && "[DONE]" !== event.data.trim()) {
                            if (options === 'ollamaInstall') {
                                params.onMessage(event.data)
                            } else {
                                const resp = {
                                    event: event.event,
                                    data: event.data,
                                }

                                params.onMessage(JSON.stringify(resp));
                            }

                        }
                    }
                } catch (err) {
                    console.error("error", err);
                    params.onError?.()
                } finally {
                    params.onFinished();
                }
            } finally {
                setLoading(false)
            }

        }
    }
}
```

## Vue 示例

### 原生 fetch + ReadableStream

```vue
<!-- 具体在 F:\projects\aitraining_web\src\views\integration\inputText.vue -->

<template>
<div class="input-left">
    <div class="input-dialog">
        <div v-for="(item, index) in chatHistory" :key="item.id" style="">
            <div v-if="item.userRole === 'STUDENT'" class="dialog-line">
                <div class="dialog-bubble" v-html="item.content">
                </div>
                <span class="dialog-user">我</span>
            </div>
            <div v-else class="dialog-reply">
                <div class="reply-img">
                    <img src="@/assets/image/home/1.png" alt="">
                </div>
                <!-- 使用 marked 将流式文本转为 Markdown HTML -->
                <div class="reply-text" v-html="marked.parse(item.content)"></div>

            </div>
        </div>
    </div>
    <div class="input-bottom">
        <input v-model="input" type="text" class="input-box" @keyup.enter="send"
            :disabled="isGenerating" placeholder="有任何问题，都可以询问哦~" />
        <div class="input-btns">
            <button class="input-btn" @click="copy">复制</button>
            <button class="input-btn" @click="repeatGen">重新生成</button>
            <!-- <button class="input-btn" @click="save">保存</button> -->
        </div>
        <!-- 当正在生成时，在输入框上方展示气泡提示 -->
        <div v-if="isGenerating" class="generating-bubble">
            <div class="bubble-icon">
                <img src="@/assets/image/home/1.png" alt="">
            </div>
            <div class="bubble-text">正在生成中<span class="dots"><i>.</i><i>.</i><i>.</i></span></div>
        </div>

        <div class="send-img" @click="send" :class="{ disabled: isGenerating }">
            <img src="@/assets/image/intelligent/send.png" alt="">
        </div>
    </div>
</div>
</template>

<script setup lang="js">
import 'highlight.js/styles/github-dark.css' // 引入代码高亮样式
import hljs from 'highlight.js'
import { marked } from 'marked'

// 配置 marked，启用代码高亮
marked.setOptions({
    highlight: (code, lang) => {
        // 如果指定了语言且 highlight.js 支持，则高亮代码
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value
        }
        // 未指定语言时，尝试自动检测
        return hljs.highlightAuto(code).value
    },
    breaks: true, // 支持换行符转换为 <br>
    gfm: true // 启用 GitHub Flavored Markdown 语法
})

const getAiChat = async (data) => {
    answer.value = '';
    isGenerating.value = true;
    // 取消上一个请求（如果存在）
    if (aiAbortController) {
        try { aiAbortController.abort(); } catch (e) { /* ignore */ }
        aiAbortController = null;
    }
    aiAbortController = new AbortController();

    // 在 chatHistory 中添加一条占位的教师回复，并在流到来时更新它
    const teacherIndex = chatHistory.value.push({ userRole: 'TEACHER', content: '' }) - 1;
    const token = localStorage.getItem('token') || '';
    try {
        // 使用原生 fetch + ReadableStream 来稳健解析 SSE，兼容跨 chunk 拆分
        const url = '/course/aitrainapi/internship/text';
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'text/event-stream',
                token: token,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: aiAbortController.signal
        });

        if (!resp.ok) {
            throw new Error(`Failed to fetch SSE endpoint: ${resp.status} ${resp.statusText}`);
        }

        const contentType = resp.headers.get('content-type') || '';
        if (!contentType.includes('text/event-stream')) {
            // 仍然尝试流式读取，但记录警告
            console.warn('response content-type is not text/event-stream:', contentType);
        }

        const reader = resp.body.getReader();
        const utf8Decoder = new TextDecoder('utf-8');
        let buffer = '';
        let closed = false;

        // 处理流中完整的 SSE 事件块
        const processEventBlock = (raw) => {
            // raw 是单个事件块的原始文本（不包含后面的空行分隔）
            const lines = raw.split(/\r?\n/);
            let eventName = 'message';
            const dataLines = [];
            for (let line of lines) {
                if (line === '') continue;
                if (line.startsWith(':')) continue; // 注释行
                const idx = line.indexOf(':');
                if (idx === -1) {
                    // 没有冒号，则当作 data 的一部分（兼容非标准实现）
                    dataLines.push(line);
                    continue;
                }
                const field = line.slice(0, idx).trim();
                let value = line.slice(idx + 1);
                if (value.startsWith(' ')) value = value.slice(1);
                if (field === 'event') eventName = value || 'message';
                else if (field === 'data') dataLines.push(value);
                // 忽略 id/retry 等字段
            }

            const eventData = dataLines.join('\n');
            // 恢复一些后端可能转义的换行和制表
            const normalized = eventData.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');

            // 如果是我们关注的 content 事件或默认 message，追加到 answer
            if (eventName === 'content' || eventName === 'message') {
                answer.value += normalized;
                // 渲染累计的 markdown 为 HTML（流式显示）
                try {
                    chatHistory.value[teacherIndex].content = marked.parse(answer.value);
                } catch (e) {
                    // 如果解析失败，回退为原始文本
                    chatHistory.value[teacherIndex].content = answer.value;
                }
                // 滚动到底部
                scrollToBottom();
            } else {
                // 其它事件类型可在此处理（如 done/error）
                // console.log('event', eventName, normalized);
            }
        };

        while (!closed) {
            const { done, value } = await reader.read();
            if (done) {
                closed = true;
            }
            if (value) {
                buffer += utf8Decoder.decode(value, { stream: true });
            }

            // 查找事件边界（SSE 事件以空行分隔）
            let boundaryIdx;
            while ((boundaryIdx = buffer.indexOf('\n\n')) !== -1 || (boundaryIdx = buffer.indexOf('\r\n\r\n')) !== -1) {
                // 取到一个完整事件块
                // 计算分隔长度（2 或 4）
                let sepLen = 2;
                if (buffer.substr(boundaryIdx, 4) === '\r\n\r\n') sepLen = 4;
                const rawEvent = buffer.slice(0, boundaryIdx);
                buffer = buffer.slice(boundaryIdx + sepLen);
                processEventBlock(rawEvent);
            }
        }

        // 流关闭后，如果 buffer 中还有残余，作为最后一个事件处理
        if (buffer.trim().length > 0) {
            processEventBlock(buffer);
            buffer = '';
        }

    } catch (err) {
        if (err.name === 'AbortError') {
            answer.value += '\n\n[已取消]';
        } else {
            console.error('流式请求错误：', err);
            answer.value = '调用失败：' + (err.message || '未知错误');
        }
    } finally {
        isGenerating.value = false;
        aiAbortController = null;
    }

}

</script>

```

### fetch-event-source 实现

```vue
<template>
<!-- 省略模板代码，与上例类似 -->
</template>

<script setup lang="js">
import { fetchEventSource } from 'fetch-event-source';
import 'highlight.js/styles/github-dark.css' // 引入代码高亮样式
import hljs from 'highlight.js'
import { marked } from 'marked'

// 配置 marked，启用代码高亮
marked.setOptions({
    highlight: (code, lang) => {
        // 如果指定了语言且 highlight.js 支持，则高亮代码
        if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value
        }
        // 未指定语言时，尝试自动检测
        return hljs.highlightAuto(code).value
    },
    breaks: true, // 支持换行符转换为 <br>
    gfm: true // 启用 GitHub Flavored Markdown 语法
})

const getAiChat = async (data) => {
    answer.value = '';
    isGenerating.value = true;
    // 取消上一个请求（如果存在）
    if (aiAbortController) {
        try { aiAbortController.abort(); } catch (e) { /* ignore */ }
        aiAbortController = null;
    }
    aiAbortController = new AbortController();

    // 在 chatHistory 中添加一条占位的教师回复，并在流到来时更新它
    const teacherIndex = chatHistory.value.push({ userRole: 'TEACHER', content: '' }) - 1;
    const token = localStorage.getItem('token') || '';
    try {
        // 使用原生 fetch + ReadableStream 来稳健解析 SSE，兼容跨 chunk 拆分
        const url = '/course/aitrainapi/internship/text';
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'text/event-stream',
                token: token,
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            signal: aiAbortController.signal
        });

        if (!resp.ok) {
            throw new Error(`Failed to fetch SSE endpoint: ${resp.status} ${resp.statusText}`);
        }

        const contentType = resp.headers.get('content-type') || '';
        if (!contentType.includes('text/event-stream')) {
            // 仍然尝试流式读取，但记录警告
            console.warn('response content-type is not text/event-stream:', contentType);
        }

        const reader = resp.body.getReader();
        const utf8Decoder = new TextDecoder('utf-8');
        let buffer = '';
        let closed = false;

        // 处理流中完整的 SSE 事件块
        const processEventBlock = (raw) => {
            // raw 是单个事件块的原始文本（不包含后面的空行分隔）
            const lines = raw.split(/\r?\n/);
            let eventName = 'message';
            const dataLines = [];
            for (let line of lines) {
                if (line === '') continue;
                if (line.startsWith(':')) continue; // 注释行
                const idx = line.indexOf(':');
                if (idx === -1) {
                    // 没有冒号，则当作 data 的一部分（兼容非标准实现）
                    dataLines.push(line);
                    continue;
                }
                const field = line.slice(0, idx).trim();
                let value = line.slice(idx + 1);
                if (value.startsWith(' ')) value = value.slice(1);
                if (field === 'event') eventName = value || 'message';
                else if (field === 'data') dataLines.push(value);
                // 忽略 id/retry 等字段
            }

            const eventData = dataLines.join('\n');
            // 恢复一些后端可能转义的换行和制表
            const normalized = eventData.replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t');

            // 如果是我们关注的 content 事件或默认 message，追加到 answer
            if (eventName === 'content' || eventName === 'message') {
                answer.value += normalized;
                // 渲染累计的 markdown 为 HTML（流式显示）
                try {
                    chatHistory.value[teacherIndex].content = marked.parse(answer.value);
                } catch (e) {
                    // 如果解析失败，回退为原始文本
                    chatHistory.value[teacherIndex].content = answer.value;
                }
                // 滚动到底部
                scrollToBottom();
            } else {
                // 其它事件类型可在此处理（如 done/error）
                // console.log('event', eventName, normalized);
            }
        };

        while (!closed) {
            const { done, value } = await reader.read();
            if (done) {
                closed = true;
            }
            if (value) {
                buffer += utf8Decoder.decode(value, { stream: true });
            }

            // 查找事件边界（SSE 事件以空行分隔）
            let boundaryIdx;
            while ((boundaryIdx = buffer.indexOf('\n\n')) !== -1 || (boundaryIdx = buffer.indexOf('\r\n\r\n')) !== -1) {
                // 取到一个完整事件块
                // 计算分隔长度（2 或 4）
                let sepLen = 2;
                if (buffer.substr(boundaryIdx, 4) === '\r\n\r\n') sepLen = 4;
                const rawEvent = buffer.slice(0, boundaryIdx);
                buffer = buffer.slice(boundaryIdx + sepLen);
                processEventBlock(rawEvent);
            }
        }

        // 流关闭后，如果 buffer 中还有残余，作为最后一个事件处理
        if (buffer.trim().length > 0) {
            processEventBlock(buffer);
            buffer = '';
        }

    } catch (err) {
        if (err.name === 'AbortError') {
            answer.value += '\n\n[已取消]';
        } else {
            console.error('流式请求错误：', err);
            answer.value = '调用失败：' + (err.message || '未知错误');
        }
    } finally {
        isGenerating.value = false;
        aiAbortController = null;
    }

}
</script>
```

### Vue 实现的两种方法对比

- 原生 fetch + ReadableStream：更灵活，**可以获取到一些不在data字段中的信息**，可完全自定义请求和响应处理，但实现较复杂，需要手动解析 SSE 流。
- fetch-event-source：封装了 SSE 处理逻辑，使用更简单，但灵活性较低，**无法访问除 data 以外的事件信息**。
