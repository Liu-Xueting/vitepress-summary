# 页面性能优化

## 一、网络层面优化（首屏最大瓶颈）

### 1. 静态资源缓存策略

1. 浏览器强缓存 + 协商缓存

- js/css/ 图片：文件名携带 `hash`（webpack contenthash /vite [hash]），设置长期 `Cache-Control: public`, `max-age=31536000`
- index.html：禁止强缓存 `no-cache`，保证更新及时生效

1. 区分：

- 构建哈希：解决资源更新缓存问题（你学的 splitChunks 分包配套方案）
- webpack runtimeChunk 就是为了保护第三方包 hash 稳定

### 2. 资源体积压缩

- 文本资源压缩
服务端开启 Gzip / Brotli（Brotli 压缩率更高），js、css、html、json
具体查看文档 [服务端开启 Gzip / Brotli 压缩](./press.md)
- 图片优化
  - 格式优先：WebP → AVIF（同等清晰度体积更小）
  - 图片压缩工具：sharp、tinypng
  - 大图使用 CDN 图片实时裁剪、格式转换
- 字体优化
精简字体包、woff2 优先、字体按需子集化

### 3. 减少请求数量 & 请求体积

1. 小图片转 base64（控制大小，不要滥用）
2. 合理分包（webpack splitChunks /vite manualChunks），避免单个超大 js
3. 避免重复请求，接口数据做本地缓存 localStorage /sessionStorage/ IndexedDB

### 4. 加速资源访问

1. 静态资源部署 CDN
2. DNS 预解析 `<link rel="dns-prefetch" href="域名">`
3. prefetch /preload 资源预加载

```html
<!-- 关键资源立刻加载，优先度高（首屏核心js字体） -->
<link rel="preload" href="xxx.js" as="script">
<!-- 空闲时预加载未来页面资源（下个路由资源） -->
<link rel="prefetch" href="other.js">
```

## 二、工程构建打包优化（Webpack/Vite 你之前学的全部用上）

### Webpack

1. 持久化缓存 cache: filesystem、loader 缓存
2. 缩小 loader 处理范围 include/exclude
3. 代码分割：runtimeChunk、splitChunks、cacheGroups
4. externals 外部化大型依赖，CDN 引入
5. 多进程压缩、esbuild/swc-loader 提速转译
6. 生产环境 css 抽离、代码压缩、Tree-Shaking

### Vite（生产基于 Rollup）

1. `rollupOptions.manualChunks` 手动分包
2. 合理配置 `optimizeDeps` 优化依赖预构建
3. 开启 Tree-Shaking；消除未使用代码
4. 资源分类输出，配置 `assetFileNames`

### 通用打包优化

1. Tree-Shaking 要求：使用 ES Module `import/export`，禁止 commonjs；mode:production 自动开启，删除未引用代码
2. 移除开发代码：console、注释、测试代码
3. 路由懒加载（动态 import ()）

>作用：首屏只加载当前页面代码，其他路由代码按需异步加载  

## 三、浏览器渲染与运行时优化

### 1. DOM 相关优化

- 减少 DOM 操作
频繁 DOM 修改使用文档片段 DocumentFragment；批量更新，不要循环操作 DOM
- 虚拟列表（长列表优化）
上万条表格 / 列表，只渲染可视区域 DOM，防止 DOM 过多造成卡顿
- 避免频繁回流 (重排)、重绘
  - 回流：元素尺寸位置变化（开销大）
  - 重绘：颜色背景变化
  优化方案：
  - 样式集中修改，不要逐条修改 style
  - 使用 transform、opacity 做动画（触发合成层，不回流）

### 2. JS 执行优化

1. 避免长任务（阻塞主线程，影响 INP 交互指标） 大量计算放入 Web Worker，不阻塞 UI 渲染
2. 防抖、节流：scroll、resize、输入框搜索事件
3. 合理销毁定时器、事件监听，防止内存泄漏

### 3. 图片加载策略

1. 图片懒加载 `loading="lazy"`，视口外图片延迟加载
2. 使用 `srcset` 响应式图片，不同屏幕加载不同尺寸图

```html
<img src="small.jpg" srcset="small.jpg 720w, big.jpg 1280w">
```

### 4. CSS 优化

1. CSS 放 head，JS 放 body 底部或者 defer/async

```html
<!-- 不阻塞html解析，加载完成后执行，按顺序 -->
<script src="a.js" defer></script>
<!-- 加载完立刻执行，无序 -->
<script src="b.js" async></script>
```

1. 精简 css，删除无用样式；使用 CSS Module 避免冗余
2. 优先使用 css 动画代替 js 动画

## 四、首屏体验优化（感知优化，用户体感最重要）

即便真实速度没提升，降低用户等待焦虑

1. 骨架屏、Loading 占位、渐进式图片（模糊占位图）
2. 首屏 SSR / SSG / ISR

- SPA 单页面：首屏需要下载 js 再渲染，白屏时间长
- SSR：服务端直接输出 HTML，加快 LCP；适合官网、内容页面

1. PWA 优化：Service Worker 缓存静态资源，支持离线访问

## 五、Vue / React 框架专属优化

Vue

1. v-if 和 v-show 合理选择：频繁切换用 v-show；极少显示用 v-if
2. v-for 必须加 key；不要同时 v-if 和 v-for
3. 组件按需引入；异步组件
4. 避免不必要响应式：大型纯静态数据 shallowRef / markRaw

React

1. memo、useMemo、useCallback 避免不必要组件重复渲染
2. 路由懒加载 React.lazy + Suspense
3. 合理拆分组件粒度
