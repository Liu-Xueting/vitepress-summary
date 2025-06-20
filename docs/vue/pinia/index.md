# Pinia

## 使用 Pinia

```bash
pnpm add pinia
```

main.js

```ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。换句话说，它承载着全局状态。它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有三个概念，state、getter 和 action，我们可以假设这些概念相当于组件中的 data、 computed 和 methods。

store.js

Options API

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

Composition API

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

使用 store

```vue
<template>
  <div>
    <h1>Counter: {{ counterStore.count }}</h1>
    <button @click="counterStore.increment">Increment</button>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
  </div>
</template>
<script setup>
import { useCounterStore } from './store'
const counterStore = useCounterStore()
</script>
```

## Pinia 持久化

Pinia 持久化可以通过使用 `pinia-plugin-persistedstate` 插件来实现。这个插件允许你将 Pinia 的状态持久化到本地存储（localStorage或sessionStorage）中，以便在页面刷新后仍然能够保留状态。

```bash
pnpm add pinia-plugin-persistedstate
```

main.js

```ts
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
```

store.js

在定义Pinia的Store时，可以通过设置 persist 属性来启用持久化功能。例如：

```ts
import { defineStore } from 'pinia';

const useUserInfoStore = defineStore('userInfo', {
state: () => ({
    username: '赫赫',
    age: 23,
    like: 'girl',
}),
// 其他getters和actions
persist: true
});

export default useUserInfoStore;
```

在上述代码中，将 persist属性设置为true，这意味着整个Store的状态将被持久化。如果需要更细致地控制哪些状态被持久化，可以提供一个对象来配置persist属性

```js
persist: {
    key: 'piniaStore', // 存储名称
    storage: sessionStorage, // 存储方式
    paths: ['username', 'like'] // 指定哪些状态需要被持久化
}
```

## Pinia 异步函数

Pinia 支持在 actions 中使用异步函数。你可以直接在 actions 中定义 async 函数，并使用 await 来处理异步操作。

```ts
import { defineStore } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {},
  }),
  actions: {
    async login(loginForm) {
      const res = await request.post('/login', loginForm);
      this.token = res.data.token;
      setToken(res.data.token); // 假设 setToken 是一个存储 token 的函数
    },
    async fetchUserInfo() {
      const res = await request.get('/user/info');
      this.userInfo = res.data;
    },
    logout() {
      this.token = '';
      this.userInfo = {};
      removeToken(); // 假设 removeToken 是一个清除 token 的函数
    },
  },
});
```

在上述代码中，`login` 和 `fetchUserInfo` 方法都是异步的，可以使用 `await` 来等待请求的结果。这样可以确保在获取到数据后再进行状态更新。
