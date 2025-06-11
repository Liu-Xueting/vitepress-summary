# 类组件

## 为什么调用函数要绑定this

在类组件中，`this`应该指向类的实例，才能调用`setState`方法，而不是函数本身，会是`undefined`。为了在事件处理程序中访问组件的状态和属性，我们需要将`this`绑定到当前实例。可以使用箭头函数、构造函数中使用`.bind(this)`或 class实例方法 来实现。

构造函数中使用`.bind(this)`

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // 绑定this
  }

  handleClick() {
    console.log(this); // 指向当前组件实例
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

利用箭头函数自身不绑定this的特点

```javascript
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // 指向当前组件实例
  };

  render() {
    // 箭头函数中的this指向外部作用域 此处为 render 函数 render 方法中的this就是当前组件实例
    return <button onClick={()=>{this.handleClick()}}>Click me</button>;
  }
}
```

```javascript
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // 指向当前组件实例
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

class实例方法

```javascript
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // 指向当前组件实例
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```
