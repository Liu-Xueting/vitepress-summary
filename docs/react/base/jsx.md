# JSX

## JSX转化过程

- JSX 仅仅是 `createElement` 的语法糖
- JSX 语法会被 Babel 插件转换为 `React.createElement` 函数调用
- createElement 函数的返回值是一个 React 元素对象(虚拟DOM)

JSX 语法糖的转换过程如下：

```js
const element = <h1 className="greeting">Hello, world!</h1>;
// 转换为 React.createElement 函数调用
const element = React.createElement(
    'h1',
    { className: 'greeting' },
    'Hello, world!'
);
// 转换为 React 元素对象
const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world!'
    }
};
```
