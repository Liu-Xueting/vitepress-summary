# 组件间通信

组件间通信的分类可以分成以下

- 父子组件之间的通信
- 兄弟组件之间的通信
- 祖孙与后代组件之间的通信
- 非关系组件间之间的通信

整理vue中8种常规的通信方案

- 通过 props 传递
- 通过 $emit 触发自定义事件
- ref 与 $parent
- 使用 useAttrs
- EventBus
- Provide 与 Inject
- Vuex
- 槽Slot

## 1. 通过 props 传递

- 适用场景：父组件传递数据给子组件
- 子组件设置 `props` 属性，定义接收父组件传递过来的参数
- 父组件在使用子组件标签中通过字面量来传递值

`children.vue`

```js
props:{  
    // 字符串形式  
 name:String // 接收的类型参数  
    // 对象形式  
    age:{    
        type:Number, // 接收的类型为数值  
        defaule:18,  // 默认值为18  
       require:true // age属性必须传递  
    }  
}  
```

`parent.vue`

```vue
<Children name="jack" age=18 />  
```

## 2. 通过 $emit 触发自定义事件

- 适用场景：子组件传递数据给父组件
- 子组件通过$emit触发自定义事件，$emit第二个参数为传递的数值
- 父组件绑定监听器获取到子组件传递过来的参数

`children.vue`

```js
methods:{  
    // 触发自定义事件  
    handleClick(){  
        this.$emit('add', good)  
    }  
}  
```

`parent.vue`

```vue
<Children @add="cartAdd($event)" /> 
```

## ref 与 $parent

- 父组件在使用子组件的时候设置ref
- 父组件通过设置子组件ref来获取数据
- 子组件通过$parent获取父组件实例 访问和修改父组件数据

父组件

```js
<template>
  <Child ref="childRef" />
</template>

<script setup>
  import Child from './Child.vue';
  const childRef = ref(null);

  onMounted(() => {
    console.log(childRef.value); // 打印子组件实例
  });
</script>
 
```

子组件

```js
<template>
  <Child ref="childRef" />
  <button @click="getChildMessage">获取子组件属性</button>
</template>

<script setup>
  import Child from './Child.vue';
  const childRef = ref(null);

  const getChildMessage = () => {
    console.log(childRef.value.getMessage()); // 打印子组件的 message 属性
  };
</script>
```

在子组件中通过 defineExpose 向外暴露属性，父组件通过 ref 获取子组件实例，再调用子组件的方法获取属性。

$parent

父组件

```vue
<template>
  <child-component :msg="message"></child-component>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue'

const message = 'Hello, World!'

defineExpose({
  message
})
</script>
```

子组件

```vue
<template>
  <div>
    <p>{{ msg }}</p>
    <button @click="handleClick($parent)">Click me!</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const handleClick = ($parent) => {
  // 通过$parent访问父组件向外暴露的message
  console.log($parent.message)
}

const props = ['msg']
</script>
```

## useAttrs

- 适用场景：父组件传递数据给子组件
- 通过`:="$attrs"`传递父组件的属性和事件给子组件
  
`parent.vue`

```vue
<Children type="primary" size="default" :icon="Edit" />  
```

`children.vue`

```js
import { useAttrs } from 'vue' // 引入useAttrs
let $attrs = useAttrs() // 获取父组件传递过来的属性

<div>
  {/* <button :type="$attrs.type" :size="$attrs.size" :icon="$attrs.icon">   */}
  <button :="attrs">
    {{ $attrs.type }}  
  </button>
</div>
```

**注意**：

若子组件用 `defineProps` 接收了某个属性，那么 `$attrs` 中就不会包含这个属性了
`attrs` 是透传 知接受子组件未特定接收的属性

## EventBus

- 使用场景：兄弟组件传值
- 创建一个中央事件总线EventBus
- 兄弟组件通过$emit触发自定义事件，$emit第二个参数为传递的数值
- 另一个兄弟组件通过$on监听自定义事件

Bus.js

```js
// 创建一个中央时间总线类  
class Bus {  
  constructor() {  
    this.callbacks = {};   // 存放事件的名字  
  }  
  $on(name, fn) {  
    this.callbacks[name] = this.callbacks[name] || [];  
    this.callbacks[name].push(fn);  
  }  
  $emit(name, args) {  
    if (this.callbacks[name]) {  
      this.callbacks[name].forEach((cb) => cb(args));  
    }  
  }  
}  
  
// main.js  
Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上  
// 另一种方式  
Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能  
```

Children1.vue

```js
this.$bus.$emit('foo')  
```

Children2.vue

```js
this.$bus.$on('foo', () => {  
    console.log('兄弟组件传值')  
})  
```

## provide 与 inject

- 在祖先组件定义provide属性，返回传递的值
- 在后代组件通过inject接收组件传递过来的值

祖先组件

