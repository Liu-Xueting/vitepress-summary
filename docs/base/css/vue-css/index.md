# Vue3中的CSS

## scoped作用域

- 当 `<style>` 标签带有 scoped attribute 的时候，它的 CSS 只会影响当前组件的元素
  原理：在标签上生成一个 data-xxxx 属性，通过该属性实现唯一性
- 使用 scoped 后，父组件的样式将不会渗透到子组件中。不过，子组件的根节点会同时被父组件的作用域样式和子组件的作用域样式影响
  - 子组件的根节点会收父组件的影响，非根节点不是影响
    如果子组件child1中最外层div的类名也叫box1，则会被父组件的样式替代
    如果子组件child1中非外层div的类名也叫box1，则不受父组件影响
  - 子组件被添加两个 data-xxx属性 `<div class="childbox1" data-v-c74b84a5="" data-v-beda6b21=""> 我是子组件 </div>`

```vue
<template>
    <h2>测试作用域scoped</h2>
    <br />
    <div class="box1">我是box1</div>
    <br />
    <child1></child1>
</template>

<script setup>
import child1 from "@/components/child1.vue";
</script>

<style scoped>
.box1 {
    width: 200px;
    height: 200px;
    background-color: pink;
    color: black;
}
</style>
```

## 选择器

- :deep() 深度选择器，可以直接选中组件中的内容

- :global() 全局选择器，所以声明的样式组件中也会生效
    如果想让其中一个样式规则应用到全局，比起另外创建一个 `<style>`，可以使用 :global 伪类来实现

- :slotted() 插槽选择器
    默认情况下，作用域样式不会影响到 `<slot/>` 渲染出来的内容，因为它们被认为是父组件所持有并传递进来的
    注：这里是指在子组件中写样式，对父组件插槽渲染出来的内容生效！！！

- 全局样式和局部样式混用
  
  ```css
    <style>
    /* 全局样式 */
    </style>

    <style scoped>
    /* 局部样式 */
    </style>
  ```

父页面：

```vue
 <template>
    <h2>测试选择器</h2>
    <br />
    <div class="box1">我是box1</div>
    <br />
    <child1> <div class="box3">我是插槽中的默认内容</div></child1>
</template>

<script setup>
import child1 from "@/components/child1.vue";
</script>

<style scoped>
.box1 {
 width: 200px;
 height: 200px;
 background-color: pink;
 color: black;
}

/* 全局选择器 */
:global(.box2) {
 font-weight: bold;
 font-size: 20px;
 color: red;
}
</style>

<style>
/* 全局样式 */
</style>
```

## css module

- 一个 `<style module>` 标签会被编译为 CSS Modules 并且将生成的 CSS class 作为 $style 对象暴露给组件。   (通俗的说：就是template 和 script中可以直接获取 css的类对象)
  注：得出的 class 将被哈希化以避免冲突，实现了同样的将 CSS 仅作用于当前组件的效果。
- 可以通过 useCssModule API 在 setup() 和 `<script setup>` 中访问注入的 class。
- 另外module还可以自定义名称，比如 `<style module="ypf">`
   A. template中调用则：`<div :class="ypf.box1">我是box1</div>`
   B. script中调用则：`let myObj = useCssModule("ypf");`

## Less的使用

在Vue项目中，需要通过npm安装相关包(开发依赖即可)
【npm install less -D】【npm install less-loader -D】
然后直接使用即可：

```css
<style scoped lang="less">

.box1 {
    width: 400px;
    height: 400px;
    background-color: antiquewhite;

 .childBox {
    width: 200px;
    height: 200px;
    background-color: aqua;
 }
}
</style>
```

## Sass的使用

在Vue项目中，需要通过npm安装相关包(开发依赖即可)
【npm install sass -D】【npm install sass-loader -D】
然后直接使用即可：

```css
<style scoped lang="scss">
.box1 {
 width: 400px;
 height: 400px;
 background-color: antiquewhite;

 .childBox {
  width: 200px;
  height: 200px;
  background-color: aqua;
 }
}
</style>


