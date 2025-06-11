# State

## setState 说明

1. `setState` 是 React 中用于更新组件状态的方法
2. `setState` 是异步的，React 会批量更新状态以提高性能，只会触发一次重新渲染
3. 注意：使用该语法时，后面的 `setState` 不要依赖前面的 `setState`，可以使用官网的更新函数

```javascript
this.state = {
    count: 0
};
this.setState({ count: this.state.count + 1 });
console.log(this.state.count); // 0
```

官网的更新函数:

```js
this.setState((prevState) => ({
    count: prevState.count + 1
}));
```

## setState 语法

```javascript
this.setState(updater, [callback]);
```

- updater: 更新函数或对象
- callback: 可选的回调函数，在状态更新后执行

## setState 推荐语法

推荐: 使用 `setState((state,props) => {})` 语法
参数state: 表示最新的state
参数props: 表示最新的props

```javascript
this.state = {
    count: 0
};
// 这种更新还是异步的
this.setState((state, props) => {
    return { count: state.count + 1 };
});
// 但如果连续更新 这里的state是上个更新后的值(最新的值)
this.setState((state, props) => {
    console.log(state.count); // 1
    return { count: state.count + 1 };
});
console.log(this.state.count); // 0
```

## setState 第二个参数

场景：在状态更新后（页面完成渲染）立即执行某个操作
语法：setState(updater, callback)

```javascript
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    handleClick = () => {
        this.setState(
            (state, props) => {
                return { count: state.count + 1 };
            },
            () => {
                console.log(this.state.count); // 1
            }
        );
    };
    render() {
        return <button onClick={this.handleClick}>点击</button>;
    }
}
```

## setState 更新机制

父组件重新渲染时，也会重新渲染子组件，但只会渲染 **当前组件子树** (当前组件及其所有子组件)

## 组件性能优化

### 减轻 state

减轻state：只存储跟 **组件渲染相关的数据**（比如：count/列表数据/loading等）
注意：不要做渲染的数据不放在state中，比如 ：计算出来的值、定时器id、DOM元素等，直接放到this中即可

### 避免不必要的渲染

组件更新机制：父组件更新会引起子组件更新
但子组件没有任何变化也会被重新渲染
解决方式：使用 `shouldComponentUpdate` 来控制组件是否需要重新渲染
作用：通过返回值决定是否重新渲染，返回true表示需要重新渲染，返回false表示不需要重新渲染
触发时机：更新阶段的钩子函数，组件重新渲染之前（render之前）

```javascript
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        // if (this.state.count !== nextState.count) {
        //     return true;
        // }
        // return false;

        return this.state.count !== nextState.count;
    }
    handleClick = () => {
        this.setState((state, props) => {
            return { count: state.count + 1 };
        });
    };
    render() {
        return <button onClick={this.handleClick}>点击</button>;
    }
}
```

### 纯组件

纯组件指在其props和state没有变化时，组件不会重新渲染。它会对props和state进行浅比较，如果没有变化，则不会重新渲染。

浅比较：是指比较对象的引用地址，而不是对象的内容。只有当引用地址发生变化时，才会认为对象发生了变化。

注意：**state 和 props 中属性为引用类型时，应该创建新数据，不要直接修改原数据**

```javascript
// 随机数重复不需要重新渲染
class App extends React.PureComponent {
    state = {
        obj: {
            number: 0
        }
    };
    handleClick = () => {
        const newObj = { ...this.state.obj, number: Math.floor(Math.random()*3) };
        this.setState(() => {
            return { obj: newObj };
        });
    };
    render() {
        return <button onClick={this.handleClick}>随机数</button>;
    }
}
```
