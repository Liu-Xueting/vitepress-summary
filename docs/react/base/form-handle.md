# 表单处理

## 受控组件

- HTML 中的表单元素是可输入的，也就是有自己的可变状态
- 而，React 中可变状态通常保存在于组件的 state 中，并且通过 `setState` 来更新
- React 将 `state` 与表单元素的值 value 绑定在一起，由 state 的值来控制表单元素的值
- 受控组件：其值受到 React 控制的组件

步骤：

1. 在 `state` 中添加一个状态，作为表单元素的值
2. 在表单元素绑定 `change` 事件，使用 setState 来更新状态

受控组件优化

1. 给表单元素提娜佳 name 属性 ，名称与 state 中的属性名一致
2. 根据表单元素类型获取到对应的值

```js

const target = e.target;

const value = target.type === 'checkbox' ? target.checked : target.value;

const name = target.name;

// 根据name 设置对应 state
this.setState({
    [name]: value
});
```

补充：
this.setSate 可以指修改一个属性 因为 this.setSate 会发生浅合并

浅合并 ： 会将新对象的属性与旧对象的属性进行合并，返回一个新的对象 覆盖已有属性

## 非受控组件

使用步骤：

1. 调用 `React.createRef()` 创建一个 ref 对象
2. 将 ref 对象传递给表单元素的 ref 属性
3. 通过 ref.current 获取表单元素的值

```js
import React, { useRef } from 'react';
const Form = () => {
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
};
export default Form;
```

原生开发
