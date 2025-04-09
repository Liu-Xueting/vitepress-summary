# NextTick

## NextTick是什么

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

什么意思呢？

我们可以理解成，**Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新**

举例一下

`Html` 结构

```html
<div id="app"> {{ message }} </div>
```

构建一个vue实例

```javascript
const vm = new Vue({
  el: '#app',
  data: {
    message: '原始值'
  }
})
```

修改message

```javascript
this.message = '修改后的值1'
this.message = '修改后的值2'
this.message = '修改后的值3'
```

这时候想获取页面最新的DOM节点，却发现获取到的是旧值

```javascript
console.log(vm.$el.textContent) // 原始值
```

这是因为message数据在发现变化的时候，vue并不会立刻去更新Dom，而是将修改数据的操作放在了一个异步操作队列中

如果我们**一直修改相同数据，异步操作队列还会进行去重**

等待同一事件循环中的所有数据变化完成之后，会将队列中的事件拿来进行处理，进行DOM的更新

## 为什么要有nexttick

举个例子

```javascript
{{num}}
for(let i=0; i<100000; i++){
    num = i
}
```

如果没有 `nextTick` 更新机制，那么 `num` 每次更新值都会触发视图更新(上面这段代码也就是会更新10万次视图)，有了`nextTick` 机制，只需要更新一次，所以nextTick本质是一种优化策略

## 使用场景

如果想要在修改数据后立刻得到更新后的DOM结构，可以使用Vue.nextTick()

第一个参数为：回调函数（可以获取最近的DOM结构）

第二个参数为：执行函数上下文

```javascript
// 修改数据
vm.message = '修改后的值'
// DOM 还没有更新
console.log(vm.$el.textContent) // 原始的值
Vue.nextTick(function () {
  // DOM 更新了
  console.log(vm.$el.textContent) // 修改后的值
})
```

组件内使用 `vm.$nextTick()` 实例方法只需要通过 `this.$nextTick()`，并且回调函数中的 `this` 将自动绑定到当前的 `Vue` 实例上

```javascript
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
this.$nextTick(function () {
    console.log(this.$el.textContent) // => '修改后的值'
})
```

`$nextTick()` 会返回一个 `Promise` 对象，可以是用 `async/await` 完成相同作用的事情

```javascript
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
await this.$nextTick()
console.log(this.$el.textContent) // => '修改后的值'
```
