# 路由/图片懒加载

## 路由懒加载

### 实现原理

懒加载的本质实际上就是代码分离，把代码分离到不同的 bundle 中，只有当函数被调用的时候，才去按需加载或并行加载对应的组件内容。

而vue中的路由懒加载其实是利用了webpack的异步加载的方法，webpack会把动态加载的页面组件分离成单独的一个chunk.js文件，使用路由懒加载的写法，只会在进入当前这个路由时候才会走 component ，然后在运行import()编译加载相应的组件，通过import()使得ES6的模块有了动态加载的能力，让url匹配到相应的路径时，会动态加载页面组件，这样首屏的代码量会大幅减少。

可以理解为也是通过Promise的resolve机制，因为Promise函数返回的Promise为resolve组件本身，而我们又可以使用import来导入组件，import会返回一个Promise对象。

### 使用方式

1. 在路由配置中使用 `import()` 函数来动态加载组件。

```javascript
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
routes: [
    {path: '/', component: ()=>import("@/components/Login") }
    ]
})
```

2. webpack提供的require.ensure()

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
Vue.use(Router)
export default new Router({ 
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(["@/components/Login"], resolve)
        }
    ]
})
```

## 图片懒加载

### 实现原理

一张图片就是一个 `<img>` 标签，浏览器是否发起请求图片是根据 `<img>` 的src属性，所以实现懒加载的关键就是，在图片没有进入可视区域时，先不给 `<img>` 的src赋值，这样浏览器就不会发送请求了，等到图片进入可视区域再给src赋值。

### 使用方式

1. `vue-lazyload`

```bash
npm install vue-lazyload --save
```

```javascript
import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://example.com/error.png',
  loading: 'https://example.com/loading.gif',
  attempt: 1
})
```

```html
<template>
  <div>
    <img v-lazy="'https://example.com/image.jpg'" alt="Lazy loaded image">
  </div>
</template>
<script>
export default {
  name: 'LazyImage'
}
</script>
```

### 思路与实现

方案一：clientHeight、scrollTop 和 offsetTop
首先给图片一个占位资源；接着，通过监听 scroll 事件来判断图片是否到达视口；对 scroll 事件做节流处理，以免频繁触发。

```javascript
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  const viewportHeight = document.documentElement.clientHeight;
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  images.forEach(img => {
    const offsetTop = img.offsetTop;
    if (offsetTop - scrollTop < viewportHeight) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    }
  });
};
window.addEventListener('scroll', lazyLoadImages);
lazyLoadImages(); // 初始加载
```

方案二：getBoundingClientRect

```javascript
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
    }
  });
};
window.addEventListener('scroll', lazyLoadImages);
lazyLoadImages(); // 初始加载
```
