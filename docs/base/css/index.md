# CSS总结

## 1. CSS基础

### 1.1 CSS简介

CSS（Cascading Style Sheets）层叠样式表，用来控制网页的样式和布局。

### 1.2 CSS语法

CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明。

```css
selector {property: value;}
```

### 1.3 CSS选择器

- 元素选择器
- 类选择器
- ID 选择器
- 属性选择器
- 伪类选择器
- 伪元素选择器
- 后代选择器
- 子元素选择器
- 相邻兄弟选择器
  
### 1.4 CSS单位

- px
- em
- rem  
- %
- vw
- vh

### 1.5 CSS颜色

- 十六进制
- RGB
- RGBA
- HSL
- HSLA

### 1.6 CSS背景

- background-color
- background-image
- background-repeat
- background-attachment
- background-position
- background-size
- background
  
### 1.7 CSS文本

- color
- text-align
- text-decoration
- text-transform
- text-indent
- letter-spacing
- word-spacing
- line-height
- font-family
- font-size
- font-weight
- font-style

#### 1.7.1 文本对齐

text-align:

- left
- right
- center
- justify：将拉伸每一行，以使每一行具有相等的宽度，并且左右边距是直的
  
#### 1.7.2 文本方向

direction: ltr | rtl

#### 1.7.3 垂直对齐

vertical-align:

- top
- middle
- bottom

#### 1.7.4 文本装饰

text-decoration:

- none
- underline
- overline
- line-through

#### 1.7.5 文本转换

text-transform:

- capitalize
- uppercase
- lowercase

#### 1.7.6 文本间距

- 文字缩进 text-indent
- 字母间距 letter-spacing
- 单词间距 word-spacing
- 行高 line-height
- 空白折叠 white-space: normal | nowrap | pre | pre-line | pre-wrap
  nowrap 不换行
  pre 保留空白符序列
  pre-line 保留换行符
  pre-wrap 保留空白符序列和换行符

#### 1.7.7 文本阴影

text-shadow: h-shadow v-shadow blur-radius color;

### 1.8 CSS字体

- font-family
- font-size
- font-weight
- font-style
  
### 1.9 CSS盒子模型

- content
- padding
- border
- margin
- box-sizing
- box-shadow
- border-radius
- outline
- overflow
- display
- position

### 1.10 CSS链接

- a:link：未访问的链接
- a:visited：已访问的链接
- a:hover：鼠标悬停在链接上
- a:active：正在点击链接

### 1.11 CSS列表

- list-style-type：circle | disc | square | none
- list-style-position：inside | outside
- list-style-image

### 1.12 CSS表格

- border-collapse
- border-spacing
- border
- vertical-align
- tr:hover | td:hover

## 2. CSS中级

### 2.1 display

- none：隐藏元素
- block
- inline
- inline-block
- flex

### 2.2 position

- static：静态定位的元素不受 top、bottom、left 和 right 属性的影响。
- relative：相对定位元素的定位是相对其正常位置。
- absolute：绝对定位的元素相对于最近的已定位祖先元素，如果没有已定位的祖先元素，那么它相对于最初的包含块。
- fixed：固定定位的元素相对于浏览器窗口是固定位置。
- sticky：粘性定位的元素是基于用户的滚动位置来定位的。
  
### 2.3 css溢出

overflow: visible | hidden | scroll | auto;

- visible：默认值，内容不会被修剪，会呈现在元素框之外。
- hidden：内容会被修剪，并且其余内容是不可见的。
- scroll：内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
- auto：与 scroll 类似，但仅在必要时添加滚动条。

### 2.4 css浮动

float: left | right | none;

- left
- right
- none
  
### 2.5 css清除浮动

- clear: left | right | both | none | inherit
- clear: both：元素的两侧不能有浮动元素
- clear: left：元素的左侧不能有浮动元素
- clear: right：元素的右侧不能有浮动元素
- clear: none：允许元素的两侧有浮动元素
- clear: inherit：继承父元素的清除浮动属性

**清除浮动的方法**：

- 父元素清除浮动

```html  
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>清除浮动</title>
 <style type="text/css">
  .father{
    /*父盒子设置固定高度*/
   height: 100px;
   border: 1px solid red;
  }
  .child{
   width: 100px;
   height: 100px;
   float: left;
   background-color: green;
  }
 </style>
</head>
<body>
 <div class="father">
  <div class="child">child</div>
 </div>
 
</body>
</html>
```

