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
