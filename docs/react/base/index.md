# React学习总结

[[TOC]]

## 初始化项目

```bash
npx create-react-app my-app --template typescript
cd my-app
pnpm install
npm start
```

react项目默认隐藏了webpack相关配置文件，如果想要暴露在项目当中，需要执行npm run eject,并且此操作无法回退，此操作根据自行需要执行

## 配置路径别名

在引入文件时如果都是../ ../../这种相对路径方式引用可读性很差
安装依赖

### 方法一：使用tsconfig-paths

```bash
pnpm add -D tsconfig-paths
```

在tsconfig.json中添加路径别名

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

在package.json中添加脚本

```json
{
  "scripts": {
    "start": "tscpaths -p tsconfig.json && react-scripts start",
    "build": "tscpaths -p tsconfig.json && react-scripts build"
  }
}
```

在代码中使用

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { login } from '@/store/modules/user';
import { setToken } from '@/utils/auth';
import { useTranslation } from 'react-i18next';
```

### 方法二：使用craco

```bash
pnpm add -D @craco/craco
```

在package.json中修改脚本

```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

在根目录下新建craco.config.js文件

```javascript
const path = require('path');
module.exports = {
  webpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
```

在tsconfig.json中添加路径别名

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

为了让VSCode识别路径别名，需要在根目录下新建jsconfig.json文件

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## 引入Ant-Design组件库

```bash
pnpm add antd --save
pnpm add @ant-design/icons --save
```

在index.tsx中引入样式

```typescript
import 'antd/dist/antd.css';
```

在需要使用的组件中引入

```typescript
import { Button } from 'antd';
```

在需要使用的组件中引入图标

```typescript
import { UserOutlined } from '@ant-design/icons';
```

**语言汉化**：

在index.tsx中引入

```tsx
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>    
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </React.StrictMode>,
);
```

## 引入react-router-dom

```bash
pnpm add react-router-dom
```

在index.tsx中引入

```tsx
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
        <ConfigProvider locale={zhCN}>
            <App />
        </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>,
);
```

**路由跳转例子**:

在src下新建pages文件夹创建两个路由组件；新建routes文件夹，创建index.tsx文件用于存放路由表，引入路由组件并且向外暴露，就像下面这样：

```tsx
import { Navigate } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';

const router = createBrowserRouter([
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path:'/',
        element: <Navigate to="/home" />
    }
])

export default router;
```

在App.tsx中引入路由表

```tsx
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
export default App;
```
