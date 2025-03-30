# 组件 v-model

## 基本用法

`v-model` 可以在组件上使用以实现双向绑定。

从 Vue 3.4 开始，推荐的实现方式是使用 defineModel() 宏：

```vue
<!-- Child.vue -->
<!-- Child.vue -->
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>Parent bound v-model is: {{ model }}</div>
  <button @click="update">Increment</button>
</template>
```

父组件可以用 v-model 绑定一个值：

```vue
<!-- Parent.vue -->
<template>
  <Child v-model="count" />
</template>
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
const count = ref(0)
</script>
```

defineModel() 返回的值是一个 ref。它可以像其他 ref 一样被访问以及修改，不过它能起到在父组件和当前变量之间的**双向绑定**的作用：

- 它的 .value 和父组件的 v-model 的值同步；
- 当它被子组件变更了，会触发父组件绑定的值一起更新。

这意味着你也可以用 v-model 把这个 ref 绑定到一个原生 input 元素上，在提供相同的 v-model 用法的同时轻松包装原生 input 元素：

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

## 底层机制

`v-model` 的底层机制是通过 props 和事件来实现的。
它会将父组件的 v-model 绑定的值传递给子组件的 modelValue prop，并在子组件中触发 update:modelValue 事件来更新父组件的值。

defineModel 是一个便利宏。编译器将其展开为以下内容：

- 一个名为 modelValue 的 prop，本地 ref 的值与其同步；
- 一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。

```vue
<!-- Child.vue -->
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

然后，父组件中的 v-model="foo" 将被编译为：

```vue
<!-- Parent.vue -->
<template>
  <Child :modelValue="foo" @update:modelValue="$event => (foo = $event)" />  
</template>
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'
const foo = ref(0)
</script>
```

## v-model 的参数

组件上的 v-model 也可以接受一个参数：

```vue
<!-- Parent.vue -->
<MyComponent v-model:title="bookTitle" />
```

```vue
<!-- Child.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>

```

如果需要额外的 prop 选项，应该在 model 名称之后传递：

```js
const title = defineModel('title', { required: true })
```
