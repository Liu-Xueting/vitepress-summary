# 全局滚动条样式

可以通过 CSS 自定义全局滚动条的样式。以下是一些常用的滚动条样式属性：

```css
/* ===================== 全局统一滚动条样式 ===================== */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* 轨道 */
::-webkit-scrollbar-track {
  border-radius: 2em;
  width: 4px;
  border-radius: 6px;
  background-color: #ededed;
}

::-webkit-scrollbar-thumb {
  width: 4px;
  border-radius: 6px;
  background-color: #cccccc;

}

::-webkit-scrollbar-thumb:hover {
  background-color: #363636;
}
```
