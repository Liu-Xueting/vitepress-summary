# React项目创建

## Create-React-App

Create-React-App是一个官方提供的脚手架工具，用于快速创建React应用程序。它提供了一个开箱即用的开发环境，包含了Webpack、Babel等工具的配置，使得开发者可以专注于编写代码，而不需要担心底层的配置问题。

```bash
npx create-react-app my-app
cd my-app
npm start
```

ts 模板

```bash
npx create-react-app my-app --template typescript
cd my-app
npm start
```

eject 弹出配置

如果需要自定义配置，可以使用`eject`命令将配置文件弹出到项目根目录，比如 Webpack, Babel, ESLint 等。注意，这个操作是不可逆的，一旦执行，就无法再使用`create-react-app`提供的默认配置。

```bash
npm run eject
```

## 从零创建 webapck react 工程

可以从零开始创建一个React项目，使用Webpack作为打包工具。以下是一个简单的步骤：

1. **初始化项目**

    ```bash
    mkdir my-react-app
    cd my-react-app
    npm init -y
    ```
2. **安装 webpack**

    ```bash
    npm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin
    ```
    - webpack - 前端构建工具
    - webpack-cli - 让 webpack 支持命令行执行
    - webpack-dev-server - 开发模式下启动服务器，修改代码，浏览器会自动刷新。
4. **安装 babel**

    ```bash
    npm i -D @babel/core @babel/preset-env @babel/preset-react babel-loader
    ```
    - @babel/core - Babel 的核心库
    - @babel/preset-env - 用于转换现代 JavaScript 代码
    - @babel/preset-react - 用于转换 React JSX 语法
    - babel-loader - Webpack 的 Babel 加载器

    在项目更目录新建一个 babel.config.js 文件，将安装的 babel 写入这个文件，babel 会在运行前读取这份配置文件。

    ```javascript
    module.exports = {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ]
    };
    ```

5. **安装 React 和 ReactDOM**

    ```bash
    npm i react react-dom
    ```
6. **安装 CSS 加载器**

    ```bash
    npm i -D style-loader css-loader
    ```
    css-loader 用于解析 css 文件； style-loader 会通过使用多个 `<style></style>` 标签的形式自动把 styles 插入到 DOM 中。

7. **建一个 index.html 文件**

    创建一个在public目录，并且在下面新建一个index.html 文件。

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Application</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>
    ```
8. **新建一个 index.js 文件**

    创建一个名为 src 的文件夹，所有源代码都放在该目录下，在src目录下，创建index.js文件，该文件也就是 webpack 构建的入口文件

    ```javascript
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );
    ```

9. **创建 App 组件**

    新建一个 App.js 文件

    ```javascript
    // ./src/App.js
    import React from "react";
    import "./App.css";
    const App = () => {
    return (
        <div>
        <h1>Hello World!</h1>
        </div>
    );
    };
    export default App;
    ```

10. **创建 webpack config 文件**

    在项目根目录创建一个 webpack.config.js 文件，webpack.config.js 是 webpack 的默认配置文件名

    ```javascript
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: 'bundle.js',
        clean: true,
    },
    devtool: "source-map",
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader",
            },
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: "./public/index.html",
        }),
    ],
    };
    ```

11. **更新 package.json 文件**

    ```json
    "start": "webpack-dev-server --mode development --hot --open",
    "build": "webpack --mode production"
    ```

12. **配置 proxy 代理**

    开发时，需要请求接口，而接口往往是由后端同学完成的，接口需要通过访问后端的 IP 地址来访问，若直接访问会存在跨域问题。

    那么我们可以在 webpack.config.js 中配置 proxy。

    ```javascript
    module.exports = {
    //...
    devServer: {
        proxy: [
        {
            context: ['/auth', '/api'],
            target: 'http://localhost:3000',
        },
        ],
    },
    };

    ```
    现在，对 /api/users 的请求会将请求代理到 `http://localhost:3000/api/users` 上。
