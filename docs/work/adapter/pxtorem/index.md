# px转rem适配

## 介绍

`px转rem适配` 插件可以将样式中的 `px` 单位转换为 `rem` 单位，从而实现响应式设计，适配不同屏幕尺寸的设备。

## 安装

使用 npm 安装：

```bash
npm i autoprefixer postcss-pxtorem --save-dev
```

## 使用

1. 在项目的 postcss.config.js 配置文件中引入并配置 `postcss-pxtorem` 插件：

```js
// 布局自适应配置
export default {
    plugins: {
      'postcss-pxtorem': {
        rootValue: 16, // 设计稿宽度 1920px 时，1rem = 192px
        propList: ['*'], // 所有属性都转换
        selectorBlackList: ['.ignore-rem'] // 忽略某些选择器
      },
      autoprefixer: {} // 自动添加浏览器前缀
    }
}
```

1. 在 vite.config.js 中引入 postcss 配置：

```js
export default defineConfig(({ mode }) => {

  return {
    css: {
      postcss: './postcss.config' // 显式声明配置路
    },
  }
});
```

1. 使用 flexible.js 设置根元素字体大小（方案一）

```js
//  增强版适配方案（支持PC+移动）
(function (window, document) {
  const docEl = document.documentElement
  const dpr = window.devicePixelRatio || 1

  // 设置body基准字体
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    }
  }

  // 动态计算rem基准值
  function setRemUnit() {
    const clientWidth = docEl.clientWidth
    let baseSize = 16 // 默认基准值

    // 多分辨率适配策略
    if (clientWidth < 768) {
      baseSize = (clientWidth / 375) * 16 // 移动端适配
    } else if (clientWidth < 1920) {
      baseSize = (clientWidth / 1920) * 16 // PC端等比缩小
    } else {
      baseSize = (clientWidth / 1920) * 16 // 大屏等比放大
    }

    docEl.style.fontSize = baseSize + 'px'
  }

  // 初始化设置
  setBodyFontSize()
  setRemUnit()

  // 监听事件
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      setRemUnit()
    }
  })
})(window, document)

```

1. 在主入口文件 main.js 中引入 flexible.js：

```js
import '@/utils/flexible'
```

1. 使用 amfe-flexible （方案二）

```bash
npm install amfe-flexible --save
```

main.js 中引入：

```js
import 'amfe-flexible'
```
