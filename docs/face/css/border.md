# Border

## border-radius 和 border-image 不兼容

border-radius 和 border-image 不能同时使用，因为 border-image 会覆盖 border-radius 的效果。如果需要圆角边框，可以使用 border-radius 和 border 属性来实现。

1. 方案一：使用 border-radius 和 border 属性来实现圆角边框。

```css
/* 错误示例 */
div {
  border-radius: 10px;
  border-image: url(border.png) 30 round;
}

/* 正确示例 */
div {
  border-radius: 10px;
  border: 10px solid transparent;
  background: url(border.png) no-repeat;
  background-size: cover;
}
```

2. 方案二：使用伪元素来实现圆角边框。

```css
.left {
  position: absolute;
  left: -10%;
  top: 10%;
  width: 60%;
  max-width: 829px;
  height: 70%;
  max-height: 519px;
  background: #fff;
  border-radius: 28px;
  z-index: 1;
  overflow: visible;
}

.left::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 28px;
  padding: 0;
  z-index: -1;
  background: linear-gradient(0deg, #4C4C4C, #AFA0C9, #788EAB);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0) border-box;
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}
```

3. 方案三：直接用 box-shadow 或 outline 实现渐变边框

```css
.left {
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 0 0 6px #AFA0C9, 0 0 0 12px #788EAB;
  // 或者用 outline
  // outline: 6px solid #AFA0C9;
}
```
