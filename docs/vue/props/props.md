# Props

## 父组件传值

父组件通过 props 向子组件传递数据，子组件通过 props 接收数据。

```vue
<template>
  <div>
    <Child :message="message" />
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue';
import Child from './Child.vue';
const message=ref('Hello from parent component!')
</script>
```

传递不同类型的数据

```vue
<template>
  <div>
    <Child :message="message" :number="number" :isActive="isActive" />
    <BlogPost :comment-ids="[234, 266, 273]" />
    <BlogPost :comment-ids="post.commentIds" />
    <BlogPost
        :author="{
            name: 'Veronica',
            company: 'Veridian Dynamics'
        }"
        />
    <BlogPost :author="post.author" />
  </div>
</template>
```

## 子组件接收数据

子组件通过 props 接收父组件传递的数据。

```vue
<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Number: {{ number }}</p>
    <p>Is Active: {{ isActive }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { PropType } from 'vue';
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  }
});
const { message, number, isActive } = props;
</script>
```
