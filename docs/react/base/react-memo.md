# React.memo

作用：允许组件在 props 没有变化的情况下跳过渲染，提升性能。
React 组件默认渲染机制：只要父组件重新渲染，子组件也会重新渲染。
使用 memo 可以避免不必要的渲染，提升性能。

## 基本使用

```tsx
import React, { memo } from 'react';

const Child = memo(function Son({ name }) => {
    console.log('Child render');
    return <div>{name}</div>;
});
const Parent = () => {
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState('React');

    return (
        <div>
            <Child name={name} />
            <button onClick={() => setCount(count + 1)}>Count: {count}</button>
            <button onClick={() => setName(name === 'React' ? 'Vue' : 'React')}>Change Name</button>
        </div>
    );
};
export default Parent;
```

## React.memo - props比较机制

机制：在使用memo缓存组件之后，React会对 每一个 prop 使用 Object.is 进行比较, 返回true 则不渲染，返回 false 则渲染。

prop 是简单类型：

Object.is(3,3) // true 没有变化

prop 是引用类型 （对象、数组、函数）：

Object.is([],[]) // false  有变化，React只关心引用是否有变化