- 使用空元素清除浮动

```html
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>清除浮动</title>
 <style type="text/css">
  .father{
   border: 1px solid red;
  }
  .child{
   width: 100px;
   height: 100px;
   float: left;
   background-color: green;
  }
  .clearfix{
   clear: both;
  }
 </style>
</head>
<body>
 <div class="father">
  <div class="child">child</div>
  <div class="clearfix"></div>
 </div>
 
</body>
</html>
```

- 使用 overflow 属性清除浮动

```html
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>清除浮动</title>
 <style type="text/css">
  .father{
   overflow: hidden;
   border: 1px solid red;
  }
  .child{
   width: 100px;
   height: 100px;
   float: left;
   background-color: green;
  }
  
 </style>
</head>
<body>
 <div class="father">
  <div class="child">child</div>
 </div>
 
</body>
</html>
```

- 使用 :after 伪元素清除浮动

```html
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
 <title>清除浮动</title>
 <style type="text/css">
  .father{
   border: 1px solid red;
  }
  .child{
   width: 100px;
   height: 100px;
   float: left;
   background-color: green;
  }
  .cleafix:after{
   content:'.';
   display: block;
   clear: both;
  }
  
 </style>
</head>
<body>
 <div class="father clearfix">
  <div class="child">child</div>
 </div>
 
</body>
</html>
```

### 2.6 css定位

- top
- right
- bottom
- left
- z-index

### 2.7 inline-block

- inline-block：内联块元素
  与 `display: inline` 相比，主要区别在于 `display: inline-block` 允许在元素上设置宽度和高度。
  与 `display: block` 相比，主要区别在于 `display: inline-block` 在元素之后不添加换行符，因此该元素可以位于其他元素旁边。

### 2.8 css对齐

- 居中对齐
  - 元素水平居中
    `margin: 0 auto;`
  - 文本水平居中
    `text-align: center;`
  - 图像居中对齐
  
    ```css
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    ```

- 左和右对齐
  - position
  
    ```css
    position: absolute;
    right: 0px;
    width: 300px;
    padding: 20px;
    ```

  - float
  
    ```css
    float: right;
    width: 300px;
    padding: 10px;
    ```
  
- 垂直对齐
  - padding
  - line-height
  
    ```css
    line-height: 200px;
    height: 200px;
    ```
  
  - position 和 transform
  
    ```css
    .center {
        height: 200px;
        position: relative;
    }
    .center p {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ```

  - flex
  
    ```css
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
    }
    ```

### 2.9 css组合器

- 后代选择器

  ```css
  /* <div> 元素内的所有 <p> 元素 */
  div p {
      background-color: yellow;
  }
  ```
  
- 子元素选择器
  
  ```css
  /* <div> 元素内的所有直接子元素 <p> 元素 */
  div > p {
      background-color: yellow;
  }
  ```

- 相邻兄弟选择器

  ```css
  /* 选择紧接在 <div> 元素后的所有 <p> 元素 */
  div + p {
      background-color: yellow;
  }
  ```

- 通用兄弟选择器

  ```css
  /* 选择所有在 <div> 元素之后的 <p> 元素 */
  div ~ p {
      background-color: yellow;
  }
  ```

### 2.10 css伪类

伪类用于定义元素的特殊状态。

- :link：未访问的链接
- :visited
- :hover
- :active
- :focus
- :first-child
- :last-child
- :nth-child(n)
- :nth-last-child(n)
- :nth-of-type(n)
- :nth-last-of-type(n)

### 2.11 css伪元素

CSS 伪元素用于设置元素指定部分的样式。

- ::after：在元素之后插入内容
- ::before：在元素之前插入内容
- ::first-letter：设置文本的首字母(！！！只适用于块级元素)
- ::first-line：设置文本的第一行
- ::selection：设置被用户选取的文本的样式

### 2.12 css透明度

- opacity: 0.5;
- background: rgba(76, 175, 80, 0.3) /*不透明度为 30% 的绿色背景*/

### 2.13 下拉菜单

使用 display 属性和 :hover 实现下拉菜单

```css
<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>

<div class="dropdown">
  <span>Mouse over me</span>
  <div class="dropdown-content">
    <p>Hello World!</p>
  </div>
</div>
```

## 3. CSS高级

### 3.1 CSS圆角

