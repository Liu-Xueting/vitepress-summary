# vue2 和 vue3 的区别

## 从上图中，我们可以概览Vue3的新特性，如下

速度更快
体积减少
更易维护
更接近原生
更易使用

### 速度更快

vue3相比vue2

- 重写了虚拟Dom实现
- 编译模板的优化
- 更高效的组件初始化
- undate性能提高1.3~2倍
- SSR速度提高了2~3倍

### 体积减少

通过 `webpack` 的 `tree-shaking` 功能，可以将无用模块 “剪辑”，仅打包需要的

### 更易维护

compositon Api

- 可与现有的Options API一起使用
- 灵活的逻辑组合与复用
- Vue3模块可以和其他框架搭配使用

更好的Typescript支持

### 更接近原生

可以自定义渲染 API

## Vue3新增特性

- `Fragment` 片段
  - Vue2中一个组件只能有一个根节点，而Vue3中可以有多个根节点
- `Teleport` 传送门
  - Vue2中只能在当前组件中渲染，而Vue3中可以将组件渲染到其他DOM节点上
- `Suspense` 组件悬念
  - Vue2中没有异步组件的概念，而Vue3中可以使用异步组件，用于处理异步组件与加载状态，可以实现平滑的过度效果

## webpack和vite

- vue2 使用 webpack 作为构建工具
- vue3 使用 vite 作为构建工具

webpack是一开始是入口文件，然后分析路由，然后模块，最后进行打包，然后告诉你，服务器准备好了可以开始干了
vite先告诉你服务器准备完成，然后等你发送HTTP请求，然后是入口文件，Dynamic import（动态导入）code split point（代码分割）

最大的好处和区别就是为了让项目中一些代码文件多了以后去保存更新数据时更快能够看到实际效果，也就是所谓的（热更新）

## main.js文件

vue2中我们可以使用pototype(原型)的形式去进行操作，引入的是构造函数
vue3中需要使用结构的形式进行操作，引入的是工厂函数

全局API 的使用方式不同

|2.x 全局 API（ Vue）| 3.x 实例 API(app)|
|------------------|------------------|
|Vue.config.xxxx| app.config.xxxx|
|Vue.config.productionTip| 移除|
|Vue.component| app.component|
|Vue.directive| app.directive|
|Vue.mixin| app.mixin|
|Vue.use| app.use|
|Vue.prototype| app.config.globalProperties|

## setup函数

setup函数必须要return 返回出去
setup中没有this
注：setup比beforeCreate、created生命周期更早，也就是说在当前直接用this去获取data中的数据打出来的还是undefined
都知vue2中 `this.$attrs`,`this.$slots`,`this.$emit`等同context中 `attrs`，`slots`，`emit`

## 指令与插槽

- vue2中使用slot可以直接使用slot,而vue3中必须使用v-slot的形式
- v-for与v-if在vue2中优先级高的是v-for指令，而且不建议一起使用
- vue3中v-for与v-if,只会把当前v-if当做v-for中的一个判断语句，不会相互冲突
- vue3中移除keyCode作为v-on的修饰符，当然也不支持config.keyCodes
- vue3中移除v-on.native修饰符
- vue3中移除过滤器filter

## 响应式原理

vue2的响应式原理用Object.defineProperty的get和set进行数据劫持，从而实现响应式

- vue2中只有get和set方法去进行属性的读取和修改操作，当我们进行新增，删除时，页面不会实时更新
- 直接通过下标改数组，页面也不会实时更新

vue3中响应式原理使用 `Proxy` 进行代理，使用 window 内置对象 `Reflect` 反射

- `Proxy` 可以拦截对象中任意的属性变化，当然包括读写，添加，删除等
- `Reflect` 对源对象属性进行操作

## 组件的事件

.native修饰符在vue3中被移除
在vue2中 组件上的事件是通过 `this.$emit` 进行触发的 也就是只监听自定义事件，需要使用 `.native` 修饰符来监听原生事件
在vue3中 组件上的事件是通过 `v-on` 进行触发的 也就是可以监听原生事件和自定义事件

## watchEffct

vue2中使用watch去监听数据的变化
vue3中使用watchEffect去监听数据的变化
watchEffect会在函数执行时立即执行一次, 默认开启 `immediate:true`，并且会在函数内的响应式数据变化时重新执行

## Router

vue2中使用vue-router
vue3中使用<vue-router@4.x>

vue2中还是使用 `this.router.push` 来进行路由跳 转 ， 在 vue3 中没有这些，而是定义了一个 `vue−router` , 直接引入`useRoute`,`useRouter`，相当于vue2中提供的 `this.router.push` 来进行路由跳转
