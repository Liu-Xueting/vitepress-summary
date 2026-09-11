# 图片加载失败兜底

当图片加载失败时，可以通过 `onError` 事件来处理错误情况，通常会替换为一个默认的占位图片。

```html
<template>
  <img :src="imageSrc" @error="handleError" alt="图片描述" />
</template>

<script>
export default {
  data() {
    return {
      imageSrc: 'path/to/your/image.jpg', // 初始图片路径
      defaultImage: 'path/to/default/image.jpg' // 默认占位图片路径
    };
  },
  methods: {
    handleError(event) {
      event.target.src = this.defaultImage; // 替换为默认图片
    }
  }
};
</script>
```

自定义指令实现

```html
<template>
  <img v-lazy-error="defaultImage" :src="imageSrc" alt="图片描述" />
</template>

<script setup>
import { directive as lazyErrorDirective } from '@/directives/lazy-error';

const imageSrc = 'path/to/your/image.jpg'; // 初始图片路径
const defaultImage = 'path/to/default/image.jpg'; // 默认占位图片路径
</script>

```

```js
// directives/lazy-error.js
export const directive = {
  mounted(el, binding) {
    el.onerror = () => {
      el.src = binding.value; // 使用指令传入的默认图片路径
    };
  }
};
```
