# 模块化ESM、CJS、UMD

---

## **1. ESM（ECMAScript Modules）**

### **定义**

ESM 是 JavaScript 的官方模块标准，由 **ES6（ECMAScript 2015）** 引入，使用 `import` 和 `export` 语法。它是现代浏览器和 Node.js（≥13.2.0）原生支持的模块化方案。

### **核心特性**

- **静态解析**：依赖关系在代码解析阶段确定，支持 Tree Shaking（移除未使用代码）。
- **异步加载**：浏览器中按需加载模块，支持顶层 `await`。
- **严格模式**：默认启用严格模式，禁止未声明变量等。

### **用法示例**

```javascript
// 导出模块（math.js）
export const sum = (a, b) => a + b;
export default function multiply(a, b) { return a * b; }

// 导入模块（app.js）
import { sum } from './math.js';
import multiply from './math.js'; // 默认导出
console.log(sum(2, 3)); // 5
console.log(multiply(2, 3)); // 6
```

### **配置方式**

- **浏览器**：使用 `<script type="module">` 标签。
- **Node.js**：需在 `package.json` 中设置 `"type": "module"` 或使用 `.mjs` 扩展名。

---

## **2. CJS（CommonJS）**

### **定义**

CJS 是 **Node.js 默认的模块系统**，使用 `require()` 和 `module.exports` 语法。设计初衷是为服务端提供同步模块加载能力。

### **核心特性**

- **动态加载**：依赖关系在运行时确定。
- **同步加载**：适用于服务器环境（文件 I/O 同步）。
- **模块缓存**：模块首次加载后会被缓存，后续 `require()` 返回缓存副本。

### **用法示例**

```javascript
// 导出模块（math.js）
exports.sum = (a, b) => a + b;
module.exports = function multiply(a, b) { return a * b; }; // 覆盖默认导出

// 导入模块（app.js）
const multiply = require('./math.js');
const { sum } = require('./math.js'); // 需导出对象时才可解构
console.log(sum(2, 3)); // 5（需导出方式支持）
console.log(multiply(2, 3)); // 6
```

### **配置方式**

- **Node.js**：默认支持 `.js` 文件。
- **浏览器**：需通过打包工具（如 Webpack、Browserify）转换。

---

## **3. UMD（Universal Module Definition）**

### **定义**

UMD 是一种兼容性模块格式，可同时在浏览器（支持 AMD、全局变量）和 Node.js（CJS）环境中运行。常用于编写跨环境库。

### **核心特性**

- **环境嗅探**：自动检测当前支持的模块系统（AMD、CJS、全局变量）。
- **兼容性强**：覆盖旧浏览器到现代 Node.js 的全场景。
- **代码冗余**：需包含模块系统判断逻辑，体积较大。

### **用法示例**

```javascript
// 生成 UMD 模块（通过 Rollup/Webpack 配置）
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD 环境（如 RequireJS）
    define(['exports'], factory);
  } else if (typeof exports === 'object') {
    // CJS 环境（Node.js）
    factory(exports);
  } else {
    // 浏览器全局变量
    factory(root.myLib = {});
  }
})(this, function (exports) {
  // 模块逻辑
  exports.sum = (a, b) => a + b;
});
```

### **配置方式**

- **打包工具**：通过 Webpack/Rollup 配置输出格式为 `umd`。
- **手动编写**：添加环境判断代码（不推荐）。

---

## **三者的核心区别**

| **特性**               | **ESM**                          | **CJS**                          | **UMD**                          |
|-------------------------|-----------------------------------|-----------------------------------|-----------------------------------|
| **标准**                | 官方标准（ES6+）                  | Node.js 传统标准                  | 社区兼容方案                      |
| **加载方式**            | 异步加载（浏览器）                | 同步加载                          | 自动适配环境                      |
| **语法**                | `import/export`                  | `require/module.exports`          | 包裹层 + 环境判断                 |
| **静态分析**            | 支持（Tree Shaking 友好）        | 不支持                            | 不支持                            |
| **浏览器原生支持**      | 是（需 `type="module"`）         | 否（需打包工具转换）              | 是（通过全局变量或 AMD）          |
| **Node.js 支持**        | 需配置 `"type": "module"`        | 原生支持                          | 原生支持                          |
| **典型场景**            | 现代浏览器、Node.js 应用          | Node.js 后端服务                  | 跨环境库（如 Lodash、React）      |
| **模块对象**            | 实时绑定（引用值变化同步）        | 值拷贝（导出值的快照）            | 依赖具体实现                      |

---

## **互操作与兼容性**

### **ESM 与 CJS 互操作**

- **Node.js 中 ESM 导入 CJS**：
  ```javascript
  import cjsModule from './cjs-module.cjs'; // 需指定扩展名或配置
  ```
- **CJS 中导入 ESM**：
  需使用动态 `import()`：
  ```javascript
  const esmModule = await import('./esm-module.mjs');
  ```

### **UMD 与 ESM/CJS 兼容**

- **ESM 导入 UMD**：需通过打包工具转换或直接引入 CDN 链接。
- **CJS 导入 UMD**：与普通 CJS 模块行为一致。

---

## **工具链支持**

| **工具**       | **ESM**                      | **CJS**                      | **UMD**                      |
|----------------|------------------------------|------------------------------|------------------------------|
| **Webpack**    | 默认支持（需配置 `output`）  | 默认支持                      | 设置 `output.libraryTarget: 'umd'` |
| **Rollup**     | 默认输出 ESM                 | 需插件 `@rollup/plugin-commonjs` | 配置 `format: 'umd'`         |
| **Babel**      | 转换 ESM → CJS               | 无需转换                      | 需结合其他插件               |
| **TypeScript** | 设置 `"module": "ESNext"`    | 设置 `"module": "CommonJS"`  | 生成声明文件 + 打包工具       |

---

## **总结与选择建议**

1. **ESM**：
   - **优先选择**：现代浏览器项目、Node.js 应用（≥14.x）。
   - **优势**：标准化、静态优化、未来兼容性。
2. **CJS**：
   - **适用场景**：Node.js 后端服务、旧版工具链。
   - **优势**：同步加载简单、生态成熟。
3. **UMD**：
   - **过渡方案**：需兼容旧浏览器或作为库的发布格式。
   - **优势**：跨环境支持，但逐渐被 ESM 取代。

随着浏览器和 Node.js 对 ESM 的支持日益完善，**ESM 已成为前端开发的未来方向**，建议新项目优先采用 ESM，并通过打包工具输出兼容格式。
