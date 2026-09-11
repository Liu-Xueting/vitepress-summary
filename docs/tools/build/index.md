# 构建工具

## 一、webpack

### 1. 基础核心概念（五大核心）

#### ① Entry 入口

- 作用：指定打包起点，构建依赖图起点
- 写法：单个入口、多入口、对象写法、动态入口

```js
entry: './src/index.js'
entry: { main: './src/index.js' }
```

#### ② Output 输出

- path：绝对路径，打包产物目录
- filename：输出文件名
  - [name]入口名、[hash]全文件哈希、[chunkhash]chunk 哈希、[contenthash]文件内容哈希（用于缓存）
- publicPath：资源基础路径（CDN、本地部署常用）

#### ③ Loader（转换器）

Webpack 只能识别 JS/JSON，其他文件靠 Loader 转换
执行顺序：从右向左、从下往上
常用 Loader：

- babel-loader：ES6+/TS 转 ES5（依赖 @babel/core）
- css-loader：解析 @import、url ()，处理 css 依赖
- style-loader：把 css 插入页面 `<style>` 标签
- sass-loader/less-loader：预处理器
- postcss-loader：自动加浏览器前缀（autoprefixer）
- file-loader/asset/resource：图片、字体输出文件
- url-loader/asset/inline：小文件转 base64
Webpack5 废弃 file/url-loader，统一使用 Asset Modules

#### ④ Plugin（插件）

Loader 处理文件；Plugin 处理整个打包流程，生命周期钩子 常用插件：

- HtmlWebpackPlugin：自动生成 html、引入 bundle
- MiniCssExtractPlugin：抽离 CSS 为独立文件（生产环境，替代 style-loader）
- CleanWebpackPlugin：清空 dist 目录
- DefinePlugin：注入全局环境变量
- CopyWebpackPlugin：复制静态资源
- HotModuleReplacementPlugin：HMR 热更新
- SplitChunksPlugin：代码分割（webpack5 内置）

#### ⑤ Mode 模式

- development：开发模式，不压缩、开启调试、模块不优化
- production：生产模式，自动开启压缩、Tree-Shaking、作用域提升
- none：不使用内置优化

### 2. 重要进阶知识点

#### （1）DevServer 开发服务器

- 本地开发、自动刷新、代理跨域
- hot：开启 HMR 热更新
- proxy：接口代理解决前端跨域
- static：静态资源目录
- 注意：devServer 打包文件存在内存，不会输出到 dist

#### （2）热更新 HMR

- 区别 live-reload（整页刷新）
- HMR：只更新修改模块，保留页面状态
- Webpack HMR 缺陷：文件改动会重新构建依赖图，大型项目慢

#### （3）缓存策略

1. 构建缓存：cache: {type: 'filesystem'} Webpack5 持久化缓存，加速二次构建
2. 浏览器长效缓存：contenthash 命名资源，配合 HTTP 缓存

#### （4）代码分割 Code Splitting

两种方式：

- 入口分割：多 entry
- 动态导入分割：import() 异步导入
- SplitChunks：抽取公共代码、第三方包（vendor）

#### （5）Tree-Shaking

- 作用：剔除未使用 ES 模块代码
- 前提：
  - 使用 ES Module import/export（不支持 CommonJS require）
  - mode: production
  - 避免副作用，配置 sideEffects

#### （6）Loader 三种写法

1. use 数组简单写法
2. 对象写法（带 options 参数）
3. inline loader（不推荐）

#### （7）模块解析 resolve

1. alias：路径别名 @ -> src
2. extensions：自动补全文件后缀 .js,.vue,.ts
3. mainFields：优先查找模块入口

#### （8）Webpack 打包流程（必背）

1. 初始化：读取配置、实例化插件
2. 编译构建：从 entry 开始递归解析依赖，生成依赖图
3. 调用 Loader 转换各类文件
4. 执行插件钩子
5. 根据依赖图生成 chunk
6. 输出文件到 dist

