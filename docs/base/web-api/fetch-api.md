# Fetch API

## Fetch API 详细说明

---

### **1. 定义**

**Fetch API** 是现代浏览器提供的用于替代传统 `XMLHttpRequest` (XHR) 的网络请求接口，基于 **Promise** 设计，支持更简洁、灵活的异步操作。其核心方法 `fetch()` 允许开发者以统一的方式处理 HTTP 请求和响应，并天然支持跨域资源共享（CORS）。

---

### **2. 核心接口**

Fetch API 包含以下主要对象：

- **`fetch()`**：全局方法，用于发起网络请求，返回 Promise。
- **`Request`**：描述请求的配置（URL、方法、头等）。
- **`Response`**：封装响应数据（状态码、头、内容等）。
- **`Headers`**：操作 HTTP 请求头和响应头。
- **`Body`**：Mixin，提供处理请求体/响应体的方法（如 `json()`, `text()`）。

---

### **3. 基本使用**

#### **GET 请求示例**

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('HTTP error: ' + response.status);
    return response.json(); // 解析 JSON 响应
  })
  .then(data => console.log(data))
  .catch(error => console.error('Request failed:', error));
```

#### **POST 请求（JSON 数据）**

```javascript
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Alice', age: 30 }),
})
  .then(response => response.json())
  .then(result => console.log('Success:', result));
```

---

### **4. 配置选项**

`fetch()` 的第二个参数为配置对象，支持以下常用字段：

| 字段名          | 类型     | 说明                                                                 |
|------------------|----------|----------------------------------------------------------------------|
| `method`         | String   | HTTP 方法（默认 `GET`），如 `POST`、`PUT`、`DELETE`。                |
| `headers`        | Object   | 请求头，可传入 `Headers` 对象或普通对象。                            |
| `body`           | Various  | 请求体，支持 `String`、`FormData`、`Blob`、`ArrayBuffer` 等。        |
| `mode`           | String   | 请求模式：`cors`（默认）、`no-cors`、`same-origin`。                 |
| `credentials`    | String   | 是否携带凭证：`omit`（不携带）、`same-origin`（同源）、`include`。   |
| `cache`          | String   | 缓存策略：`default`、`no-store`、`reload` 等。                       |
| `redirect`       | String   | 重定向处理：`follow`（自动）、`error`（失败）、`manual`（手动）。    |
| `signal`         | AbortSignal | 用于取消请求的信号（通过 `AbortController` 生成）。               |

---

### **5. 响应处理**

通过 `Response` 对象操作返回数据：

- **状态与头信息**：
  ```javascript
  response.status;     // HTTP 状态码（如 200）
  response.statusText; // 状态描述（如 "OK"）
  response.headers.get('Content-Type'); // 获取响应头
  ```

- **解析内容**（`Body` 方法）：
  - **`response.json()`**：解析为 JSON 对象。
  - **`response.text()`**：获取文本内容。
  - **`response.blob()`**：获取二进制 Blob（如图片）。
  - **`response.arrayBuffer()`**：获取原始二进制数据。
  - **`response.formData()`**：解析为 `FormData` 对象。

---

### **6. 高级功能**

#### **自定义 Request 对象**

```javascript
const request = new Request('https://api.example.com/data', {
  method: 'GET',
  headers: new Headers({ 'Authorization': 'Bearer token' }),
});

fetch(request)
  .then(response => response.json());
```

#### **取消请求**

使用 `AbortController` 中止请求：

```javascript
const controller = new AbortController();
const signal = controller.signal;

fetch('https://api.example.com/data', { signal })
  .catch(err => {
    if (err.name === 'AbortError') console.log('请求已取消');
  });

// 取消请求
controller.abort();
```

#### **上传文件**

通过 `FormData` 上传文件：

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0], 'image.png');

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData,
});
```

---

### **7. 错误处理**

- **网络错误**：如无法连接服务器，Promise 会 reject。
- **HTTP 错误**（如 404、500）：需手动检查 `response.ok`：
  ```javascript
  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
  ```

---

### **8. 注意事项**

- **默认不携带 Cookie**：需设置 `credentials: 'include'`。
- **CORS 限制**：跨域请求需服务器设置 `Access-Control-Allow-Origin`。
- **旧浏览器兼容性**：IE 不支持，可引入 polyfill（如 `whatwg-fetch`）。
- **超时处理**：原生不支持，需结合 `AbortController` 或 `Promise.race` 实现：
  ```javascript
  const timeout = (ms) => new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );

  Promise.race([fetch(url), timeout(5000)])
    .then(response => /* ... */)
    .catch(error => console.error(error));
  ```

---

### **9. 与 XMLHttpRequest 对比**

| 特性               | Fetch API                          | XMLHttpRequest (XHR)              |
|---------------------|------------------------------------|------------------------------------|
| **语法**            | 基于 Promise，链式调用             | 基于事件回调                       |
| **默认行为**        | 不自动携带 Cookie                  | 自动携带 Cookie                    |
| **响应类型**        | 内置多种解析方法（`json()`, `text()`）| 需手动设置 `responseType`         |
| **取消支持**        | 通过 `AbortController`             | 直接调用 `.abort()`                |
| **跨域处理**        | 天然支持 CORS                      | 需手动配置跨域头                   |

---
