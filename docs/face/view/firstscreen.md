# 首屏加载优化

并不是所有都需要优化，首屏加载时间的长短取决于很多因素，比如网络延迟、服务器响应时间、页面资源大小等。
当首屏出现明显等待白屏时，才需要考虑优化。

## 移动端优化

已废弃：

计算首屏加载时间：`performance.timing.domComplete - performance.timing.navigationStart`

performance.timing属性及其定义：

- navigationStart：页面开始加载的时间
- domComplete：DOM加载完成的时间

最新：

performanceObserver API

```javascript
// list 性能条目观察列表
const observer =  new PerformanceObserver((list) => {
  const entries = list.getEntries();
  entries.forEach((entry) => {
    console.log(entry.domComplete - entry.startTime);
  });
})
// 监听需要监听的性能条目
observer.observe({ entryTypes: ['navigation'] });
```

### 1. 异步加载组件

当首屏加载，不需要显示该组件，是通过一定条件显示，且该组件体积较大时，可以考虑异步加载该组件

```javascript
import { defineAsyncComponent } from 'vue';
// 通过defineAsyncComponent定义异步组件
const AsyncComponent = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./AsyncComponent.vue'));
    }, 1000);
  });
});
```

或者使用`import()`语法

```javascript
const AsyncComponent = () => import('./AsyncComponent.vue');
```

### 2. 图片做成网络图片

对于图片资源比较小的，尽可能做成 base64 图片。

对于图片资源比较大的，尽可能做成网络图片。
做成网络图片后，图片加载时间不算在首屏加载时间内。

### 3. 骨架屏

骨架屏是指在页面加载时，先展示一个占位的骨架结构，等数据加载完成后再替换成真实内容。

注意：骨架屏必须加载在vue框架执行之前，即在`index.html` `id="app"`中

```html
<div id="app">
  <div class="skeleton">
    <div class="skeleton-header"></div>
    <div class="skeleton-content"></div>
  </div>
</div>
```

## 4. 服务端渲染 SSR

服务端渲染（Server-Side Rendering，SSR）是指在服务器端将 Vue 组件渲染成 HTML 字符串，然后发送到客户端进行展示。这样可以减少首屏加载时间，提高用户体验。

服务端渲染的实现方式有多种，常见的有以下几种：

- 使用 Nuxt.js 框架：Nuxt.js 是一个基于 Vue.js 的服务端渲染框架，提供了开箱即用的 SSR 功能，可以快速搭建 SSR 应用。
- 使用 Vue SSR 官方库：Vue 官方提供了一个 SSR 库，可以手动搭建 SSR 应用。需要配置服务器端渲染环境，编写服务器端渲染代码

## 5. CDN 加速

CDN（Content Delivery Network，内容分发网络）是一种通过在全球范围内部署多个节点服务器，将静态资源缓存到离用户最近的节点服务器上，从而提高资源加载速度的技术。

使用 CDN 可以有效减少资源加载时间，提高首屏加载速度。常见的 CDN 服务提供商有 Cloudflare、Akamai、Fastly 等。
使用 CDN 的步骤如下：

1. 选择 CDN 服务提供商，注册账号并创建 CDN 分发。
2. 将静态资源上传到 CDN 服务提供商的服务器上。
3. 配置 CDN 分发的域名和缓存策略。
4. 在项目中使用 CDN 提供的 URL 访问静态资源。

## 6. 图片懒加载

图片懒加载是指在页面加载时，只加载可视区域内的图片，等用户滚动到图片位置时再加载图片。这样可以减少首屏加载时间，提高页面性能。

可以使用第三方库如`vue-lazyload`或`vue3-lazy`来实现图片懒加载功能。

### 使用 vue3-lazy

```bash
npm install vue3-lazy
```

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import { Lazyload } from 'vue3-lazy';

const app = createApp(App);
app.use(Lazyload);
app.mount('#app');
```

```html
<template>
  <div>
    <img v-lazy="image.src" alt="Lazy loaded image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: {
        src: 'https://example.com/image.jpg',
      },
    };
  },
};
</script>
```

### 原生js 实现

```vue
<template>
<img data-src="img/1.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/2.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/3.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/4.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/5.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/6.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/7.jpg" src="img/0.png" alt="xxx" />
<img data-src="img/8.jpg" src="img/0.png" alt="xxx" />
</template>

<script setup>
var images = document.getElementsByTagName("img");
 
 window.addEventListener("scroll", (e) => {
    //当发生滚动事件时调用ergodic事件
    ergodic();
  });
  // 方式一
  // function ergodic() {
  //   // 遍历每一张图
  //   for (let i of images) {
  //     //判断当前图片是否在可视区内
  //     if (i.offsetTop <= window.innerHeight + window.scrollY) {
  //         //获取自定义data-src属性的值
  //         let trueSrc = i.getAttribute("data-src");
  //         //把值赋值给图片的src属性
  //         i.setAttribute("src", trueSrc);
  //     }
  //   }
  // }
  // 方式二
  function ergodic() {
    for (let i of images) {
      //计算方式和第一种方式不同
      if (i.getBoundingClientRect().top < window.innerHeight) {
        let trueSrc = i.getAttribute("data-src");
        i.setAttribute("src", trueSrc);
      }
    }
  }
  onMounted(() => {
    ergodic();
  });
</script>
```

```js
// 方式三 Intersection Observer 观察器接口
// 创建一个观察器实例
const observer = new IntersectionObserver(callback);
// 为每一张图片绑定一个观察器
for (let i of images) {
  observer.observe(i);
}
// 观察器回调函数 entries数组对象中 isIntersecting属性表示是否进入可视区
function callback(entries) {
  for (let i of entries) {
    if (i.isIntersecting) {
        let img = i.target;
        let trueSrc = img.getAttribute("data-src");
        img.setAttribute("src", trueSrc);
        // 结束观察
        observer.unobserve(img);
    }
  } 
}
```
