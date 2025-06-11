# Hook 函数

## useEffect

### useEffect 概念

`useEffect` 是 React 中的一个 Hook，用于在React组件中创建不是由事件引起而是 **由渲染本身引起的操作** 。例如数据获取、发送Ajax请求、手动操作 DOM 等。`useEffect` 允许你在函数组件中执行这些副作用，而不需要使用类组件的生命周期方法。

基本使用：

在组件渲染完毕后，立刻从服务器端获取频道列表并显示在页面中

```tsx
useEffect(() => {
    fetch('https://api.example.com/channels')
        .then(response => response.json())
        .then(data => setChannels(data));
}, []);
```

在这个例子中，`useEffect` 在组件渲染后执行一次，获取频道列表并更新状态。第二个参数 `[]` 表示这个副作用只在 **组件挂载** 时执行一次，相当于 `componentDidMount` 生命周期方法。

### useEffect 依赖项参数说明

|依赖项 | 副作用函数执行时机|
| --- | --- |
| 没有依赖项 | 组件初始渲染 + 组件更新时执行（每次渲染之后执行） |
| 空数组 | 组件初始渲染时执行（相当于 componentDidMount） |
| 有依赖项 | 组件初始渲染 + 依赖项变化时执行（相当于 componentDidUpdate） |

### useEffect 清理副作用

`useEffect` 还可以返回一个清理函数，用于清理副作用，例如取消订阅、清除定时器等。这个清理函数会在组件卸载时执行，或者在下次执行副作用之前执行。

```tsx
useEffect(() => {
    const timer = setInterval(() => {
        console.log('定时器');
    }, 1000);

    return () => {
        clearInterval(timer);
        console.log('清除定时器');
    };
}, []);
```

在这个例子中，`useEffect` 创建了一个定时器，并在组件卸载时清除它。清理函数会在下次执行副作用之前执行，确保不会有多个定时器同时存在。

React严格模式下，开发场景中 `useEffect` 会执行两次，为了检查是否写了副作用的清理函数。生产环境中只会执行一次。

## useMemo

### useMemo 概念

`useMemo` 是 React 中的一个 Hook，用于 **缓存计算结果**，避免不必要的重复计算。它接受一个函数和一个依赖项数组，当依赖项发生变化时，才会重新计算函数的返回值，否则返回缓存的值。

因为别的值的改变也会导致页面重新渲染，所以我们需要使用 `useMemo` 来缓存计算结果，避免不必要的重复计算。

`useMemo` 适用于性能优化，尤其是在计算开销较大的情况下。它可以帮助你避免在每次渲染时都执行昂贵的计算。

### useMemo 语法

使用 `useMemo` 做缓存之后 可以保证 只有count1 变化时 才会重新计算

```tsx
function App() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    const memoizedValue = useMemo(() => {
        return count1 * 2;
    }, [count1]);

    return (
        <div>
            <p>Count1: {count1}</p>
            <p>Count2: {count2}</p>
            <button onClick={() => setCount1(count1 + 1)}>Increment Count1</button>
            <button onClick={() => setCount2(count2 + 1)}>Increment Count2</button>
            <p>Memoized Value: {memoizedValue}</p>
        </div>
    );
}
```

## useCallback

### useCallback 概念

`useCallback` 是 React 中的一个 Hook，用于 **缓存函数**，避免不必要的重复创建。它接受一个函数和一个依赖项数组，当依赖项发生变化时，才会重新创建函数，否则返回缓存的函数。

场景：父组件传递函数给子组件，当父组件重新渲染时，子组件也会重新渲染。使用 `useCallback` 可以避免传递给子组件的函数重复渲染，导致子组件重复渲染

### useCallback 语法

```tsx
import React, { useState, useCallback } from 'react';

const Input = React.memo(({ onChange }) => {
    console.log('Input render');
    return <input type="text" onChange={(e)=>{e.target.value}} />;
});
const App = () => {
    const [value, setValue] = useState(0);

    const handleChange = useCallback((value) => {
        console.log('Input value:', value);
    }, []);

    return (
        <div>
            <Input onChange={handleChange} />
            <button onClick={() => setValue(value + 1)}>Change Value</button>
        </div>
    );
};
export default App;
```
