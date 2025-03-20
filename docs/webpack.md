# 构建工具

当我们习惯Node模块化编写方式（使用npm获取模块）后，在回到前端会觉得前端的模块化开发方式很不方便，比如：不能放心的使用模块化规范（浏览器兼容问题）。
比如：Node的模块化运行在服务器端，而前端的模块化运行在浏览器端，前端的模块化需要通过script标签引入，并且这些模块浏览器会去请求，这样会导致页面加载速度变慢。

构建工具可以将多个模块打包成一个文件，减少页面请求次数，提高页面加载速度。
构建工具可以将使用ESM规范编写的代码转换成旧的JS规范，比如：CommonJS、AMD、CMD等，这样就可以使得所有的浏览器都可以支持代码。

## Webpack

- 使用步骤：
    1. 初始化项目：`npm init -y`
    2. 安装webpack：`npm install webpack webpack-cli -D`  // webpack-cli是webpack的命令行工具
    3. 在项目中创建一个src目录，然后编写一个入口文件：`src/index.js`
    4. 创建webpack配置文件：`webpack.config.js`
    5. 配置webpack.config.js文件
    6. 执行打包命令：`pnpm webpack`


如果使用Jquery，需要安装Jquery：`npm install jquery`,然后在index.js中引入Jquery：`import $ from 'jquery'`
最后打包时会将Jquery打包到main.js中。**代码会按需打包（判断需要执行的代码进行打包）**

**注意**：
src是前端源代码目录，遵循前端代码规范，比如：ES6、ES7、TS、JSX、CSS等。
src以外的目录是NodeJS，遵循NodeJS规范，比如：CommonJS、AMD、CMD等，但在package.json中配置了`"type": "module"`，所以NodeJS也可以使用ESM规范。

### webpack配置文件

webpack.config.js

```js
const path = require('path')
module.exports = {
    mode: 'development' | 'production',  // 模式：开发模式|生产模式
    // entry: './src/index.js',  // 入口文件(一般不改动)
    // entry: ['./src/index.js', './src/main.js'],  // 多入口文件（打包成一个文件）
    // 多文件打包（分文件打包）如果output中输出文件只有一个就会报错，需要使用占位符[name]来解决
    entry: {
        main: './src/index.js',  // 入口文件 打包成main.js
        sub: './src/index.js'  // 入口文件 打包成sub.js
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  // 打包后的文件存放目录(必须绝对路径)
        // filename: 'main.js',  // 打包后的文件名
        // filename: '[name].js',  // 打包后的多文件名
        filename: '[name]-[id]-[hash].js',  // 打包后的多文件名(自动生成不同的id和hash)
        clean: true  // 每次打包前清空dist目录
    }
}
```

### **-loader

上面安装的webpack只能打包js文件，如果要打包其他文件，需要安装对应的loader。

- css-loader：解析css文件
- style-loader：将css文件插入到html文件中
- less-loader：解析less文件
- sass-loader：解析sass文件
- file-loader：解析图片文件
- babel-loader：解析ES6、ES7、TS等文件
- vue-loader：解析Vue文件
- ts-loader：解析TS文件
- ...

```bash
npm install css-loader style-loader less-loader sass-loader file-loader babel-loader vue-loader ts-loader -D
```

```js
module.exports = {
    module: {
        rules: [
            // 每一个对象就是一个loader
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] 
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: 'file-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         limit: 1024 * 8  // 小于8kb的图片转换成base64格式
                //     }
                // }
                type:"asset/resource" // 图片直接资源类型的数据，可以通过指定type来处理
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
}
```

**注意**：

1. css-loader只是打包css代码 生效是style-loader 
2. 数组有顺序要求，数组从后往前执行
3. 图片默认支持，只需要配置 | 使用url-loader来处理


### _label

在编写js代码时，有时候会使用ES6的语法，比如：import、export，箭头函数等，但是浏览器不支持这些语法，所以需要使用babel-loader来将ES6的语法转换成ES5的语法。

```bash
pnpm install @babel/core @babel/preset-env babel-loader -D
```

babel-loader将babel和webpack连接起来，@babel/core是babel的核心模块，@babel/preset-env是babel的预设模块，babel-loader会调用@babel/core来解析代码，然后使用@babel/preset-env来转换代码。  

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}
```

package.json兼容的浏览器列表来控制会不会转新特性：

```json
{
    "browserslist": [
        "defaults",
        "not ie <= 11",
    ]
}
```

### 插件

插件为webpack扩展了很多功能，比如：压缩代码、拷贝文件、生成html文件等。

```bash
npm install html-webpack-plugin -D
```

```js
webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',  // 模板文件 打包后的文件会以模板文件为基础 多了一个script标签
            filename: 'index.html',  // 生成的文件名
            minify: {
                removeAttributeQuotes: true,  // 去除属性的双引号
                collapseWhitespace: true  // 去除空格
            },
            hash: true  // 添加hash值
        })
    ]
}
```

**loader和plugin的区别**：

1. loader 会对代码进行编译，会将代码从一个状态转换成另一个状态，比如：将ES6转换成ES5，将less转换成css等。
2. plugin 只是做开发时候的辅助功能，比如：压缩代码、拷贝文件、生成html文件等。

### devServer

- 使用命令`pnpm webpack --watch`可以实时监控文件的变化，但是每次修改文件后都需要手动刷新浏览器，这样很不方便。
- 使用webpack-dev-server可以实时监控文件的变化，并且自动刷新浏览器。

```bash
npm install webpack-dev-server -D
```

将程序部署到服务器上，实现热更新。

```bash
pnpm webpack serve
```

启动服务器并自动在浏览器中打开页面。

```bash
pnpm webpack serve --open
```

```json
package.json
"scripts": {
    "build": "webpack",
    "watch": "webpack --watch",
    "dev": "webpack serve --open",
}
```

```js
webpack.config.js
module.exports = {
    devServer: {
        contentBase: './dist',  // 服务器的根目录
        port: 8080,  // 端口号
        open: true,  // 自动打开浏览器
        hot: true  // 热更新
    }
}
```

**注意**：

`webpack serve --open`不会生成dist目录，而是实时打包到服务器然后在服务器里面运行。 

### _sourceMap

为了解决打包后代码不可读导致不方便调试的问题
可以在浏览器查看源码进行调试

```js
module.exports = {
    devtool: "inline-source-map"
}
```


## Vite

### Vite简介

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

### Vite配置

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