#### （9）Webpack5 重大更新

- 持久化缓存
   Webpack5 新增持久化文件缓存：cache: { type: 'filesystem' } Webpack4 只有内存缓  存，重启项目就消失；filesystem 是落地到硬盘的持久缓存。  
   缓存的主体：模块编译结果 + 模块元信息 + 构建依赖快照 简单说：把上一次构建中「已经处理完的  模块结果」存到硬盘，下次构建不用重新走 Loader、转译、解析流程。
   缓存目录默认：node_modules/.cache/webpack/
- Asset Modules 替代 file-loader
- 更好的 Tree-Shaking
- 模块联邦 Module Federation（微前端核心）
- 移除 node polyfill

#### （10）常见优化手段

- 持久化缓存 cache
- 缩小 loader 处理范围 include/exclude
- 多进程：thread-loader
- 抽离第三方包 splitChunks
- 开启 Tree-Shaking
- 使用 esbuild-loader 替换 babel-loader 加速转译

Q1：开启持久化缓存后，如果修改 babel 配置，缓存还生效吗？
A：不生效。loader 配置参与 hash 计算，配置变化 → hash 改变 → 重新编译。
Q2：删除 src 里一个 js 文件，缓存会自动清理吗？
A：不会自动清理旧缓存文件。webpack 不会主动清理废弃缓存，极端场景可以手动删除 node_modules/.cache。
Q3：持久化缓存能完全替代 thread-loader、缩小 loader 范围（include/exclude）优化吗？
A：不能。首次冷启动没有缓存，依然需要靠常规构建优化提升第一次打包速度。缓存只优化第二次及以后构建。

### 3. 完整实例

目录结构

```html
build/
 ├─ webpack.common.js    公共基础配置
 ├─ webpack.dev.js       开发环境
 └─ webpack.prod.js      生产环境
src/
 └─ index.js
dist/
package.json
```

#### 3.1 安装依赖  

```bash
npm i webpack webpack-cli webpack-dev-server webpack-merge -D
npm i babel-loader @babel/core @babel/preset-env -D
npm i css-loader style-loader sass sass-loader postcss-loader autoprefixer -D
npm i html-webpack-plugin mini-css-extract-plugin clean-webpack-plugin -D
```

#### 3.2 build/webpack.common.js 【公共配置】  

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // contenthash：浏览器长效缓存
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/chunk-[name].[contenthash:8].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.json']
  },
  module: {
    rules: [
      // JS转译 babel
      {
        test: /\.js$/,
        exclude: /node_modules/, // 缩小处理范围，优化构建
        use: 'babel-loader'
      },
      // 静态资源（Webpack5 Asset Modules 替代file/url-loader）
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 小于4kb转base64
          }
        },
        generator: {
          filename: 'assets/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      title: 'Webpack Demo'
    })
  ],
  // ========== 持久化缓存【重点，上文讲解的cache】==========
  cache: {
    type: 'filesystem', // 持久化磁盘缓存
    buildDependencies: {
      // 当前webpack配置文件变更，缓存自动失效
      config: [__filename]
    }
  },
  optimization: {
    // 提取运行时代码，防止hash全部变更
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // 抽取第三方依赖 vendor
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        // 抽取公共模块
        common: {
          name: 'common',
          minChunks: 2,
          priority: 5
        }
      }
    }
  }
};
```

#### 3.3 build/webpack.dev.js 开发环境  

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          'style-loader', // 开发环境 内嵌style标签
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    static: './dist',
    host: '0.0.0.0',
    port: 8080,
    open: true,
    hot: true, // 开启HMR热更新
    compress: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  plugins: []
});
```

