# VueX

Vuex 有 四个核心概念：State、Getter、Mutation 和 Action。

## State

State 是 Vuex 中的状态树，存储着应用的所有状态。它是一个响应式对象，当状态发生变化时，Vue 组件会自动更新。

```js
import { createStore } from 'vuex';
export default createStore({
  state: {
    count: 0,
    name: 'Eduardo'
  },
  getters: {
    doubleCount: (state) => state.count * 2
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  }
});
```

Vuex 通过 Vue 的插件系统将 store 实例从根组件中“注入”到所有的子组件里。且子组件能通过 this.$store 访问到 store 实例。

## Getter

Getter 是 Vuex 中的计算属性，用于从 State 中派生出新的数据。它们可以缓存计算结果，只有当依赖的 State 发生变化时才会重新计算。

```js
export default createStore({
  state: {
    count: 0
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
});
```

Getter 会暴露为 store.getters 对象，你可以以属性的形式访问这些值：

```js
this.$store.getters.doubleCount;
```

## Mutation

Mutation 是 Vuex 中的同步操作，用于修改 State。它们必须是同步函数，且只能通过 commit 方法触发。

```js
export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
```

Mutation 通过 this.$store.commit 方法触发：

```js
this.$store.commit('increment');
```

## Action

Action 是 Vuex 中的异步操作，用于处理复杂的业务逻辑。它们可以包含任意异步操作，并且可以通过 dispatch 方法触发。

```js
export default createStore({
  state: {
    count: 0
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    }
  }
});
```

Action 通过 this.$store.dispatch 方法触发：

```js
this.$store.dispatch('incrementAsync');
```

## Vuex 持久化

Vuex 的状态持久化可以通过使用 `vuex-persistedstate` 插件来实现。这个插件允许你将 Vuex 的状态持久化到本地存储（localStorage 或 sessionStorage）中，以便在页面刷新后仍然能够保留状态。

```bash
npm install vuex-persistedstate
```

```js
import createPersistedState from 'vuex-persistedstate';
import { createStore } from 'vuex';
export default createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  plugins: [createPersistedState()]
});
```

## Module

由于使用单一状态树(只有一个store实例)，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState

根节点状态指的是 Vuex store 的顶层状态对象，它包含了所有模块的状态。

```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：

```js
const moduleA = {
  // ...
  getters: {
    doubleCount (state, getters, rootState) {
      return state.count * 2 + rootState.count
    }
  }
}
```

## 组合式 API

```js
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
  }
}
```

为了访问 state 和 getter，需要创建 computed 引用以保留响应性，这与在选项式 API 中创建计算属性等效。
要使用 mutation 和 action 时，只需要在 setup 钩子函数中调用 commit 和 dispatch 函数。

```js
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()
    const count = computed(() => store.state.count)
    const doubleCount = computed(() => store.getters.doubleCount)

    function increment() {
      store.commit('increment')
      store.dispatch('asyncIncrement')
    }

    return { count, doubleCount, increment }
  }
}
```
