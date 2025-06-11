# React 样式重叠问题

问题：在不同组件使用同一个类名时，可能会出现样式重叠的问题。
原因：组件初始化时，React 会将所有的样式都加载到 DOM 中，如果有相同的类名，则会覆盖之前的样式。
结论：只要导入组件，不管组件生没生效，组件的样式都会生效
解决方案：

1. 手动处理（起不同类名）
2. CSS In JS（CSS Module, styled-components）
3. 推荐使用 CSS Module （React脚手架集成）

CSS Module 通过对CSS类名重命名，保证每个类名的唯一性，避免了样式冲突的问题。`局部作用域`
实现方式：webpack + css-loader + style-loader
命名采用：BEM（Block Element Modifier）命名规范,比如 .list__item_active
在React脚手架中演化成：文件名、类名、hash值，只需要提供 **类名** 即可

注意：

1. 使用单个类名设置样式，不适用嵌套样式
2. 使用驼峰命名法
3. 对于组件库中已有的全局样式，需要使用 `:global` 来声明全局样式
   `:global(.error) {}` `.本地类名 :global(.error) {}` 因为全局样式可能出现样式覆盖问题

```javascript
.error{}

// 变成

.Button__error__1a2b3c4d5e6f7g8h9i0j
```

## 使用

1. 创建名为 `[name].module.css` 的文件（React脚手架约定）
2. 导入样式 ``import styles from './[name].module.css'``
3. 通过 styles 对象访问样式类名
   `<div className={styles.error}>Error</div>`