#### 3.4 build/webpack.prod.js 生产环境  

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // 生产抽离css为独立文件
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/chunk-[name].[contenthash:8].css'
    })
  ]
});
```

#### 3.5 postcss.config.js（项目根目录）  

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

#### 3.5 package.json scripts  

```js
"scripts": {
  "dev": "webpack serve --config build/webpack.dev.js",
  "build": "webpack --config build/webpack.prod.js"
}
```

#### 3.7 详细讲解optimization部分代码

> 前置概念：Code Splitting 代码分割 webpack 默认会把所有代码打包到一个 main.js。 代码分割就是把大包拆成多个小包，核心 目的：利用浏览器缓存、并行加载、按需加载。  

##### 3.7.1 runtimeChunk: 'single'

1. 什么是 runtime（运行时代码）
webpack 打包后产物里会有一段运行时脚本： 用来实现：模块加载、模块依赖管理、`__webpack_require__`、chunk 加载逻辑。
2. 不加 runtimeChunk 的问题
所有 runtime 代码内嵌到业务 bundle (main.js)。 场景：你只修改业务一行代码
main.js contenthash 变化（预期）
**但是第三方包 vendors hash 没变，理论上浏览器可以缓存**
悲剧：webpack 的 runtime 内部保存 chunk ID 映射；业务改动会导致 chunkId 变化，连带 vendors 文件 hash 也刷新，浏览器缓存失效！
3. runtimeChunk 三个取值
`false`（默认）：runtime 嵌入入口 chunk，不拆分
`single`：单独抽离 runtime 为独立文件 runtime.[hash].js（推荐）
`multiple` / `entry`：每个入口单独生成一份 runtime（多页面项目使用）
✅ 最终收益： 业务代码更新、第三方包不变时，vendors 文件 hash 保持不变，浏览器继续命中缓存。

**也就是说本来运行时代码与业务代码打包在一起，现在 runtimeChunk: 'single' 将运行时代码单独抽离出来，能防止因为业务代码改动从而改动运行时代码，又由于运行时代码保存 chunk ID 映射，一旦改动就会导致vendors 文件 hash 也刷新**

##### 3.7.2 splitChunks 总介绍

`splitChunks` 是 webpack **自动分割 chunk** 的核心配置，webpack5 内置，不需要额外插件。 作用：自动把满足条件的模块抽离成独立 chunk。

1. chunks: 'all'
可选值：
`async`【默认】：只分割异步引入代码（import()动态导入）
`initial`：只分割同步导入代码
`all`：同步 + 异步模块全部参与分割【项目首选】

>重点：设置 all 之后，同步引入的第三方库（如 import React from 'react'）才会被 cacheGroups 捕获抽离成 vendors。 如果保持默认 async，同步引入的 node_modules 包不会自动拆分！

##### 3.7.3 cacheGroups【缓存组，最核心】

cacheGroups：**自定义分割规则，把符合规则的模块归集打包到同一个 chunk**
执行逻辑：webpack 遍历所有模块，依次匹配缓存组规则，命中则抽取。
**规则优先级：priority 数值越大，优先级越高**

- vendors 缓存组  

```js
vendor: {
  test: /[\\/]node_modules[\\/]/,
  name: 'vendors',
  priority: 10
}
```

1. `test: /[\\/]node_modules[\\/]/` 正则匹配路径包含 node_modules 的模块（第三方依赖：vue/react/axios 等）
   > [\\/] 兼容 windows \ 和 mac/linux / 路径分隔符，跨平台必写。
2. `name: 'vendors'` 匹配成功的所有第三方包，合并打包成 `vendors.[contenthash].js`
3. `priority: 10` 优先级 10，高于下面 common (5)； 模块如果同时满足多条规则，先走优先级高的。

- common 公共模块缓存组  
  
```js

