# Web Storage API

## **1. 定义**

**Web Storage API** 是浏览器提供的一种客户端存储机制，允许在不依赖服务器的情况下将数据持久化或会话级别地存储在用户的浏览器中。它解决了 Cookie 在存储容量（通常每个域名约 5MB）和功能性上的限制，提供了更简洁的键值对操作接口。Web Storage 包含两种对象：

- **`localStorage`**：数据永久存储，除非手动删除。
- **`sessionStorage`**：数据仅在当前会话（同一标签页）有效，关闭标签页后清除。

## **2. 核心接口：`Storage`**

`localStorage` 和 `sessionStorage` 均实现了 `Storage` 接口，提供以下方法和属性：

### **方法**

- **`setItem(key, value)`**
  存储键值对。若键已存在则更新值。
  ```javascript
  localStorage.setItem('username', 'Alice'); // 存储字符串
  localStorage.setItem('user', JSON.stringify({ id: 1 })); // 存储对象需序列化
  ```

- **`getItem(key)`**
  获取指定键的值，键不存在时返回 `null`。
  ```javascript
  const user = JSON.parse(localStorage.getItem('user')); // 解析对象
  ```

- **`removeItem(key)`**
  删除指定键及其值。
  ```javascript
  localStorage.removeItem('username');
  ```

- **`clear()`**
  清空所有存储项。
  ```javascript
  sessionStorage.clear(); // 清空当前会话存储
  ```

- **`key(index)`**
  返回指定索引的键名。
  ```javascript
  const firstKey = localStorage.key(0); // 首个键名
  ```

### **属性**

- **`length`**
  返回当前存储的键值对数量。
  ```javascript
  const count = localStorage.length;
  ```

## **3. 使用场景与示例**

### **数据持久化（localStorage）**

```javascript
// 保存用户主题偏好
localStorage.setItem('theme', 'dark');

// 读取主题
const theme = localStorage.getItem('theme') || 'light';
document.body.className = theme;
```

### **会话级数据（sessionStorage）**

```javascript
// 存储表单草稿
sessionStorage.setItem('draft', JSON.stringify({ title: '未命名' }));

// 页面刷新后恢复草稿
window.onload = () => {
  const draft = JSON.parse(sessionStorage.getItem('draft'));
  if (draft) form.title.value = draft.title;
};
```

## **4. 事件：`storage`**

当同源页面修改存储数据时，触发 `storage` 事件（**当前页面修改不会触发自身监听器**），用于多页面间状态同步。

### **事件对象属性**

- **`key`**：发生变化的键名（若调用 `clear()` 则为 `null`）。
- **`oldValue`**：旧值（新增键时为 `null`）。
- **`newValue`**：新值（删除键时为 `null`）。
- **`url`**：触发修改的页面 URL。
- **`storageArea`**：对应的 `Storage` 对象（如 `localStorage`）。

### **监听示例**

```javascript
window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    document.body.className = event.newValue || 'light';
  }
});
```

## **5. 注意事项**

- **数据类型限制**：仅支持字符串。存储对象需使用 `JSON.stringify()`，读取时用 `JSON.parse()`。
- **容量限制**：不同浏览器限制不同（通常 5MB），超出会抛出 `QuotaExceededError`。
  ```javascript
  try {
    localStorage.setItem('bigData', new Array(10*1024*1024).join('a'));
  } catch (e) {
    console.error('存储空间不足:', e.message);
  }
  ```
- **同源策略**：数据按协议、域名、端口隔离，不同源页面无法访问。
- **隐私模式**：部分浏览器的隐私模式下可能禁用 Web Storage 或限制容量。

## **6. 与 Cookie 对比**

| 特性               | Web Storage          | Cookie               |
|--------------------|----------------------|----------------------|
| 容量               | ~5MB                 | ~4KB                 |
| 随请求发送到服务器 | 否                   | 是（通过 HTTP 头）   |
| API 易用性         | 简洁的键值对操作     | 需手动解析字符串     |
| 生命周期           | 永久或会话级         | 可设置过期时间       |

## **7. 兼容性**

- 支持所有现代浏览器（Chrome 4+、Firefox 3.5+、IE 8+）。
- 旧版浏览器（如 IE7）需检测支持性：
  ```javascript
  if (typeof(Storage) !== 'undefined') {
    // 支持 Web Storage
  } else {
    // 降级处理，如使用 Cookie
  }
  ```
