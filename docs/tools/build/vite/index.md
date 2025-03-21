# Vite

## Vite简介

Vite是一个基于ESM的前端构建工具，它使用ESM来替代webpack中的CommonJS，所以Vite的构建速度比webpack快很多。

webpack是将所有的模块打包成一个文件，然后再运行，而Vite是将每一个模块单独打包成一个文件，然后再运行（每一次都要打包）。

Vite的优势：

- 开发时，并不对代码进行打包，而是使用ESM的方式（引入模块）加载模块，所以构建速度很快。
- esbuild预构建依赖，所以构建速度更快。
- 生产时，会将所有的模块打包成一个文件，然后再运行。
- 处了速度外，vite使用起来也更加方便

Vite使用细节：

- Vite将项目路径设置为根路径
- 在html中引入`<script>`标签时 要加上 type="module" 属性

**Dev**:

```bash
npm install vite -D
```

```bash
pnpm dev
```

**preView**：是对打包后的文件进行预览

```bash
pnpm vite preview
```

**Build**:

```bash
pnpm vite build
```

```json
package.json
"scripts": {
    "build": "vite build",
    "dev": "vite",
    "preview": "vite preview"
}
```

**快速创建项目**：

```bash
pnpm create vite
```

## Vite配置

兼容性问题：向下兼容其他浏览器，添加`@vitejs/plugin-legacy`插件

```bash
pnpm add @vitejs/plugin-legacy -D
```

同时也要装`terser`插件：来压缩代码，否则会报错

```bash
pnpm add terser -D
```

```js
vite.config.js
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11']
            // targets: ['defaults', 'IE 11'] // 兼容IE11 代码会打包成两份 发生转换 （不要用！！）
        })
    ]
})
```

**注意**：

- vite.config.js使用ESM规范编写，所以需要使用`import`和`export`关键字。
- Vite会打包两个文件，一个是ESM规范的文件，一个是CommonJS规范的文件，所以需要使用`type="module"`和`nomodule`属性来区分两个文件。

**Vite和Webpack对比**：

在 Vite 出现之前，前端开发通常使用 Webpack 等构建工具，这些工具虽然功能强大，但也存在一些痛点：

- 启动速度慢： 项目越大，启动时间越长，影响开发效率。

- 热更新慢： 每次修改代码后，都需要重新构建整个项目，导致热更新速度慢。

- 配置复杂： Webpack 等工具配置复杂，学习成本高。

Vite 的出现解决了传统构建工具的痛点，具有以下优势：

- 极速启动： 利用浏览器原生 ES 模块支持，无需打包，启动速度极快。

- 快速热更新： 仅更新修改的模块，保持应用状态，提升开发效率。

- 丰富的功能： 支持 TypeScript、JSX、CSS 等，开箱即用。

- 高度可扩展： 通过插件系统，轻松集成其他工具和框架。
