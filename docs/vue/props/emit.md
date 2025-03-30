# Emit 向父组件传递事件

## 使用 `emit` 触发事件

在组件的模板表达式中，可以直接使用 $emit 方法触发自定义事件 (例如：在 v-on 的处理函数中)：

```vue
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```

父组件可以通过 v-on (缩写为 @) 来监听事件：

```vue
<!-- ParentComponent -->
<MyComponent @some-event="handleSomeEvent" />
<MyComponent @some-event.once="handleSomeEvent" />
```

## 事件参数

在触发事件时，可以传递参数：

```vue
<!-- MyComponent -->
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

```vue
<!-- ParentComponent -->
<!-- <MyComponent @increase-by="(n) => count += n" /> -->
<MyButton @increase-by="increaseCount" />

<script setup lang="ts">
function increaseCount(n) {
  count.value += n
}
</script>

```

或者，也可以用一个组件方法来作为事件处理函数：

## 声明触发的事件

```vue
<!-- ParentComponent -->
<MyComponent @increase-by="increaseBy" />
```

```vue
<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
const increaseBy = (n: number) => {
  count.value += n;
};
</script>
```

组件可以显式地通过 `defineEmits()` 宏来声明它要触发的事件,
我们在 `<template>` 中使用的 $emit 方法不能在组件的 `<script setup>` 部分中使用，但 `defineEmits()` 会返回一个相同作用的函数供我们使用：

```vue
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits(['someEvent', 'increaseBy']);
const increaseBy = (n: number) => {
  emit('increaseBy', n);
};
</script>
```

这个 emits 选项和 defineEmits() 宏还支持对象语法。通过 TypeScript 为参数指定类型，它允许我们对触发事件的参数进行验证：

```vue
<script setup lang="ts">
import { defineEmits } from 'vue';
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // 通过返回值为 `true` 还是为 `false` 来判断
    // 验证是否通过
  }
})
</script>
```

## 事件校验

和对 props 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
