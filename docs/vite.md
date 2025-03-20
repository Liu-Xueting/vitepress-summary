# Vite教程

Vite 是一个由原生 ESM 驱动的 Web 开发构建工具。它主要用于前端开发，提供了一套开发服务器和构建工具，能够显著提高前端开发体验。

Vite 由两部分组成：

- 开发服务器： 基于原生 ES 模块，提供超快的热更新。
- 构建命令： 使用 Rollup 打包代码，生成适用于生产环境的优化静态资源。
  
## 创建 Vite 项目

```bash
npm init vite@latest my-vite-app
```

使用 Vite 创建的项目通常包含以下文件和文件夹：

- node_modules: 存放项目依赖的文件夹。

- public: 存放静态资源的文件夹，例如图片、字体等。
- src: 存放项目源代码的文件夹。
- main.js: 项目入口文件。
- App.vue: Vue 项目根组件。
- index.html: 项目首页。
- package.json: 项目配置文件，包含项目信息、依赖和脚本命令。
- vite.config.js: Vite 配置文件，用于配置 Vite 的各种选项。
  
**启动开发服务器**:

进入项目目录：

```bash
cd my-vite-app
```

安装依赖:

```bash
npm install
```

运行以下命令启动开发服务器：

```bash
npm run dev
```

## Vite 常用功能

### 使用 CSS 预处理器

Vite 支持使用 Sass、Less、Stylus 等 CSS 预处理器。

要使用这些预处理器，你需要先安装相应的依赖：

```bash
npm install sass
```

```bash
npm install less
```

```bash
npm install stylus
```

安装完成后，你就可以在项目中使用相应的 CSS 预处理器了。
例如，在 Vue 项目中，你可以使用 `<style lang="scss">` 来编写 Sass 代码。

### 使用 TypeScript

Vite 支持使用 TypeScript 编写代码。
要使用 TypeScript，你需要先安装 TypeScript：

```bash
npm install typescript
```

安装完成后，你可以将 .js 文件重命名为 .ts 文件，并使用 TypeScript 语法编写代码。Vite 会自动编译 TypeScript 代码。

使用静态资源 Vite 支持使用图片、字体等静态资源。你可以将这些资源放在 public 目录下，或者使用 import 语句导入资源。 使用 public 目录: 将图片 logo.png 放在 public 目录下，然后在代码中使用 /logo.png 引用图片。

### 使用 import 语句

```js
import logo from './assets/logo.png'

const img = document.createElement('img')
img.src = logo
document.body.appendChild(img)
```

### 使用环境变量

Vite 支持使用环境变量来配置不同的环境。你可以使用 .env 文件来定义环境变量。

**创建 .env 文件**:

```env
VITE_API_URL=https://api.example.com
```

在代码中使用环境变量:

```js
console.log(import.meta.env.VITE_API_URL)
```

### 使用插件

Vite 拥有丰富的插件生态系统，可以帮助你扩展 Vite 的功能。
我们可以使用 Vite 插件来实现代码压缩、图片优化、代码分析等功能。

**安装插件**:

```bash
npm install vite-plugin-xxx
```

**配置插件**:

```js
import { defineConfig } from 'vite'
import xxx from 'vite-plugin-xxx'

export default {
  plugins: [
    xxx()
  ]
}
```

vite.config.js 是 Vite 项目的核心配置文件，通过配置 vite.config.js，你可以自定义 Vite 的各种行为，例如开发服务器、构建选项、插件等。

以下是一个 vite.config.js 配置示例：

```js
// 导入 defineConfig 函数，用于定义 Vite 配置
import { defineConfig } from 'vite';
// 导入 Vue 插件，用于支持 Vue 项目
import vue from '@vitejs/plugin-vue';
// 导入 path 模块，用于处理路径
import path from 'path';

// 使用 defineConfig 定义 Vite 配置
export default defineConfig({
  // 项目根目录，默认为当前工作目录
  root: path.resolve(__dirname, './src'),

  // 基础路径，用于部署在子路径时使用
  base: '/my-app/',

  // 开发服务器配置
  server: {
    // 指定开发服务器端口
    port: 3000,
    // 是否自动打开浏览器
    open: true,
    // 配置代理服务器，用于解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 目标服务器地址
        changeOrigin: true, // 是否改变请求源
        rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径
      },
    },
  },

  // 构建配置
  build: {
    // 指定输出目录
    outDir: path.resolve(__dirname, '../dist'),
    // 指定静态资源目录
    assetsDir: 'static',
    // 是否生成 sourcemap 文件
    sourcemap: true,
    // 是否压缩代码
    minify: 'terser', // 使用 terser 进行代码压缩
    // 配置 Rollup 选项
    rollupOptions: {
      // 配置外部依赖
      external: ['lodash'],
      // 配置输出格式
      output: {
        manualChunks: {
          // 将 lodash 单独打包
          lodash: ['lodash'],
        },
      },
    },
  },

  // 插件配置
  plugins: [
    // 使用 Vue 插件
    vue(),
  ],

  // 模块解析配置
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 @ 映射到 src 目录
    },
  },

  // CSS 配置
  css: {
    // 配置 CSS 预处理器选项
    preprocessorOptions: {
      scss: {
        // 全局注入 SCSS 变量
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },

  // 环境变量配置
  envPrefix: 'VITE_', // 环境变量前缀，默认为 VITE_
});
```
