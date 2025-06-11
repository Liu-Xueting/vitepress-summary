# Watch & Computed

## Computed 计算属性

computed 是一种计算属性，用于根据响应式数据自动重新计算值。它的主要特点是 **缓存机制**，即当计算属性依赖的响应式数据没有变化时，计算属性会从缓存中读取值，而不会重新计算。这使得 computed 非常适合用于需要根据现有数据派生出新数据的场景，例如购物车商品结算。

```js
import { computed, ref } from 'vue';

let price = ref(0);
let p = computed(() => {
return `$` + price.value;
});

price.value = 300;
console.log(p.value); // '$300'
```

## watch 监听器

watch 是一种侦听器，用于监听响应式数据的变化，并在变化时执行自定义逻辑。与 computed 不同，watch 没有缓存机制，每次数据变化都会触发回调函数。watch 适用于需要在数据变化时执行复杂逻辑或副作用的场景，例如异步请求或 DOM 操作。

```js
import { ref, watch } from 'vue';

let message = ref({ foo: { bar: { name: 'sun' } } });
let message2 = ref('da sun');

watch([message, message2], (newVal, oldVal) => {
    console.log(newVal, '新值');
    console.log(oldVal, '旧值');
}, {
    deep: true, // 深度监听
    immediate: true // 是否立即调用一次
});
```

**主要区别**:

功能：computed 用于计算属性，watch 用于监听值的变化并执行回调。

缓存机制：computed 依赖的属性不变时会调用缓存，watch 每次值变化都会调用回调。

返回值：computed 必须有 return，watch 可以没有。

使用场景：computed 适用于一个属性受多个属性影响的场景，watch 适用于一条数据影响多条数据的场景。

异步支持：computed 不支持异步，watch 支持异步
