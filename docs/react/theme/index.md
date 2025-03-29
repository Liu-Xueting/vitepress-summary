# antD-Design 主题定制

定制方案：

1. 全局定制：
   **整个应用范围**内的组件都生效
2. 局部定制：
   **只在某些内部**的组件生效  指在div内部

实现方式：

```css
/* 全局定制 */
:root:root{
    --adm-color-primary: #ff0000;
}
/* 局部定制 */
.adm-button{
    --adm-color-primary: #ff0000;
}
```