```js
import Child from "./Child.vue";
//vue3提供provide(提供)与inject(注入),可以实现隔辈组件传递数据
import { ref, provide } from "vue";
let car = ref("法拉利");
//祖先组件给后代组件提供数据
//两个参数:第一个参数就是提供的数据key
//第二个参数:祖先组件提供数据
provide("TOKEN", car);
```

后代组件

```js
import {inject} from 'vue';
//注入祖先组件提供数据
//需要参数:即为祖先提供数据的key
let car = inject('TOKEN');
const updateCar = ()=>{
   car.value  = '自行车';
}
```

## Vuex

- 适用场景: 复杂关系的组件数据传递
- Vuex作用相当于一个用来存储共享变量的容器
- state用来存放共享变量的地方
- getter，可以增加一个getter派生状态，(相当于store中的计算属性），用来获得共享变量的值
- mutations用来存放修改state的方法。
- actions也是用来存放修改state的方法，不过action是在mutations的基础上进行。常用来做一些异步操作

## 插槽Slot

- 适用场景：子父组件间之间的通信
- 通过插槽可以实现父组件向子组件传递数据
- 子组件将数据传给父组件

插槽：

- 插槽:默认插槽、具名插槽、作用域插槽
- 作用域插槽:就是可以传递数据的插槽,子组件可以将数据回传给父组件,父组件可以决定这些回传的
- 数据是以何种结构或者外观在子组件内部去展示！！！

父组件

```vue
<template>
  <div>
    <Test1 :todos="todos">
      <template v-slot="{ $row, $index }">
        <p :style="{ color: $row.done ? 'green' : 'red' }">
          {{ $row.title }}--{{ $index }}
        </p>
      </template>
    </Test1>
    <Test>
      <div>
        <pre>大江东去浪淘尽,千古分流人物</pre>
      </div>
      <!-- 具名插槽填充a -->
      <template #a>
        <div>我是填充具名插槽a位置结构</div>
      </template>
      <!-- 具名插槽填充b v-slot指令可以简化为# -->
      <template #b>
        <div>我是填充具名插槽b位置结构</div>
      </template>
    </Test>
  </div>
</template>
```

子组件1

```vue
<template>
  <div class="box">
    <h1>我是子组件默认插槽</h1>
    <!-- 默认插槽 -->
    <slot></slot>
    <h1>我是子组件默认插槽</h1>
    <h1>具名插槽填充数据</h1>
    <slot name="a"></slot>
    <h1>具名插槽填充数据</h1>
    <h1>具名插槽填充数据</h1>
    <slot name="b"></slot>
    <h1>具名插槽填充数据</h1>
  </div>
</template>
```

子组件2

```vue
<template>
  <div class="box">
    <h1>作用域插槽</h1>
    <ul>
      <li v-for="(item, index) in todos" :key="item.id">
        <!--作用域插槽:可以讲数据回传给父组件-->
        <slot :$row="item" :$index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
//通过props接受父组件传递数据
defineProps(["todos"]);
</script>
```

## 小结

- 父子关系的组件数据传递选择 `props`  与 `$emit` 进行传递，`ref` 与 `$parent`，`usettrs` ，`slot`
- 兄弟关系的组件数据传递可选择 `$bus` ，其次可以选择 `$parent` 进行传递
- 祖先与后代组件数据传递可选择 `Provide` 与 `Inject`
- 复杂关系的组件数据传递可以通过 `vuex` 存放共享的变量

## 父子组件修改值

1. 父组件修改子组件的数据

  子组件定义 `defineExpose`，父组件通过 `ref` 获取子组件实例，再调用子组件的方法修改数据

2. 子组件修改父组件数据

- 父组件使用 `v-model` 绑定数据，子组件通过 `defineEmits(['update:count'])` 触发自定义事件，传递修改后的数据

- 子组件通过 `$emit` 触发自定义事件，触发自定义事件，传递修改后的数据

  在父组件中，使用 reactive 定义一个对象，并通过 v-model 绑定到子组件上：
  
  ```vue
  <template>
    <ChildComponent :obj="obj" @update:obj="updateObj" />
    </template>

  <script setup>
    import { reactive } from 'vue';
    import ChildComponent from './ChildComponent.vue';

    const obj = reactive({
      key: 'test'
    });
    const updateObj = (params) => {
      obj.key = params;
    };
  </script>
  ```

  在子组件中，通过 defineProps 接收父组件传递的数据，并通过 defineEmits 定义一个事件来通知父组件更新数据：

  ```vue
  <template>
    <button @click="onClick">修改父组件数据</button>
  </template>

  <script setup>
    import { defineProps, defineEmits } from 'vue';
    const props = defineProps({
      obj: Object
    });
    const emit = defineEmits(['update:obj']);
    const onClick = () => {
      emit('update:obj', 'child');
    };
  </script>
  ```

- 父组件定义 `defineExpose`，子组件通过 `$parent` 获取父组件实例，访问和修改父组件数据

子/父组件通过 `provide` 向外暴露属性，父/子组件通过 `inject` 获取数据，再对数据进行修改
