# 组件通信

## 父传子

1. 父组件传递数据 - 在子组件标签上绑定属性
2. 子组件接收数据 - 在子组件中使用 props 接收父组件传递的数据

说明：

1. props 可传递任意的数据
2. props 是只读的对象 不能直接进行修改，父组件的数据只能由父组件修改

children 属性

当我们把内容嵌套在子组件标签中时，父组件会自动在名为children 的 prop 属性值接收该内容

```jsx
<Son>
    <span>
        这是父组件传递给子组件的内容
    </span>
</Son>
```

## 子传父

1. 子组件传递数据 - 在子组件中使用 this.$emit() 触发事件 并传递参数
2. 父组件接收数据 - 在父组件中使用 v-on 监听子组件触发的事件

```js
// 子组件
function Son({ onGetMsg }) {
    const sonMsg = '这是子组件传递给父组件的数据';
    return (
        <button onClick={() => onGetMsg(sonMsg)}>
            点击我
        </button>
    );
}
// 父组件
function Father() {
    const getMsg = (msg) => {
        console.log(msg);
    };
    return (
        <Son onGetMsg={getMsg} />
    );
}
```

## 兄弟组件通信

兄弟组件通信 - 借助 状态提升 ，通过父组件进行兄弟组件之间的数据传递

1. A 组件传递数据给父组件
2. 父组件将数据传递给 B 组件

## context

context 是 React 提供的一个 API，用于在组件树中传递数据，而不必通过每个组件的 props 显式地传递数据。它可以用于跨越多个层级的组件传递数据，避免了 props 的逐层传递。
context 主要由两个部分组成：

1. 创建 context：使用 React.createContext() 创建一个 context 对象。
2. 在顶层组件(APP)中使用 Ctx.Provider 组件提供 context 的值。
3. 在底层组件(B) 中通过 useContext 钩子函数获取消费数据

App -> A -> B

```jsx
import React, { createContext, useContext } from 'react';

const MyContext = createContext();
const App = () => {
    const value = 'Hello, World!';

    return (
        <MyContext.Provider value={value}>
            <A />
        </MyContext.Provider>
    );
};
const A = () => {
    return <B />;
};
const B = () => {
    const value = useContext(MyContext);
    return <div>{value}</div>;
};
export default App;
```

## 父组件调用子组件方法

1. 父组件通过 `ref` 获取子组件实例
2. 子组件使用 `useImperativeHandle` 方法来暴露方法，并且要使用 `forwardRef` 包裹组件才可以这也是和 vue 的区别

```jsx
import React, { useRef } from 'react';
import Son from './Son';
const Father = () => {
    const sonRef = useRef();

    const handleClick = () => {
        sonRef.current.sonMethod();
    };

    return (
        <div>
            <button onClick={handleClick}>调用子组件方法</button>
            <Son ref={sonRef} />
        </div>
    );
};
const Son = React.forwardRef((props, ref) => {   // 使用 ref 暴露DOM节点给父组件
    const sonMethod = () => {
        console.log('子组件方法被调用');
    };

    // 使用useImperativeHandle暴露方法给父组件
    React.useImperativeHandle(ref, () => ({
        sonMethod,
    }));

    return <div ref={ref}>子组件</div>;
});
export default Father;
```

## 子组件调用父组件方法

1. 父组件定义方法 通过props 传递给子组件
2. 子组件通过 props 调用父组件的方法

```jsx
import React from 'react';
const Father = () => {
    const handleClick = () => {
        console.log('父组件方法被调用');
    };

    return (
        <div>
            <Son onClick={handleClick} />
        </div>
    );
};
const Son = (props) => {
    return (
        <div>
            <button onClick={props.onClick}>调用父组件方法</button>
        </div>
    );
};
export default Father;
```
