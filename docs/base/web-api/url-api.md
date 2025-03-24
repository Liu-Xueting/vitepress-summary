# URL API

## URL API 详细说明

---

### **1. 定义**

**URL API** 是浏览器提供的标准化接口，用于解析、构造和操作 URL。它将 URL 分解为可读的组成部分（如协议、主机名、路径等），并允许开发者以编程方式安全地修改这些部分。该 API 还提供 `URLSearchParams` 接口，专门用于处理 URL 的查询参数（即 `?` 后的键值对）。

---

### **2. 核心对象与用法**

#### **2.1 `URL` 对象**

通过构造函数 `new URL()` 创建 URL 对象，支持绝对 URL 或基于基础 URL 的相对路径解析。

```javascript
// 解析绝对 URL
const url1 = new URL('https://example.com/path?name=Alice#section1');
console.log(url1.hostname); // "example.com"

// 相对路径解析（需基础 URL）
const baseURL = 'https://example.com/base/';
const url2 = new URL('../images/logo.png', baseURL);
console.log(url2.href); // "https://example.com/images/logo.png"
```

#### **2.2 URL 对象属性**

| 属性                | 说明                                                                 |
|---------------------|----------------------------------------------------------------------|
| **`href`**          | 完整 URL 字符串（可写，修改后自动更新其他属性）                      |
| **`protocol`**      | 协议（如 `https:`，包含末尾冒号）                                   |
| **`host`**          | 主机（含端口，如 `example.com:8080`）                                |
| **`hostname`**      | 主机名（不含端口）                                                  |
| **`port`**          | 端口号（若 URL 中未指定则为空）                                      |
| **`pathname`**      | 路径部分（以 `/` 开头，如 `/search`）                                |
| **`search`**        | 查询字符串（以 `?` 开头，如 `?q=test`）                              |
| **`searchParams`**  | 关联的 `URLSearchParams` 对象（用于操作查询参数）                   |
| **`hash`**          | 哈希部分（以 `#` 开头，如 `#section2`）                             |
| **`origin`**        | 只读属性，返回协议 + 主机 + 端口（如 `https://example.com:8080`）   |
| **`username`**      | URL 中的用户名（如 `user@example.com` 中的 `user`）                 |
| **`password`**      | URL 中的密码（如 `user:pass@example.com` 中的 `pass`）              |

```javascript
const url = new URL('https://user:pass@example.com:8080/path?q=test#hash');
console.log(url.origin); // "https://example.com:8080"
console.log(url.pathname); // "/path"
```

#### **2.3 修改 URL 属性**

直接修改属性值会自动同步其他相关部分：

```javascript
url.protocol = 'http:';      // 切换协议（自动添加冒号）
url.hostname = 'api.example.com'; // 修改主机名
url.pathname = '/new/path';  // 更新路径
console.log(url.href);       // "http://api.example.com:8080/new/path?q=test#hash"
```

---

### **3. `URLSearchParams` 接口**

专门用于操作 URL 的查询参数（`?key=value&...`），支持增删改查和遍历。

#### **3.1 创建与初始化**

```javascript
// 方式1：从字符串或对象初始化
const params1 = new URLSearchParams('name=Alice&age=30');
const params2 = new URLSearchParams({ name: 'Bob', role: 'admin' });

// 方式2：直接通过 URL 对象的 searchParams 属性访问
const url = new URL('https://example.com?lang=en');
const params3 = url.searchParams;
```

#### **3.2 常用方法**

| 方法               | 说明                                                                 |
|--------------------|----------------------------------------------------------------------|
| **`append(key, value)`** | 添加参数（允许重复键）                                               |
| **`delete(key)`**   | 删除指定键的所有参数                                                 |
| **`get(key)`**      | 获取第一个匹配键的值（无则返回 `null`）                             |
| **`getAll(key)`**   | 获取所有匹配键的值数组                                               |
| **`has(key)`**      | 检查是否存在指定键                                                   |
| **`set(key, value)`** | 设置键值（若存在则覆盖所有原值）                                    |
| **`sort()`**        | 按键名排序参数                                                       |
| **`entries()`**     | 返回迭代器，包含所有键值对                                           |

```javascript
const params = new URLSearchParams('fruit=apple&fruit=banana');

params.append('color', 'red');     // 添加新参数
params.set('fruit', 'orange');     // 替换所有 fruit 参数
console.log(params.toString());    // "fruit=orange&color=red"

// 遍历参数
for (const [key, value] of params.entries()) {
  console.log(`${key}: ${value}`); // fruit: orange, color: red
}
```

#### **3.3 自动编码与解码**

参数值会自动进行 URL 编码/解码，避免手动处理：

```javascript
params.set('query', 'hello world!');
console.log(params.get('query')); // "hello world!"
console.log(params.toString());   // "query=hello%20world%21"
```

---

### **4. 静态方法**

#### **4.1 `URL.createObjectURL(blob)`**

为 `Blob` 或 `File` 对象生成临时 URL，用于预览本地文件或媒体流：

```javascript
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const objectURL = URL.createObjectURL(file);
  const img = document.createElement('img');
  img.src = objectURL;
  document.body.appendChild(img);
});
```

#### **4.2 `URL.revokeObjectURL(url)`**

释放由 `createObjectURL` 创建的资源引用，避免内存泄漏：

```javascript
// 图片加载完成后释放资源
img.onload = () => {
  URL.revokeObjectURL(objectURL);
};
```

---

### **5. 注意事项**

- **编码处理**：直接修改 `url.search` 需手动编码，建议优先使用 `URLSearchParams`。
- **浏览器兼容性**：
  - 现代浏览器全面支持（Chrome 32+、Firefox 19+、Edge 12+）。
  - IE 11 及更早版本不支持，需使用 Polyfill（如 `url-polyfill`）。
- **哈希部分**：修改 `hash` 属性不会触发页面滚动到锚点。
- **路径规范化**：自动将路径中的 `..` 和 `.` 解析为实际路径：
  ```javascript
  const url = new URL('https://example.com/a/../b/./c');
  console.log(url.pathname); // "/b/c"
  ```

---

### **6. 使用场景**

1. **动态构建 API 请求**：
   ```javascript
   const baseURL = 'https://api.example.com/data';
   const params = new URLSearchParams({
     page: 1,
     limit: 20,
     filter: 'recent'
   });
   const url = new URL(baseURL);
   url.search = params.toString();
   fetch(url.href);
   ```

2. **解析当前页面 URL**：
   ```javascript
   const currentURL = new URL(window.location.href);
   console.log(currentURL.searchParams.get('id')); // 获取查询参数 id
   ```

3. **文件预览与下载**：
   ```javascript
   const blob = new Blob(['Hello, World!'], { type: 'text/plain' });
   const downloadLink = document.createElement('a');
   downloadLink.href = URL.createObjectURL(blob);
   downloadLink.download = 'hello.txt';
   downloadLink.click();
   URL.revokeObjectURL(downloadLink.href);
   ```

---

### **7. 总结**

URL API 提供了标准化、安全的 URL 操作方式，相比手动字符串处理更具优势：

- **避免错误**：自动处理编码、路径解析和参数管理。
- **代码可读性**：通过属性访问和修改，逻辑更清晰。
- **功能集成**：结合 `URLSearchParams` 和 `Blob` 处理，覆盖常见需求。

适用于动态生成请求、解析页面参数、文件操作等场景，是现代 Web 开发中处理 URL 的核心工具。
