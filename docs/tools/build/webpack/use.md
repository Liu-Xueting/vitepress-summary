# Webpack 常见配置

## 配置别名

在 `webpack.config.js` 中配置别名，可以简化模块导入路径，避免使用相对路径。

```javascript
const path = require('path');
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 将 @ 映射到 src 目录
    }
  }
};
```

## 使用 require

在 Webpack 中使用 `require` 需要确保相关配置正确，尤其是在处理 ES 模块时。

- 安装相关插件

```bash
npm install babel-plugin-transform-require --save-dev

```

- 配置 Babel

```javascript
// .babelrc
{
  "plugins": [
    ["transform-require", {
      "modules": ["module-name"]
    }]
  ]
}

```