common: {
  name: 'common',
  minChunks: 2,
  priority: 5
}
```

1. `minChunks: 2`
一个模块至少被 2 个不同 chunk 引入，才抽离到 common
例如：utils / 公共工具函数，页面 A、页面 B 都引入，就抽出来。
2. `name: 'common'`
公共代码统一打包为 `common.[contenthash].js`
3. `priority:5` 优先级低于 vendors：防止第三方模块错误进入 common 包
⚠️ 缺陷（原生这段配置的坑，后面给优化版） 缺少限制条件：minSize webpack 默认 minSize：20kb。小于 20kb 的模块不会被抽离。很多初学者不知道这个默认值。

Q1 runtimeChunk 解决什么问题？
A：将 webpack 运行时模块加载代码单独拆分。避免业务代码变更导致第三方 chunk 的 hash 意外变化，保障浏览器缓存有效。
Q2 chunks:'all' 和默认 async 区别？
A：async 仅拆分动态 import 异步代码；all 支持同步 + 异步模块拆分。想要抽离同步引入的 node_modules 第三方包，必须设置 all。
Q3 cacheGroups priority 作用？
多个缓存组规则，模块可能同时满足多条条件，priority 数值越大优先匹配。
Q4 拆分出很多小 chunk 一定更好吗？
不一定！拆分过细产生大量 js 文件，浏览器并发请求开销上升。依靠 minSize 限制最小体积，平衡包数量和加载性能。

### 4. 核心区分概念

- bundle：最终输出文件
- chunk：代码分割过程中的中间块（splitChunks、runtimeChunk 就是生成新 chunk）
- module：项目里一个个源码文件

先记住一句话总结：**Module（源码） → Webpack 编译组装 → Chunk（内存中的代码块） → 输出产物 Bundle（磁盘上的文件）**

#### 4.1. 三个名词严格定义

1. Module 模块
   你项目中每一个被导入的文件都是 Module`.js`、`.css`、`.vue`、图片、字体，全部是 module`import / require` 引入的单元。
   >例：utils.js、axios、App.vue 都是 module
2. Chunk 块
Webpack **编译阶段、内存里的中间逻辑单元。**
Webpack 根据入口、代码分割规则，把无数 module 归类组合成若干个 chunk。
chunk **只存在构建流程中，不会直接写入硬盘。**
3. Bundle 包
chunk 经过编译、压缩、生成哈希之后，输出到磁盘上的物理文件。 一个 chunk 默认输出一个 bundle 文件。

> 默认映射关系：`1 chunk → 1 bundle` 特殊场景：css chunk 会被 MiniCssExtractPlugin 抽离，1 个 JS chunk 衍生出 1 个 css bundle。

#### 4.2. 完整运作流程（不开启代码分割，最简单情况）  

配置：`entry: './src/index.js'`

1. index.js 是入口 module，递归收集所有 import 的 module（组件、工具、第三方包）
2. Webpack 将所有收集到的 module 合并成【1 个 chunk】（入口 chunk）
3. 这个 chunk 最终输出：`main.[hash].js` → bundle
流程： 多个 Module → 合并为 1 Chunk → 输出 1 Bundle
没有 splitChunks 的产物：
dist/main.js 1 chunk → 1 bundle

#### 4.3 开启代码分割之后（就是你现在的配置！runtimeChunk + splitChunks）  

```js
runtimeChunk: 'single',
splitChunks: { chunks: 'all', cacheGroups: {vendor、common} }
```

##### 4.3.1 第一步：收集所有 Module

业务代码模块、组件模块、node_modules 第三方模块、公共工具模块

##### 4.3.2 第二步：Webpack 根据规则，划分出多个 Chunk

会自动生成 4 类 chunk：

1. 入口 Chunk（main chunk）：页面独有的业务 modules
2. Runtime Chunk：单独拆分出来的 webpack 运行时代码（runtimeChunk:single生成）
3. vendors Chunk：匹配 node_modules 的所有 module（cacheGroups）
4. common Chunk：多处引入的公共业务 module（cacheGroups）

>⭐ Chunk 的作用是什么？
>Chunk 就是 Webpack 用来分组模块的容器。
>Webpack 依靠 Chunk 实现「代码分割」： 不想所有 module 塞在一起，可以通过规则划分到不同 Chunk。

简单理解：
Module = 零散积木
Chunk = 把积木按照规则分装成几个收纳盒（内存里，盒子！）
Bundle = 把每个收纳盒导出成压缩好的文件放到硬盘

##### 4.3.3第三步：所有 Chunk 分别输出成 Bundle

- runtime chunk → runtime.[hash].js（bundle）
- vendors chunk → vendors.[hash].js（bundle）
- common chunk → common.[hash].js（bundle）
- main chunk → main.[hash].js（bundle）
多个 Chunk → 多个 Bundle 文件

#### 4.4 三种 Chunk 类型（Webpack 官方分类，必掌握）

1. Entry Chunk（入口 chunk）
由 entry 入口生成。包含入口自身模块 + 依赖。
2. Async Chunk（异步 chunk）
动态导入 `import('./xxx')` 产生的懒加载 chunk（路由懒加载）
3. Runtime Chunk
`runtimeChunk: 'single'` 手动生成，存放 `__webpack_require__`、chunk 加载逻辑

>splitChunks 做的事情：把原本属于入口 chunk 内部的 module，剥离出来，形成新的并行 chunk
举个直观例子： 原本所有第三方模块都在 main 入口 chunk 里面 splitChunks + cacheGroups 扫描到这些 node_modules 模块 👉 从 main chunk 剥离 👉 新建一个独立 vendors chunk
这就是 chunk 的核心价值：重组模块分组，实现拆分

#### 4.5 极简面试背诵版本

1. Module：项目中每一个被引用的源码模块；
2. Chunk：webpack 在构建时，将多个 module 按照入口、分割规则组合而成的内存逻辑块，用于实现代码分割，重组模块分组；
3. Bundle：chunk 经过处理后输出在磁盘上的最终文件；
4. 执行链路：Module 收集 → 组装 / 分割成若干 Chunk → Chunk 编译输出 Bundle；
5. splitChunks、runtimeChunk 的本质：重新划分 chunk，把 module 在不同 chunk 之间转移剥离。

### 5. Webpack hash /chunkhash/contenthash 完整区别

先抛出核心结论：

1. hash：整个项目全局同一个哈希（最垃圾，缓存方案禁用）
2. chunkhash：同一个 chunk 共用哈希（过渡方案，存在缓存失效缺陷）
3. contenthash：文件自身内容单独哈希（生产静态缓存标准方案 ✅）

> 前置知识回顾：Module、Chunk、Bundle
>
> 1. Module：源码文件
> 2. Chunk：打包过程代码块（入口 chunk、splitChunks 拆分出来的 chunk、runtimeChunk）
> 3. Bundle：最终输出的文件（一个 chunk 最终输出一个或多个 bundle）

## Vite

### 1. 核心定位

Vite = 开发服务器（Dev Server） + 生产构建工具（底层 Rollup）
两大阶段完全两套机制：开发环境 ≠ 生产环境

### 2. 开发环境原理（Native ESM + esbuild）

核心机制

1. 浏览器原生支持 ES Module import
2. Vite DevServer **不提前打包全部代码**（和 webpack 最大区别）
3. 浏览器请求哪个模块，Vite 实时编译哪个模块 → 按需编译

**两个关键步骤**

1. **依赖预构建（esbuild 执行）**

   - 目标：node_modules 第三方包
   - 作用：CommonJS → ESM、合并零散依赖，减少浏览器请求
   - 产物缓存：node_modules/.vite

2. **业务源码：按需即时转译**
使用 esbuild 处理 TS、JSX、Vue 单文件

### 3. 生产环境原理

生产打包不再使用 esbuild，使用 Rollup
原因：esbuild 打包缺少完善 Tree-Shaking、代码分割、格式化等生产级优化；Rollup 对 ESM 打包更优秀。

### 4. Vite 核心配置 vite.config.js

常用配置项

1. root：项目根目录
2. base：部署基础路径
3. resolve
  a. alias 路径别名
  b. extensions 后缀解析
4. server 开发服务器
  a. port、open、proxy 代理、host
5. build 构建配置
  a. outDir 输出目录
  b. rollupOptions：自定义 Rollup 配置
  c. chunkSizeWarningLimit 包大小警告
6. plugins 插件系统

### 5. Vite 插件机制

- 插件顺序：
  a. 框架插件（vue/react）
  b. Vite 核心插件
  c. 用户自定义插件
- 插件钩子分为：开发钩子（Vite Dev）、构建钩子（Rollup）

>兼容一部分 Rollup 插件 API

### 6.HMR 热更新（Vite 优势）

- 文件修改 → 只重新编译当前文件
- 通过 `WebSocket` 通知浏览器动态替换模块
- **不重建整张依赖图**，毫秒级刷新

### 7. SFC 单文件组件处理（Vue）

`@vitejs/plugin-vue` 解析.vue 文件 拆分 template /script/style 分别处理

### 8. 静态资源处理

和 webpack 类似：

- 图片、字体、json
- ?raw 获取文本、?url 获取路径、?inline 内联

### 9. 环境变量

`.env`、`.env.development`、`.env.production`

- `VITE_` 前缀才能在前端代码访问
- import.meta.env 获取环境变量

### 10. rollupOptions 完整详解  

前置基础

1. Vite 开发环境（serve）：使用原生 ESM + esbuild 预构建，不使用 Rollup
2. Vite 生产打包（build）：底层完全基于 Rollup
   rollupOptions = 把原生 Rollup 的配置透传给内部 Rollup 打包器。

>等价关系：
>Webpack → optimization.splitChunks + cacheGroups
>Vite(Rollup) → rollupOptions.output.manualChunks

```js
// vite.config.ts
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    // 所有rollup原生配置写在这里
    rollupOptions: {
      input: {},
      output: {},
      external: [],
      plugins: []
    }
  }
})
```

#### 10.1 rollupOptions 常用顶层配置

1. input：自定义入口
默认 src/index.html多页面项目必用

```js
rollupOptions: {
  input: {
    main: './index.html',
    admin: './admin.html'
  }
}
```

key：chunk 名称；value：入口 html 路径

1. external 外部化依赖

作用：指定包不参与打包，交给外部 CDN 引入，减少产物体积
和 `webpack externals` 功能一模一样

```js
rollupOptions: {
  // 字符串/正则
  external: ['vue', 'vue-router']
}
```

配合 html 内 CDN script 使用。

1. plugins
注入原生 Rollup 插件，只在 `vite build` 阶段生效

#### 10.2 重点：rollupOptions.output（最常用）

```js
rollupOptions: {
  output: {
    // 1. 输出文件名规范（分类打包js/css/资源）
    chunkFileNames: 'assets/js/[name]-[hash].js',
    entryFileNames: 'assets/js/[name]-[hash].js',
    assetFileNames: (assetInfo) => {
      // 区分css、图片、字体分类存放
      if (assetInfo.name?.endsWith('.css')) {
        return 'assets/css/[name]-[hash][extname]'
      }
      return 'assets/imgs/[name]-[hash][extname]'
    },

    // 2. 核心：manualChunks 手动分包（对标webpack cacheGroups）
    manualChunks: {
      // key：chunk名称；value：依赖包数组
      'vue-vendor': ['vue', 'vue-router', 'pinia'],
      'ui': ['element-plus']
    },

    // 3. 其他配置
    format: 'es', // vite默认es模块
    sourcemap: false
  }
}
```

1. entryFileNames
入口 chunk 文件命名
多页面 / 入口文件打包出来的 js。
2. chunkFileNames
代码分割产生的异步 chunk、分包 chunk
`manualChunks`、路由懒加载 `import()` 生成的文件。
3. assetFileNames
静态资源：css、图片、字体等资源文件命名。
占位符说明（和 webpack 类似）
`[name]`：原始文件名
`[hash]`：内容哈希（contenthash）用于浏览器缓存
`[extname]`：文件后缀 .png/.css
⚠️ 注意：Rollup 没有 `[contenthash]`，统一使用 `[hash]`，作用相同。

#### 10.3 重中之重：manualChunks【对标 webpack cacheGroups】

两种写法
写法 1：对象语法（简单场景）

```js
manualChunks: {
  vendor: ['vue', 'vue-router', 'axios']
}
```

含义：把数组内所有包提取到单独 vendor-[hash].js
写法 2：函数语法（高级，匹配路径，最强！）
类似 webpack test 正则匹配 node_modules

```js
manualChunks(id) {
  // id = 文件绝对路径
  if (id.includes('node_modules')) {
    // 所有第三方包统一打入vendors
    return 'vendors'
  }
}
```

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      // 多页面入口，单页面项目可以删除
      input: {
        main: './index.html'
      },
      external: [],
      output: {
        // 文件目录分类
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/chunk-[name].[hash].js',
        assetFileNames(assetInfo) {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name].[hash][extname]'
          }
          const imgExts = ['.png', '.jpg', '.svg', '.gif']
          if (imgExts.some(ext => assetInfo.name?.endsWith(ext))) {
            return 'images/[name].[hash][extname]'
          }
          return 'assets/[name].[hash][extname]'
        },

        // 手动分包
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            // 框架单独分包
            if (id.includes('vue')) return 'vue-bundle'
            if (id.includes('element-plus')) return 'ep-ui'
            // 其余第三方
            return 'vendors'
          }
        }
      }
    }
  }
})
```

