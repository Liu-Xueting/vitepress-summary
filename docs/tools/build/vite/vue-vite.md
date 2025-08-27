# 使用 Vite 的一些问题

## 1. Vite 中使用 require

- 安装

```bash
pnpm install vite-plugin-require-transform --save-dev
```

- 配置

```js
// vite.config.js
import { defineConfig } from 'vite';
import requireTransform from 'vite-plugin-require-transform';

export default defineConfig({
  plugins: [
    requireTransform({
      fileRegex: /.js$|.vue$/
    })
  ]
});
```

## 2. Vite 中配置 @

- 配置

```js
// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 将 @ 映射到 src 目录
    }
  }
});
```
