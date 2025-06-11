# 响应式数据丢失

vue3的响应式是基于 proxy
从vue2的 Object.defineProperty 到vue3的 proxy 可谓是一个质的飞跃。vue2的响应式是需要递归+遍历每一个对象的属性进行数据劫持，而在vue3中只需要对对象层进行监听即可。

## 1、ref和reactive之间的关系

如果我们用ref定义基本类型时，实际上还是使用 `Object.defineProperty` 进行数据劫持监听。但如果是定义引用类型时，底层代码上是借用 reactive 函数进行数据劫持的。

## 2、reactive定义的变量重新赋值会失去响应式，而ref不会

```js
import {ref,reactive} from 'vue';
let test = {age:2};
let obj = reactive({age:1})
let obj1 = ref({age:1})

obj = test;  //在vue2的响应式中，人们习惯直接赋值了。在进入到vue3的时候，大部分的开发者没有看文档或者基于vue2的习惯，会进行这样的赋值情况。比如对象的再次初始化的情况。
obj1.value = test;

```

通过reactive()包含的对象是进行了内部的proxy代理，因此具有响应式。但是像test这个对象，它是没有进行数据劫持的，而对象赋值的时候实际上是引用地址赋值。那么obj这个对象变成了一个没有数据劫持的引用地址，那么它也就失去了响应式。
但是obj1重新赋值时会保留自身的响应式。因为对 ref 定义的变量重新赋值时会进入 set 函数，且重新赋值的是一个对象的话，那么它会再次进入 toReactive 函数进行数据劫持，这就是为什么ref定义的变量重新赋值对象时依旧保留响应式的根本原因。

## 3、解构响应式对象会造成响应式丢失

通过上面我都知道，不管是ref还是reactive定义的对象变量，都会经过 reactive 函数来进行proxy代理。但是即使是对象，也会出现响应式丢失的情况。

```vue
<script setup>
import {reactive,onMounted} from 'vue';
let obj = {
    a:18,
    aa:{
        age:18
    },
    aaa:{
        friend:{
            age:18
        }
    }
}
let rect = reactive(obj);
let {a,aa,aaa} = rect;
onMounted(()=>{
    setTimeout(()=>{
        a = 2;
        aa.age = 2;
        aaa.friend.age = 2;
    },2000)
})
</script>
<template>
    <div>{{a}}</div>
    <div>{{aa.age}}</div>
    <div>{{aaa.friend.age}}</div>
</template>
```

上面的运行结果就是，a变量没有响应式，aa和aaa都是响应式。这是因为在解构赋值中，如果是原始类型的话是按照值传递，如果是引用类型的话是按照引用地址传递。

```md
a = rect.a; //rect.a是一个基本类型，所以是直接赋值
aa = rect.aa; //rect.aa是一个引用类型，在内部处理时触发条件判断，且非可读对象即从Map数据结构中返回已经代理的响应式对象
aaa = rect.aaa //跟rect.aa一个道理
```
