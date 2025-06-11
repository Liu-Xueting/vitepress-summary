# React 组件复用

如果两个组件中部分功能相似或相同，需要 **复用** 相似的功能
复用的是 **逻辑**，而不是 **UI**
复用逻辑的方式有：

- render props
- 高阶组件
- 自定义 Hooks

## render props

render props 是一种通过将一个函数作为 prop 传递给组件来共享代码的技术。这个函数会返回一个 React 元素，并且可以接收参数。

使用步骤：

1. 创建一个组件，在组件中提供复用的 状态逻辑代码 （1.状态 2.操作状态的方法）
2. 将要复用的状态作为 `props.children(state)` 暴露给组件外部
3. 使用 `props.children()` 的返回值作为要渲染的内容

```tsx
import React, { useState } from 'react';

class Mouse extends React.Component {
    state = { x: 0, y: 0 };
    

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    };

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    render() {
        return this.props.children(this.state);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
    }
}

function App() {
    return (
        <Mouse>
            {({ x, y }) => (
                <p>
                    鼠标位置: {x}, {y}
                </p>
            )}
        </Mouse>
    );
}
export default App;
```

## 高阶组件

思路分析：

1. 高阶组件(HOC) 是一个函数，接受一个组件作为参数，并返回一个新的组件
2. 高阶组件内部创建一个类组件，在这个类组件中提供复用状态逻辑代码，通过props将复用的状态传递给被包装组件 WrappedComponent

```jsx
const EnhancedComponent = WithHOC(WrappedComponent);

class Mouse extends React.Component {
    
    render() {
        return <WrappedComponent {...this.props} mouse={this.state} />;
    }
}
```

使用步骤：

1. 创建一个函数，以 `with` 开头，接受一个组件作为参数(参数以大写字母开头)
2. 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
3. 在该组件中，渲染参数组件，并将状态和props传递给参数组件

```js
function withMouse(WrappedComponent) {
    class Mouse extends React.Component {
        state = { x: 0, y: 0 };

        handleMouseMove = (event) => {
            this.setState({
                x: event.clientX,
                y: event.clientY
            });
        };

        componentDidMount() {
            window.addEventListener('mousemove', this.handleMouseMove);
        }

        render() {
            return <WrappedComponent {...this.props} {...this.state} />;
        }

        componentWillUnmount() {
            window.removeEventListener('mousemove', this.handleMouseMove);
        }
    };
    return Mouse;
}

function Mouse(props) {
    return (
        <p>
            鼠标位置: {props.mouse.x}, {props.mouse.y}
        </p>
    );
}
const MouseWithHOC = withMouse(Mouse);

function App() {
    
    return (
        <MouseWithHOC>
        </MouseWithHOC>
    );
}
export default App;
```

设置 `displayName` 属性

使用高阶组件存在的问题：得到的两个组件名称相同
原因：默认情况下，React 会使用 **组件的函数名** 作为组件的名称
解决方式：为高阶组件设置 `displayName` 属性
displayName 作用：用于设置调试信息（React Developer Tools 信息）

```js
function withMouse(WrappedComponent) {
    class Mouse extends React.Component {
        // ...
    }
    Mouse.displayName = `WithMouse(${getDisplayName(WrappedComponent)})`;

    function getDisplayName(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    return Mouse;
}

```

## 自定义 Hooks

自定义Hook是以 use 打头的函数，通过自定义 Hook 函数来实现 **逻辑的封装与复用**。相当于 Mixins 的概念。自定义 Hook 函数可以使用其他 Hook 函数，也可以使用普通函数。自定义 Hook 函数的命名规则是以 use 打头，后面可以跟任意名称。

```js
import { useState, useEffect } from 'react';

function useToggle(){
    const [isToggled, setIsToggled] = useState(false);

    const toggle = () => {
        setIsToggled(!isToggled);
    };

    return [isToggled, toggle];
}

function App() {
    const [isToggled, toggle] = useToggle();

    return (
        <div>
            <p>{isToggled ? 'ON' : 'OFF'}</p>
            <button onClick={toggle}>Toggle</button>
        </div>
    );
}
```

封装自定义 Hook 通用思路：

1. 先定义一个函数，函数名以 use 开头
2. 在函数内部封装可复用的逻辑
3. 返回需要暴露给外部的值
