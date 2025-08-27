# canvas 画布知识

`canvas` 是一个 HTML 元素，用于在网页上绘制图形。它提供了一个可以通过 JavaScript 绘制图形的区域，常用于游戏、图表和其他动态视觉效果。可以绘制2D图形和3D图形（通过 WebGL）。

## 1.1 获取渲染上下文

`HTMLCanvasElement` 接口提供了 `getContext()` 方法，用于获取渲染上下文。可以通过以下方式获取 2D 或 WebGL(3D) 上下文：

- `getContext('2d')` ：创建一个 `CanvasRenderingContext2D` 二维的渲染上下文对象。
- `getContext('webgl')` ：创建一个 `WebGLRenderingContext` 三维的渲染上下文对象。

## 2.2 画布宽高设置

`canvas` 画布默认会在页面中占据一块位置，这块位置的大小默认是300*150，虽然 `canvas` 是一个元素，可以通过CSS样式设置这个元素的宽和高，但是通常不推荐使用CSS样式设置画布的宽和高。

因为使用CSS属性只是影响画布在页面中的显示大小，并不会改变画布的分辨率，即使使用CSS样式改变了画布的大小，但是画布的分辨率还是300*150，这样会导致画布的内容模糊。
可以通过设置 `width` 和 `height` 属性来控制画布的实际尺寸，也就是更改画布绘画的分辨率。