### 11. Vite 优缺点总结

✅ 优点

- 冷启动极快、HMR 速度快
- 开箱即用，配置简洁
- esbuild 高性能转译
❌ 缺点
- 开发与生产构建不一致（dev esbuild /build rollup），偶现线上 bug
- 对极老 CommonJS 库兼容性不如 webpack
- 大型复杂自定义打包场景插件生态弱于 webpack

## 三、Webpack VS Vite 核心对比（重中之重）

### 1. 底层模型差异

Webpack：Bundle-based 打包器
启动时遍历全部依赖 → 全部编译打包成 bundle 才能运行
Vite Dev：Native ESM 按需服务
浏览器主动请求模块，按需实时编译，启动不打包业务代码

### 2. 速度差异具体根源

1. 冷启动
Webpack：构建完整依赖图，全量编译
Vite：仅预构建第三方依赖，业务代码零提前处理
2. HMR
Webpack：变更后重新执行构建流水线
Vite：仅重编译变更文件
3. 转译工具
Webpack 默认 Babel (JS)；
Vite 使用 esbuild (Go)

### 3. 生产构建

Webpack：自身打包引擎
Vite：调用 Rollup

### 4. 生态

Webpack：成熟、插件极多，适合复杂工程、微前端模块联邦
Vite：现代项目首选，Vue/React 新项目主流

### 5. 兼容性

Webpack：兼容老旧库、CommonJS 项目友好
Vite：优先面向 ESM，老旧包容易出现兼容问题

## 四、易混淆高频考点（面试必考）

1. esbuild 为什么快？
使用 Go 语言编写，充分利用多线程；避免 JS 引擎开销。
2. 为什么 Vite 生产不用 esbuild 打包？
esbuild Tree-Shaking 不完善、不支持精细代码分割、输出优化不足。
3. Tree-Shaking 生效条件？
ESM、production 模式、正确配置 sideEffects
4. Webpack chunk、bundle、module 区别

- module：源码单个文件模块
- chunk：打包过程中间产物
- bundle：最终输出文件

1. 哈希三种 hash 区别
hash、chunkhash、contenthash 使用场景
2. Vite 依赖预构建目的？
解决 CommonJS 包无法直接被浏览器 ESM 识别，合并大量小模块减少网络请求
将 CommonJS 转成 ESM，合并零散依赖，减少网络请求
