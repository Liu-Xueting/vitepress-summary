# v-if 和 v-show 的区别

## 1. v-if

- v-if 是 Vue.js 中的一个指令，用于根据条件渲染元素或组件。
- 当条件为真时，元素或组件会被渲染到 DOM 中；当条件为假时，元素或组件会被从 DOM 中移除。
- v-if 适用于需要频繁切换显示和隐藏的场景，因为它会动态地添加和移除元素。
- v-if 的开销较大，因为每次条件变化时，Vue 都需要重新渲染元素。
- 示例：

```html
<div v-if="isVisible">This element is conditionally rendered.</div>
```

## 2. v-show

- v-show 也是 Vue.js 中的一个指令，用于根据条件显示或隐藏元素。
- 当条件为真时，元素会被显示；当条件为假时，元素会被隐藏，但仍然存在于 DOM 中。
- v-show 适用于需要频繁切换显示和隐藏的场景，因为它只改变元素的 CSS display 属性，而不  
- 会移除元素。
- v-show 的开销较小，因为元素始终存在于 DOM 中，只是通过 CSS 控制其显示和隐藏。
- 示例：

```html
<div v-show="isVisible">This element is conditionally shown or hidden.</div>
```

补充：

在组件使用 v-show 的时候，即使组件被隐藏了，组件内的生命周期函数或者请求依然会被执行。
而使用 v-if 则不会，组件被移除后，生命周期函数和请求也会停止。
