# 组件声明周期

## 创建组件

执行时机 ：组件创建时（页面加载时）
执行顺序：`constructor` -> `render` -> `componentDidMount`

| 钩子函数 | 触发时机 | 作用 |
| --- | --- | --- |
| constructor | 组件创建时 | 初始化状态，为事件处理程序绑定this |
| render | 每次组件渲染都会触发 | 渲染UI(注意：**不能调用setState**) |
| componentDidMount | 组件挂载后 | 进行DOM操作、数据请求等 |

## 更新阶段

执行时机 ：1. setState 2. 组件接收到新的props 3. forceUpdate
执行顺序：`render` -> `shouldComponentUpdate`-> `componentDidUpdate`

| 钩子函数 | 触发时机 | 作用 |
| --- | --- | --- |
| render | 每次组件渲染都会触发 | 渲染UI(注意：**不能调用setState**) |
| shouldComponentUpdate | 组件更新前 | 控制组件是否需要重新渲染（返回true/false） |
| componentDidUpdate | 组件更新后 | 进行DOM操作、数据请求等 注意：如果要setState()必须在if条件中|

```js
componentDidUpdate(prevProps, prevState) {
    if (this.state.count !== prevState.count) {
        this.setState({ count: this.state.count + 1 });
    }
}
```

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

## 卸载阶段

执行时机 ：组件卸载时
执行顺序：`componentWillUnmount`

| 钩子函数 | 触发时机 | 作用 |
| --- | --- | --- |
| componentWillUnmount | 组件卸载前 | 清除定时器、取消网络请求等 |
