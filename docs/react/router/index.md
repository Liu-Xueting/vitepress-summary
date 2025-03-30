# React Router

[[toc]]

## 基本使用

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

## 路由导航

### 声明式导航

`<Link to="/home">Home</Link>` 组件用于声明式导航。它会渲染一个 `<a>` 标签，点击后会导航到指定的路由。

```tsx
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
}
```

### 编程式导航

`useNavigate` 是一个 Hook，用于编程式导航。它返回一个函数，可以在需要时调用来导航到指定的路由。

```tsx
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            我是登录页
            <button onClick={() => navigate('/article')}>去文章页</button>
        </div>
    );
}

export default Login;
```

## 路由导航传参

### searchParams 传参

使用 `useSearchParams` Hook 来获取和设置 URL 的查询参数。

```tsx
login.tsx
const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            我是登录页
            <button onClick={() => navigate('/article?id=100&name-jack')}>searchParams</button>
        </div>
    );
}
export default Login;
```

```tsx
article.tsx
import { useSearchParams } from 'react-router-dom';

const Article = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const title = searchParams.get('title');

    return (
        <div>
            <h1>文章详情</h1>
            <p>文章ID: {id}</p>
            <p>文章标题: {title}</p>
        </div>
    );
}
```

### params 传参

使用 `useParams` Hook 来获取 URL 中的参数。

```tsx
import { useParams } from 'react-router-dom';


const Article = () => {
    const params = useParams();
    const id = params.id;
    const title = params.title;

    return (
        <div>
            <h1>文章详情</h1>
            <p>文章ID: {id}</p>
            <p>文章标题: {title}</p>
        </div>
    );
}
```

```tsx
login.tsx
const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            我是登录页
            <button onClick={() => navigate('/article/100/jack')}>params</button>
        </div>
    );
}
export default Login;
```

**别忘在路由表中定义路由参数**：

```tsx
router/index.tsx
const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/article/:id',
        element: <Article />
    }
])

export default router;
```

## 嵌套路由

在路由表中嵌套定义子路由，父路由的组件中使用 `<Outlet />` 组件来渲染子路由。

- 使用children属性配置路由嵌套关系
- 使用`<Outlet />`组件配置二级路由渲染位置

```tsx
router/index.tsx
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'board',
                element: <Board />,
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
])
export default router;
```

```tsx
layout.tsx
import { Outlet, Link } from "react-router-dom"

const Layout = () => {
    return (
        <div>
            我是一级路由
            <Link to="/board">面板</Link>
            <Link to="/about">关于</Link>
            {/* <Outlet /> 代表二级路由的出口 */}
            <Outlet />
        </div>
    )
}

export default Layout
```

```tsx
board.tsx
const Board = () => {
    return (
        <div>
            我是Board页面
        </div>
    );
}

export default Board;
```

```tsx
about.tsx
const About = () => {
    return (
        <div>
            我是About页面
        </div>
    );
}
export default About;
```

**默认二级路由**：

当访问一级路由时，默认的二级路由可以得到渲染，只需要在二级路由的位置去掉path，设置`index: true`即可。

```tsx
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true, // 默认二级路由
                element: <Board />,
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
])
export default router;
```

```tsx
layout.tsx
import { Outlet, Link } from "react-router-dom"
const Layout = () => {
    return (
        <div>
            我是一级路由
            {/* 改为 / */}
            <Link to="/">面板</Link>
            <Link to="/about">关于</Link>
            {/* <Outlet /> 代表二级路由的出口 */}
            <Outlet />
        </div>
    )
}
export default Layout
```

## 404 路由配置

场景：当浏览器访问一个不存在的路由时，应该跳转到404页面。

实现步骤：

1. 创建一个404页面组件。
2. 在路由表数组末尾，以*号作为路由path配置404路由。

```tsx
router/index.tsx
{
    path: '*',
    element: <NotFount />
}
```

```tsx
NotFount.tsx
const NotFount = () => {
    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
        </div>
    );
}
export default NotFount;
```

## 两种路由模式

**history 和 hash**，ReactRouter 分别由`createBrowserRouter` 和 `createHashRouter` 来实现。

| 路由模式         |      url表现         |   底层原理   |   是否需要后端支持  |   SEO支持  |  适用场景  |
| ------------- | :-----------:     | :-----------: | :-----------: | :-----------: | :-----------: |
| history       |       url/login     |   history对象 + pushState事件 |   需要  |  支持  | 小型项目，无SEO要求 |
| hash       |       url/#/login     |   监听hashChange事件           |   需要  |  不支持  |