- border-radius: 25px;
- border-top-left-radius: 25px;
- border-top-right-radius: 25px;
- border-bottom-right-radius: 25px;
- border-bottom-left-radius: 25px;

### 3.2 边框图像

- border-image-source
- border-image-slice
- border-image-outset
  
```css
/* 重复还是拉伸 */
border-image: url(border.png) 30 stretch;
/* 不同的裁切值 */
border-image: url(border.png) 50 round;
border-image: url(border.png) 20% round;
border-image: url(border.png) 30% round;
```

### 3.3 css背景

- background-clip：设置背景的绘制区域
- background-origin：设置背景图像的位置
- background-size
- background-attachment
  
```css
/* 多重背景 */
background: url(flower.gif) right bottom no-repeat, url(paper.gif) left top repeat;
/* 背景尺寸 */
background-size: 100px 80px; /* 或 cover | contain */
background-origin: content-box;
background-clip: content-box;
```

### 3.4 css渐变

- 线性渐变
- 径向渐变

```css
/* 线性渐变 */
background-image: linear-gradient(red, yellow);
background-image: linear-gradient(to right, red, yellow);
background-image: linear-gradient(to bottom right, red, yellow);
background-image: linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)); /* 使用透明度 */

/* 径向渐变：从中心开始 */
background-image: radial-gradient(red, yellow, green);
background-image: radial-gradient(red 5%, yellow 15%, green 60%); /* 色标之间间隔不同 */
background-image: repeating-radial-gradient(red, yellow 10%, green 15%); /* 重复渐变 */
```
  
### 3.5 css阴影

- text-shadow
- box-shadow

```css
/* 文本阴影 */
text-shadow: 2px 2px 5px red; /* 5px加模糊效果 */
color: white;
text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue; /* 多重阴影 */
/* 盒子阴影 */
box-shadow: 10px 10px 5px #888888; /* 5px加模糊效果 */
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); /* 卡片效果 */
```

### 文本效果

- 文字溢出
  text-overflow: clip | ellipsis | visible
- 文字换行
  
  word-wrap 属性使长文字能够被折断并换到下一行

  ```css
  /* 允许长单词换下一行 */
  word-wrap: break-word;
  ```

  word-break 属性指定换行规则

  ```css
  /* 保留长单词 */
  word-break: keep-all;
  /* 允许长单词换下一行 */
  word-break: break-all;
  ```

- 书写模式
  规定文本行是水平放置还是垂直放置
  writing-mode: horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr

### 3.6 css网络字体

- @font-face

```css
@font-face {
    font-family: myFirstFont;
    src: url(sansation_light.woff);
}
div {
    font-family: myFirstFont;
}
```

### 3.7 css 2D转换

- transform
- rotate
- scale
- scaleX
- scaleY
- skewX：使元素沿 X 轴倾斜给定角度
- skewY：元素沿 Y 轴倾斜 20 度
- matrix：把所有 2D 变换方法组合为一个
  参数如下：matrix(scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY())

```css
/* 从其当前位置向右移动 50 个像素，并向下移动 100 个像素 */
transform: translate(50px, 100px);
/* 顺时针旋转 20 度 */
transform: rotate(20deg);
/* 逆时针旋转 20 度 */
transform: rotate(-20deg);
/* 增大为其原始宽度的两倍和其原始高度的三倍 */
transform: scale(2, 3);
transform: matrix(1, -0.3, 0, 1, 0, 0);
```

### 3.8 css 3D转换

- transform
  - rotateX()
  - rotateY()
  - rotateZ()
  
### 3.9 css过渡

- transition
- transition-property
- transition-duration
- transition-timing-function
- transition-delay

```css
/* 1秒内改变背景颜色 */
transition: background-color 1s;
/* 2秒内改变背景颜色 */
transition: background-color 2s;
/* 1秒内改变背景颜色，延迟 0.5 秒 */
transition: background-color 1s 0.5s;
/* 1秒内改变背景颜色，延迟 0.5 秒，以慢速开始 */
transition: background-color 1s 0.5s ease-in;
/* 1秒内改变背景颜色，延迟 0.5 秒，以慢速开始，然后以快速结束 */
transition: background-color 1s 0.5s ease-in-out;
```

### 3.10 css动画

- @keyframes
- animation
- animation-name
- animation-duration

