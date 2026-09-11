# 文字下划线

```vue

<template>
   <div class="title"><span class="title-text">站点买家占比</span></div>
</template>

<style lang="less">
 .title-text {
    position: relative;
    display: inline-block;
    padding-bottom: 6px;
  }
  .title-text::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #ffa01e;
  }
</style>
