# Scoped 样式穿透

## 什么是scoped

在vue文件中的style标签上，有一个特殊的属性：scoped。

当一个style标签拥有scoped属性时，它的CSS样式就只能作用于当前的组件，通过该属性，可以使得组件之间的样式不互相污染。

## scoped的原理

为组件实例生成一个唯一标识，给组件中的每个标签对应的dom元素添加一个标签属性，`data-v-xxxx`
给 `<style scoped>` 中的每个选择器的最后一个选择器添加一个属性选择器，原选择器 `[data-v-xxxx]` ，如：原选择器为 `.container #id div` ，则更改后选择器为 `.container #id div[data-v-xxxx]`

## 为什么需要穿透scoped

引用了第三方组件后，需要在组件中局部修改第三方组件的样式，而又不想去除scoped属性造成组件之间的样式污染。此时只能通过特殊的方式，穿透scoped。

## 如何穿透scoped

在vue文件中，使用 `>>>` 、 `/deep/`、 `::v-deep` 来穿透scoped。

```vue
<template>
  <div class="container">
    <div class="child">Child Component</div>
  </div>
</template>
<style scoped>
.container >>> .child {
  color: red;
}
.container /deep/ .child {
  color: red;
}
.container ::v-deep .child {
  color: red;
}
</style>
```