```css
@keyframes example {
    0% {background-color: red;}
    25% {background-color: yellow;}
    50% {background-color: blue;}
    100% {background-color: green;}
}

div {
    width: 100px;
    height: 100px;
    background-color: red;
    animation-name: example;
    animation-duration: 4s;
}
```

### 3.11 css工具提示

- 示例

```css
<style>
/* Tooltip 容器 */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* 如果需要在可悬停文本下面显示点线 */
}

/* Tooltip 文本 */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* 定位工具提示文本 - 请看下面的例子 */
  position: absolute;
  z-index: 1;
}

/* 将鼠标悬停在工具提示容器上时，显示工具提示文本 */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

<div class="tooltip">Hover over me
  <span class="tooltiptext">Tooltip text</span>
</div>
```

- 定位工具提示文本
  
```css
// 右侧工具提示
.tooltip .tooltiptext {
  top: -5px;
  left: 105%; 
}
// 左侧工具提示
.tooltip .tooltiptext {
  top: -5px;
  right: 105%; 
}
// 上方工具提示
.tooltip .tooltiptext {
  width: 120px;
  bottom: 100%;
  left: 50%;         // 先将左上角定位到中间
  margin-left: -60px; // 再将文本中心定位到中间
}
// 下方工具提示
.tooltip .tooltiptext {
  width: 120px;
  top: 100%;
  left: 50%;         // 先将左上角定位到中间
  margin-left: -60px; // 再将文本中心定位到中间
}
```

### 3.12 css 图像样式

- 缩略图图像
  
  ```css
  img {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
  }

  <img src="paris.jpg" alt="Paris">

  // 链接的缩略图
  img {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 150px;
  }

  img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }

  <a href="paris.jpg">
    <img src="paris.jpg" alt="Paris">
  </a>

  ```

- 响应式图像
  
  ```css
  img {
    max-width: 100%;
    height: auto;
  }
  ```

- 图像文本
  
  ```css
  .container {
    position: relative;
  }

  .topleft {
    position: absolute;
    top: 8px;
    left: 16px;
    font-size: 18px;
  }

  img { 
    width: 100%;
    height: auto;
    opacity: 0.3;
  }
  <div class="container">
  <img src="/i/logo/w3logo-2.png" alt="W3School" width="800" height="450">
  <div class="topleft">Top Left</div>
  ```

- 图像滤镜
  
  ```css
  img {
    filter: grayscale(100%);
  }
  ```

- 图像悬停叠加
  
  ```css
  .container {
  position: relative;
    width: 50%;
  }

  .image {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
  }
  // !!! 先用top left将左上角居中 ，再用transform将自己的中心居中
  // 使用上面文本那种 margin-left:-60px也行 但是要设定自己元素的宽和高
  .middle {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%)
  }

  .container:hover .image {
    opacity: 0.3;
  }

  .container:hover .middle {
    opacity: 1;
  }

  .text {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    padding: 16px 32px;
  }
  <div class="container">
    <img src="/i/css/avatar.png" alt="Avatar" class="image" style="width:100%">
    <div class="middle">
      <div class="text">Bill Gates</div>
    </div>
  </div>
  ```

- 响应式图库

  ```css
  .responsive {
    padding: 0 6px;
    float: left;
    width: 24.99999%;
  }

  @media only screen and (max-width: 700px){
    .responsive {
      width: 49.99999%;
      margin: 6px 0;
    }
  }

  @media only screen and (max-width: 500px){
    .responsive {
      width: 100%;
    }
  } 
  ```

- 图像模态
  
  ```vue
  <style>
  #myImg {
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
  }

  #myImg:hover {opacity: 0.7;}

  /* The Modal (background) */
  .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
  }

  /* Modal Content (image) */
  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 1500px;
  }

  /* Caption of Modal Image */
  #caption {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 700px;
    text-align: center;
    color: #ccc;
    padding: 10px 0;
    height: 150px;
  }

  /* Add Animation */
  .modal-content, #caption {  
    animation-name: zoom;
    animation-duration: 0.6s;
  }

  @keyframes zoom {
    from {transform: scale(0.1)} 
    to {transform: scale(1)}
  }`

  /* The Close Button */
  .close {
    position: absolute;
    top: 15px;
    right: 35px;
    color: #f1f1f1;
    font-size: 40px;
    font-weight: bold;
    transition: 0.3s;
  }

  .close:hover,
  .close:focus {
    color: #bbb;
    text-decoration: none;
    cursor: pointer;
  }

  /* 100% Image Width on Smaller Screens */
  @media only screen and (max-width: 700px){
    .modal-content {
      width: 100%;
    }
  }
  </style>

  <template>
  <img id="myImg" src="/i/photo/tiyugongyuan.jpg" alt="绿茵场" style="width: 50%;">
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <span class="close">×</span>
    <img class="modal-content" id="img01">
    <div id="caption"></div>
  </div>
  </template>
  <script>
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var img = document.getElementById('myImg');
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function(){
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() { 
      modal.style.display = "none";
    }
  </script>
  
  ```

### 3.13 object-fit属性

object-fit 属性可接受如下值：

- fill - 默认值。调整替换后的内容大小，以填充元素的内容框。如有必要，将拉伸或挤压物体以适应该对象。
- contain - 缩放替换后的内容以保持其纵横比，同时将其放入元素的内容框。
- cover - 调整替换内容的大小，以在填充元素的整个内容框时保持其长宽比。该对象将被裁剪以适应。
- none - 不对替换的内容调整大小。
- scale-down - 调整内容大小就像没有指定内容或包含内容一样（将导致较小的具体对象尺寸）

### 3.14 css多列

- column-count
- column-gap
- column-rule
- column-rule-color
- column-rule-style
- column-rule-width
- column-span
- column-width

```css  
/* 三列布局 */
div {
  column-count: 3;
  column-gap: 40px;
}

/* 列规则 */
div {
  column-count: 3;
  column-gap: 40px;
  column-rule: 1px solid lightblue;
}

/* 列宽 */
div {
  column-count: 3;
  column-width: 200px;
}
```

### 3.15 css用户界面

- resize
- cursor
- box-sizing
- outline
- outline-width
- outline-style
- outline-color
- outline-offset
- box-shadow
- text-overflow
  
```css
/* 禁止调整大小 */
textarea {
  resize: none;
}

/* 鼠标样式 */
div {
  cursor: pointer;
}

/* 盒子大小 */
div {
  box-sizing: border-box;
}

/* 轮廓 */
input[type=text] {
  outline: none;
}

/* 文本溢出 */
div {
  white-space: nowrap;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### 3.16 css变量

- :root
- var()

```css
:root {
  --main-color: #06c;
  --main-bg-color: lightblue;
}

div {
  background-color: var(--main-bg-color);
  color: var(--main-color);
}
```

### 3.17 css覆盖变量

```css
:root {
  --main-color: #06c;
}

div {
  --main-color: lightblue;
  background-color: var(--main-color);
}
```

### 3.18 css Box Sizing

width + padding + border = 元素的实际宽度
height + padding + border = 元素的实际高度

- content-box
- border-box

```css
/* 默认值 */
div {
  box-sizing: content-box;
}

/* 边框盒 */
div {
  box-sizing: border-box;
}
```

### 3.19 css媒体查询

- @media

```css
  /* navbar 容器 */
  .topnav {
    overflow: hidden;
    background-color: #333;
  }

  /* Navbar 链接 */
  .topnav a {
    float: left;
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  /* 在宽度为 600 像素或更小的屏幕上，使菜单链接彼此堆叠，而不是并排 */
  @media screen and (max-width: 600px) {
    .topnav a {
      float: none;
      width: 100%;
    }
  }
```

```css
  /* 弹性盒的容器 */
  .row {
    display: flex;
    flex-wrap: wrap;
  }

  /* 创建四个相等的列 */
  .column {
    flex: 25%;
    padding: 20px;
  }

  /* 在 992px 或更小的屏幕上，从四列变为两列 */
  @media screen and (max-width: 992px) {
    .column {
      flex: 50%;
    }
  }

  /* 在宽度小于或等于 600 像素的屏幕上，使各列堆叠，而不是并排 */
  @media screen and (max-width: 600px) {
    .row {
      flex-direction: column;
    }
  }
```

### 3.20 css FlexBox

- display : flex | inline-flex
- flex-direction : row | row-reverse | column | column-reverse
- justify-content : center | flex-start | flex-end | space-around | space-between 水平对齐
- align-items : center | flex-start | flex-end | stretch | baseline
- flex-wrap: wrap 值规定 flex 项目将在必要时进行换行
- flex-flow: flex-direction 和 flex-wrap 的简写
- align-content : center | flex-start | flex-end | space-around | space-between | stretch 垂直对齐
- order : 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
- flex-grow : 规定某个 flex 项目相对于其余 flex 项目将增长多少
- flex-shrink : 规定某个 flex 项目相对于其余 flex 项目将收缩多少
- flex-basis : 规定在分配多余空间之前，项目占据的主轴空间
- flex : flex-grow | flex-shrink | flex-basis 的简写
- align-self : auto | flex-start | flex-end | center | baseline | stretch 规定弹性容器内所选项目的对齐方式。

```css
/* 容器 */
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  align-content: space-between;
}

/* 项目 */
.item {
  order: 1;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100px;
  align-self: auto;
}
```

## 4. CSS 响应式设计

### 4.1 RWD简介

```css
.col-1 {width: 8.33%;}
.col-2 {width: 16.66%;}
.col-3 {width: 25%;}
.col-4 {width: 33.33%;}
.col-5 {width: 41.66%;}
.col-6 {width: 50%;}
.col-7 {width: 58.33%;}
.col-8 {width: 66.66%;}
.col-9 {width: 75%;}
.col-10 {width: 83.33%;}
.col-11 {width: 91.66%;}
.col-12 {width: 100%;}

[class*="col-"] {
  float: left;
  padding: 15px;
  border: 1px solid red;
}

<div class="row">
  <div class="col-3">...</div> <!-- 25% -->
  <div class="col-9">...</div> <!-- 75% -->
</div>

.row::after {
  content: "";
  clear: both;
  display: table;
}
```

```css
/* 超小型设备（电话，600px 及以下） */
@media only screen and (max-width: 600px) {...} 

/* 小型设备（纵向平板电脑和大型手机，600 像素及以上） */
@media only screen and (min-width: 600px) {...} 

/* 中型设备（横向平板电脑，768 像素及以上） */
@media only screen and (min-width: 768px) {...} 

/* 大型设备（笔记本电脑/台式机，992px 及以上） */
@media only screen and (min-width: 992px) {...} 

/* 超大型设备（大型笔记本电脑和台式机，1200px 及以上） */
@media only screen and (min-width: 1200px) {...}
```

## 5. CSS网格布局

### 5.1 网格布局模块

- display: grid | inline-grid
- grid-column-gap
- grid-row-gap
- grid-gap

```css
/* 容器 */
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

/* 项目 */
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
```

- 网格行
  
  ```css
  /* 网格项目放在列线 1，并在列线 3 结束它 */
  .item1 {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  ```

### 5.2 网格容器

- grid-template-columns ：定义网格布局中的列数，并可定义每列的宽度
- grid-template-rows ：定义网格布局中的行数，并可定义每行的高度
- justify-content ：水平对齐
- align-content ：垂直对齐

### 5.3 网格项目

- grid-column : 定义将项目放置在哪一列上
- grid-row : 定义将项目放置在哪一行上
- grid-area : 定义项目的大小，以及放置在哪一行和哪一列上

  ```css
  .item1 {
    /* 使 "item1" 从第 1 列开始并在第 5 列之前结束 */
    grid-column: 1 / 5;
  }
  /* 使 "item1" 从第 1 列开始，并跨越 3 列 */
  .item1 {
    grid-column: 1 / span 3;
  }
  /* 使 "item1" 从第 1 行开始，并跨越 2 行 */
  .item1 {
    grid-row: 1 / span 2;
  }
  /* 使 "item1" 在 row-line 1 开始，在 row-line 4 结束 */
  .item1 {
    grid-row: 1 / 4;
  }
  /* 使 "item8" 从 row-line 1 和 column-line 2 开始，在 row-line 5 和 column line 6 结束 */
  .item8 {
    grid-area: 1 / 2 / 5 / 6;
  }
  /* 使 "item8" 从 row-line 2 和 column-line 开始，并跨越 2 行和 3 列 */
  .item8 {
    grid-area: 2 / 1 / span 2 / span 3;
  }
  ```

- 命名网格项
  - item1 的名称是 "myArea"，并跨越五列网格布局中的所有五列：
  
  ```css
  .item1 {
    grid-area: myArea;
  }
  .grid-container {
    grid-template-areas: 'myArea myArea myArea myArea myArea';
  }
  ```

  - 让 "myArea" 跨越五列网格布局中的两列（句号代表没有名称的项目）
  
  ```css
  .item1 {
    grid-area: myArea;
  }
  .grid-container {
    grid-template-areas: 'myArea myArea . . .';
  }
  ```
