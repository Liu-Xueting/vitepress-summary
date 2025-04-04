# CSS

[[toc]]

## 1. em、px、rem、vh、vw区别

在CSS的计量单位体系中，可以分为相对长度单位和绝对长度单位：

相对长度单位包括：em、ex、ch、rem、vw、vh、vmin、vmax、%
绝对长度单位包括：cm、mm、in、px、pt、pt、pc

从CSS3开始，新增了rem、vh、vw、vm等一些新的计量单位

- **px**：
  px，表示像素，所谓像素就是呈现在我们显示器上的一个个小点，每个像素点都是大小等同的，所以像素为计量单位被分在了绝对长度单位中
  有些人会把px认为是相对长度，原因在于在移动端中存在设备像素比，px实际显示的大小是不确定的
  这里之所以认为px为绝对单位，在于px的大小和元素的其他属性无关
- **em**：
  em是相对长度单位。相对于当前对象内文本的字体尺寸`font-size`。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸（1em = 16px）
  特点：
  - em 的值并不是固定的
  - em 会继承父级元素的字体大小
  - em 是相对长度单位。相对于当前对象内文本的字体尺寸`font-size`。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸
  - 任意浏览器的默认字体高都是 16px
- **rem**：
  rem，相对单位，相对的只是HTML根元素font-size的值
  特点：
  - rem单位可谓集相对大小和绝对大小的优点于一身
  - 和em不同的是rem总是相对于根元素，而不像em一样使用级联的方式来计算尺寸
- **vh、vw**：
  vw ，就是根据窗口的宽度，分成100等份，100vw就表示满宽，50vw就表示一半宽。（vw 始终是针对窗口的宽），同理，vh则为窗口的高度

    这里的窗口分成几种情况：

  - 在桌面端，指的是浏览器的可视区域

  - 移动端指的就是布局视口
    像vw、vh，比较容易混淆的一个单位是%，不过百分比宽泛的讲是相对于父元素：

    - 对于普通定位元素就是我们理解的父元素
    - 对于position: absolute;的元素是相对于已定位的父元素
    - 对于position: fixed;的元素是相对于 ViewPort（可视窗口）

**总结**：

px：绝对单位，页面按精确像素展示

em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算，整个页面内1em不是一个固定的值

rem：相对单位，可理解为root em, 相对根节点html的字体大小来计算

vh、vw：主要用于页面视口大小布局，在页面布局上更加方便简单

## 2. CSS中隐藏元素的几种方式

- display: none;
  - 元素本身占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘
  - 元素不可见，不占据空间，无法响应点击事件
- visibility: hidden; // 元素占据空间
  - 从页面上仅仅是隐藏该元素，DOM结果均会存在，只是当时在一个不可见的状态，不会触发重排，但是会触发重绘
  - 元素不可见，占据页面空间，无法响应点击事件
- 设置height、width模型属性为0
  - 将元素的margin，border，padding，height和width等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其overflow:hidden来隐藏其子元素
  - 元素不可见，不占据页面空间，无法响应点击事件
- opacity: 0; // 元素占据空间
  - 将元素的透明度设置为0后，在我们用户眼中，元素也是隐藏的，不会引发重排，一般情况下也会引发重绘
  - 如果利用 animation 动画，对 opacity 做变化（animation会默认触发GPU加速），则只会触发 GPU 层面的 composite，不会触发重绘
  - 改变元素透明度，元素不可见，占据页面空间，可以响应点击事件
- position: absolute; left: -9999px;
  - 将元素移出可视区域
  - 元素不可见，不影响页面布局
  
## 3. CSS关系选择器

- 后代选择器：`div p` 选择所有在div元素内的p元素
- 子选择器：`div > p` 选择所有在div元素内的直接子元素p元素
- 相邻兄弟选择器：`div + p` 选择紧接在div元素后面的p元素
- 一般兄弟选择器：`div ~ p` 选择在div元素后面的所有p元素
- 伪类选择器：`div:hover` 选择鼠标悬停在div元素上的状态
- 伪元素选择器：`div::before` 选择在div元素前面插入的内容

## 4. CSS伪类

- :hover：鼠标悬停在元素上
- :focus：元素获得焦点
- :active：元素被激活
- :first-child：元素是其父元素的第一个子元素
- :last-child：元素是其父元素的最后一个子元素
- :nth-child(n)：元素是其父元素的第n个子元素
- :nth-of-type(n)：元素是其父元素的第n个同类型子元素
- :not(selector)：选择不符合选择器的元素
- :checked：选择被选中的元素
- :disabled：选择被禁用的元素
- :enabled：选择未被禁用的元素
- :valid：选择有效的元素
- :invalid：选择无效的元素
- :required：选择必填的元素
- :optional：选择可选的元素
- :empty：选择没有子元素的元素

## 5. CSS伪元素

- ::before：在元素前插入内容
- ::after：在元素后插入内容
- ::first-letter：选择元素的第一个字母
- ::first-line：选择元素的第一行
- ::selection：选择被选中的文本
- ::placeholder：选择输入框的占位符文本
- ::marker：选择列表项的标记
- ::backdrop：选择模态框的背景
- ::cue：选择视频或音频的字幕
- ::spelling-error：选择拼写错误的文本
- ::grammar-error：选择语法错误的文本
- ::slotted：选择插槽中的元素

## 6. 元素水平垂直居中的方法

### 背景

居中是一个非常基础但又是非常重要的应用场景，实现居中的方法存在很多，可以将这些方法分成两个大类：

- 居中元素（子元素）的宽高已知
- 居中元素宽高未知

### 方法

实现元素水平垂直居中的方式：

利用定位+margin:auto

利用定位+margin:负值

利用定位+transform

table布局

flex布局

grid布局

- 利用定位+margin:auto

```html
<style>
    .father{
        width:500px;
        height:300px;
        border:1px solid #0a3b98;
        position: relative;
    }
    .son{
        width:100px;
        height:40px;
        background: #f0a238;
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

父级设置为相对定位，子级绝对定位 ，并且四个定位属性的值都设置了0，那么这时候如果子级没有设置宽高，则会被拉开到和父级一样宽高
这里子元素设置了宽高，所以宽高会按照我们的设置来显示，但是实际上子级的虚拟占位已经撑满了整个父级，这时候再给它一个margin：auto它就可以上下左右都居中了

- 利用定位+margin:负值

绝大多数情况下，设置父元素为相对定位， 子元素移动自身50%实现水平垂直居中

```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left:-50px;
        margin-top:-50px;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

- 利用定位+transform

```html
<style>
    .father {
        position: relative;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

translate(-50%, -50%)将会将元素位移自己宽度和高度的-50%
这种方法其实和最上面被否定掉的margin负值用法一样，可以说是margin负值的替代方案，并不需要知道自身元素的宽高

- flex弹性布局

```html
<style>
    .father {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

css3中了flex布局，可以非常简单实现垂直水平居中

这里可以简单看看flex布局的关键属性作用：

display: flex时，表示该容器内部的元素将按照flex进行布局

align-items: center表示这些元素将相对于本容器**垂直居中**

justify-content: center也是同样的道理**水平居中**

- grid布局

```html

<style>
    .father {
            display: grid;
            align-items:center;
            justify-content: center;
            width: 200px;
            height: 200px;
            background: skyblue;

        }
        .son {
            width: 10px;
            height: 10px;
            border: 1px solid red
        }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

grid布局是css3新增的布局方式，和flex布局类似，grid布局也可以非常简单的实现水平垂直居中

- table布局

```html
<style>
    .father {
        display: table;
        width: 200px;
        height: 200px;
        background: skyblue;
    }
    .son {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        width: 100px;
        height: 100px;
        background: red;
    }
</style>
<div class="father">
    <div class="son"></div>
</div>
```

设置父元素为display:table-cell，子元素设置 display: inline-block。利用vertical和text-align可以让所有的行内块级元素水平垂直居中

上述方法中，不知道元素宽高大小仍能实现水平垂直居中的方法有：

利用定位+margin:auto
利用定位+transform
flex布局
grid布局

### 总结

根据元素标签的性质，可以分为：

内联元素居中布局
块级元素居中布局

- 内联元素居中布局
  
  **水平居中**：

  行内元素可设置：text-align: center
  flex布局设置父元素：display: flex; justify-content: center

  **垂直居中**：

  单行文本父元素确认高度：height === line-height
  多行文本父元素确认高度：display: table-cell; vertical-align: middle

- 块级元素居中布局

  **水平居中**：

  定宽: margin: 0 auto
  绝对定位+left:50%+margin:负自身一半
  
  **垂直居中**:

  position: absolute设置left、top、margin-left、margin-top(定高)
  display: table-cell
  transform: translate(x, y)
  flex(不定高，不定宽)
  grid(不定高，不定宽)，兼容性相对比较差

## 7. CSS3新特性

选择器
新样式
transition 过渡
animation 动画
渐变
transform 变形
新的布局方式

- 选择器
  [elment1~elment2]：选择element1后面的所有element2
  [attr^=value]：选择属性值以value开头的元素
  [attr$=value]：选择属性值以value结尾的元素
  [attr*=value]：选择属性值包含value的元素
  :nth-child(n)
  :nth-of-type(n)
  :not(selector)
  :target
  :checked
  :disabled
  :enabled
  :valid
  :invalid
  :required
  :optional
  ::placeholder
  ::selection

### 新样式

- **边框**:
    border-radius：创建圆角边框
    box-shadow：为元素添加阴影
    border-image：使用图片来绘制边框
  box-shadow设置元素阴影，设置属性如下：
  X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色

  ```css
  /* x 偏移量 | y 偏移量 | 阴影颜色 */
  box-shadow: 60px -16px teal;

  /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影颜色 */
  box-shadow: 10px 5px 5px black;

  /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  /* 插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影颜色 */
  box-shadow: inset 5em 1em gold;

  /* 任意数量的阴影，以逗号分隔 */
  box-shadow:
    3px 3px red,
    -1em 0 0.4em olive;

  /* 全局关键字 */
  box-shadow: inherit;
  box-shadow: initial;
  box-shadow: unset;
  ```

- **背景**:
  - background-clip：用于确定背景画区
  
      border-box; 背景从border开始显示
      padding-box; 背景从padding开始显示
      content-box; 背景从content开始显示
      no-clip; 默认属性，等同于border-box

  - background-origin：
  
      当我们设置背景图片时，图片是会以左上角对齐，但是是以border的左上角对齐还是以padding的左上角或者content的左上角对齐

      border-box; 背景从border开始显示
      padding-box; 背景从padding开始显示
      content-box; 背景从content开始显示

  - background-size：background-size属性常用来调整背景图片的大小，主要用于设定图片本身。

      contain; 缩小图片以适合元素（维持像素长宽比）
      cover; 扩展元素以填补元素（维持像素长宽比）
      100px 100px; 缩小图片至指定的大小
      50% 100%; 缩小图片至指定的大小，百分比是相对包 含元素的尺寸

  - background-break：background-break属性用于设置背景图像的断裂方式

      auto; 默认值，背景图像在元素的边界处断裂
      all; 背景图像在所有边界处断裂
      bounding-box; 背景图像在元素的边界处断裂
      each-box; 背景图像在每个元素的边界处断裂

- **文本**:
  
  - word-wrap
  
    语法：word-wrap: normal|break-word

    normal：使用浏览器默认的换行
    break-all：允许在单词内换行

  - text-overflow
  
    text-overflow设置或检索当当前行超过指定容器的边界时如何显示，属性有两个值选择：

    clip：修剪文本
    ellipsis：显示省略符号来代表被修剪的文本

  - text-shadow
  
    text-shadow可向文本应用阴影。能够规定水平阴影、垂直阴影、模糊距离，以及阴影的颜色

  - text-decoration
  
    CSS3里面开始支持对文字的更深层次的渲染，具体有三个属性可供设置：

    text-fill-color: 设置文字内部填充颜色

    text-stroke-color: 设置文字边界填充颜色

    text-stroke-width: 设置文字边界宽度

- **颜色**：
  
  css3新增了新的颜色表示方式rgba与hsla

  rgba分为两部分，rgb为颜色值，a为透明度
  hala分为四部分，h为色相，s为饱和度，l为亮度，a为透明度

### transition 过渡

transition属性可以被指定为一个或多个CSS属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：

过度效果
持续时间

语法：

```CSS
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
```

上面为简写模式，也可以分开写各个属性

```css
transition-property: width; 
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
transition-property: none; // 不过渡
```

### animation 动画

animation属性可以被指定为一个或多个CSS属性的动画效果，多个属性之间用逗号进行分隔，必须规定两项内容：
动画效果
持续时间
语法：

```CSS
animation: 动画名称，持续时间，效果曲线(默认ease)，延迟时间(默认0)，次数(默认1)，方向(默认normal)，播放状态(默认running)，填充模式(默认none)
```

上面为简写模式，也可以分开写各个属性

```css
animation-name: none; // 动画名称
animation-duration: 1s; // 动画持续时间
animation-timing-function: linear; // 动画效果曲线
animation-delay: 2s; // 动画延迟时间
animation-iteration-count: 1; // 动画次数
animation-direction: normal; // 动画方向
animation-play-state: running; // 动画播放状态
animation-fill-mode: none; // 动画填充模式
```

### transform 变形

transform属性允许你**旋转，缩放，倾斜或平移**给定元素

transform-origin：转换元素的位置（围绕那个点进行转换），默认值为(x,y,z):(50%,50%,0)

使用方式：

transform: translate(120px, 50%)：位移
transform: scale(2, 0.5)：缩放
transform: rotate(0.5turn)：旋转
transform: skew(30deg, 20deg)：倾斜

### 渐变

颜色渐变是指在两个颜色之间平稳的过渡，css3渐变包括

linear-gradient：线性渐变
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);

radial-gradient：径向渐变
linear-gradient(0deg, red, green);

### 新的布局方式

flex布局：flexbox布局
grid布局：grid布局
calc()函数：计算函数
calc()函数允许你在CSS中进行简单的数学计算，允许你在CSS中使用数学表达式来计算长度值

## 8. BFC

BFC（Block Formatting Context），即块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则：

- 内部的盒子会在垂直方向上一个接一个的放置
- 对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关。
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- BFC的区域不会与float的元素区域重叠
- 计算BFC的高度时，浮动子元素也参与计算
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

BFC目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

**触发条件**：

触发BFC的条件包含不限于：

- 根元素，即HTML元素
- 浮动元素：float值为left、right
- overflow值不为 visible，为 auto、scroll、hidden
- display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position的值为absolute或fixed

**常用overflow:hidden来触发BFC 解决 margin重叠问题 计算float导致高度塌陷问题**

## 9. 两栏布局 & 三栏布局

两栏布局实现效果就是将页面分割成左右宽度不等的两列，宽度较小的列设置为固定宽度，剩余宽度由另一列撑满，

比如 Ant Design 文档，蓝色区域为主要内容布局容器，侧边栏为次要内容布局容器

三栏布局按照左中右的顺序进行排列，通常中间列最宽，左右两列次之

大家最常见的就是github

### 两栏布局

两栏布局非常常见，往往是以一个定宽栏和一个自适应的栏并排展示存在

实现思路也非常的简单：

使用 float 左浮左边栏
右边模块使用 margin-left 撑出内容块做内容展示
为父级元素添加BFC，防止下方元素飞到上方内容

```html
<style>
    .container {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;
    }
    .left {
        width: 200px;
        height: 100%;
        background: #f0a238;
        float: left;
    }
    .right {
        margin-left: 200px;
        height: 100%;
        background: #0a3b98;
    }
</style>
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

Flex布局

```html
<style>
    .container {
        display: flex;
        width: 100%;
        height: 100%;
        background: #f0f0f0;
    }
    .left {
        width: 200px;
        height: 100%;
        background: #f0a238;
    }
    .right {
        flex: 1;
        height: 100%;
        background: #0a3b98;
    }
</style>
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

### 三栏布局

实现三栏布局中间自适应的布局方式有：

- 两边使用 float，中间使用 margin
- 两边使用 absolute，中间使用 margin
- display: table 实现
- flex实现
- grid网格布局

**两边使用 float，中间使用 margin**:

需要将中间的内容放在html结构最后，否则右侧会臣在中间内容的下方

```html
<style>
    .container {
        width: 100%;
        height: 100%;
        background: #f0f0f0;
        overflow: hidden;   <!-- 生成BFC，计算高度时考虑浮动的元素 -->
    }
    .left {
        width: 200px;
        height: 100%;
        background: #f0a238;
        float: left;
    }
    .middle {
        margin-left: 200px;
        margin-right: 200px;
        height: 100%;
        background: #0a3b98;
    }
    .right {
        width: 200px;
        height: 100%;
        background: #f0a238;
        float: right;
    }
</style>
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="middle"></div>
</div>
```

**两边使用 absolute，中间使用 margin**:

```html
<style>
  .container {
    position: relative;
  }
  
  .left,
  .right,
  .main {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    background: green;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    background: green;
  }

  .main {
    margin: 0 110px;
    background: black;
    color: white;
  }
</style>
<div class="container">
  <div class="left">左边固定宽度</div>
  <div class="right">右边固定宽度</div>
  <div class="main">中间自适应</div>
</div>
```

实现流程：

- 左右两边使用绝对定位，固定在两侧。
- 中间占满一行，但通过 margin和左右两边留出10px的间隔

**display: table 实现**:

`<table>` 标签用于展示行列数据，不适合用于布局。但是可以使用 display: table 来实现布局的效果

```html
<style>
  .container {
    height: 200px;
    line-height: 200px;
    text-align: center;
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  .left,
  .right,
  .main {
    display: table-cell;
  }

  .left,
  .right {
    width: 100px;
    background: green;
  }

  .main {
    background: black;
    color: white;
    width: 100%;
  }
</style>

<div class="container">
  <div class="left">左边固定宽度</div>
  <div class="main">中间自适应</div>
  <div class="right">右边固定宽度</div>
</div>
```

实现原理：

- 层通过 `display: table` 设置为表格，设置 `table-layout: fixed` 表示列宽自身宽度决定，而不是自动计算。
- 内层的左中右通过 `display: table-cell` 设置为表格单元。
- 左右设置固定宽度，中间设置 width: 100% 填充剩下的宽度
  
**使用flex实现**:

```html
<style type="text/css">
    .wrap {
        display: flex;
        justify-content: space-between;
    }

    .left,
    .right,
    .middle {
        height: 100px;
    }

    .left {
        width: 200px;
        background: coral;
    }

    .right {
        width: 120px;
        background: lightblue;
    }

    .middle {
        background: #555;
        width: 100%;
        margin: 0 20px;
    }
</style>
<div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>
```

实现过程：

- 仅需将容器设置为display:flex;，
- 盒内元素两端对其，将中间元素设置为100%宽度，或者设为flex:1，即可填充空白
- 盒内元素的高度撑开容器的高度

**grid网格布局**:

```html
<style>
    .wrap {
        display: grid;
        width: 100%;
        grid-template-columns: 300px auto 300px;
    }

    .left,
    .right,
    .middle {
        height: 100px;
    }

    .left {
        background: coral;
    }

    .right {
        background: lightblue;
    }

    .middle {
        background: #555;
    }
</style>
<div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
</div>
```

## 10. 响应式设计

### 定义

响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

响应式网站常见特点：

- 同时适配PC + 平板 + 手机等
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航
- 网站的布局会根据视口来调整模块的大小和位置

### 实现方式

响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有meta声明viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```

属性对应如下：

- width=device-width: 是自适应手机屏幕的尺寸宽度
- maximum-scale:是缩放比例的最大值
- inital-scale:是缩放的初始化
- user-scalable:是用户的可以缩放的操作

实现响应式布局的方式有如下：

- 媒体查询
- 百分比
- vw/vh
- rem

**媒体查询**：

CSS3中的增加了更多的媒体查询，就像if条件表达式一样，我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表

使用@Media查询，可以针对不同的媒体类型定义不同的样式，如：

```css
@media screen and (max-width: 1920px) { ... }
```

```css
@media screen and (max-width: 768px) {
    .container {
        width: 100%;
    }
}
```

通过媒体查询，可以通过给不同分辨率的设备编写不同的样式来实现响应式的布局，比如我们为不同分辨率的屏幕，设置不同的背景图片

比如给小屏幕手机设置@2x图，为大屏幕手机设置@3x图，通过媒体查询就能很方便的实现

**百分比**:

比如当浏览器的宽度或者高度发生变化时，通过百分比单位，可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，从而实现响应式的效果

height、width属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素：

- 子元素的top/left和bottom/right如果设置百分比，则相对于直接非static定位(默认定位)的父元素的高度/宽度
- 子元素的padding如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的width，而与父元素的height无关。
- 子元素的margin如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的width
- border-radius不一样，如果设置border-radius为百分比，则是相对于自身的宽度

可以看到每个属性都使用百分比，会照成布局的复杂度，所以不建议使用百分比来实现响应式

**vw/vh**:

vw表示相对于视图窗口的宽度，vh表示相对于视图窗口高度。 任意层级元素，在使用vw单位的情况下，1vw都等于视图宽度的百分之一

与百分比布局很相似，在以前文章提过与%的区别，这里就不再展开述说

**rem**:

在以前也讲到，rem是相对于根元素html的font-size属性，默认情况下浏览器字体大小为16px，此时1rem = 16px

可以利用前面提到的媒体查询，针对不同设备分辨率改变font-size的值，如下：

```css
@media screen and (max-width: 414px) {
  html {
    font-size: 18px
  }
}

@media screen and (max-width: 375px) {
  html {
    font-size: 16px
  }
}

@media screen and (max-width: 320px) {
  html {
    font-size: 12px
  }
}
```

为了更准确监听设备可视窗口变化，我们可以在css之前插入 `script` 标签，内容如下：

```js
//动态为根元素设置字体大小
function init () {
    // 获取屏幕宽度
    var width = document.documentElement.clientWidth
    // 设置根元素字体大小。此时为宽的10等分
    document.documentElement.style.fontSize = width / 10 + 'px'
}

//首次加载应用，设置一次
init()
// 监听手机旋转的事件的时机，重新设置
window.addEventListener('orientationchange', init)
// 监听手机窗口变化，重新设置
window.addEventListener('resize', init)
```

无论设备可视窗口如何变化，始终设置rem为width的1/10，实现了百分比布局

除此之外，我们还可以利用主流UI框架，如：`element ui`、`antd` 提供的栅格布局实现响应式

**总结**：

响应式设计实现通常会从以下几方面思考：

- 弹性盒子（包括图片、表格、视频）和媒体查询等技术 （媒体查询 flex）
- 使用百分比布局创建流式布局的弹性UI，同时使用媒体查询限制元素的尺寸和内容变更范围 (%)
- 使用相对单位使得内容自适应调节 (vm/vh rem)
- `element ui`、`antd` 提供的栅格布局

## 11. 单行/多行文本省略

### 单行文本省略

理解也很简单，即文本在一行内显示，超出部分以省略号的形式展现

实现方式也很简单，涉及的css属性有：

- text-overflow：规定当文本溢出时，显示省略符号来代表被修剪的文本
- white-space：设置文字在一行显示，不能换行
- overflow：文字长度超出限定宽度，则隐藏超出的内容

`overflow` 设为 `hidden`，普通情况用在块级元素的外层隐藏内部溢出元素，或者配合下面两个属性实现文本溢出省略

`white-space:nowrap`，作用是设置文本不换行，是 `overflow:hidden` 和 `text-overflow：ellipsis` 生效的基础

text-overflow属性值有如下：

- clip：当对象内文本溢出部分裁切掉
- ellipsis：当对象内文本溢出时显示省略标记（...）
  
text-overflow只有在设置了overflow:hidden和white-space:nowrap才能够生效的

```css
p{
  overflow: hidden;
  line-height: 40px;
  width:400px;
  height:40px;
  border:1px solid red;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

### 多行文本溢出省略

多行文本溢出的时候，我们可以分为两种情况：

- 基于高度截断
- 基于行数截断

**基于高度截断**:

伪元素 + 定位

核心的css代码结构如下：

position: relative：为伪元素绝对定位
overflow: hidden：文本溢出限定的宽度就隐藏内容）
line-height: 20px：结合元素高度,高度固定的情况下,设定行高, 控制显示行数
height: 40px：设定当前元素高度
position: absolute：给省略号绝对定位
::after {} ：设置省略号样式

```html
<style>
    .demo {
        position: relative;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
    }
    .demo::after {
        content: "...";
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 20px 0 10px;
    }
</style>

<body>
    <div class='demo'>这是一段很长的文本</div>
</body>
```

实现原理很好理解，就是通过伪元素绝对定位到行尾并遮住文字，再通过 overflow: hidden 隐藏多余文字

**基于行数截断**:

纯css实现也非常简单，核心的css代码如下：

-webkit-line-clamp: 2：用来限制在一个块元素显示的文本的行数，为了实现该效果，它需要组合其他的WebKit属性）
display: -webkit-box：和1结合使用，将对象作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical：和1结合使用 ，设置或检索伸缩盒对象的子元素的排列方式
overflow: hidden：文本溢出限定的宽度就隐藏内容
text-overflow: ellipsis：多行文本的情况下，用省略号“…”隐藏溢出范围的文本

```html
<style>
    p {
        width: 400px;
        border-radius: 1px solid red;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
<p>
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
    这是一些文本这是一些文本这是一些文本这是一些文本这是一些文本
</p >
```

可以看到，上述使用了 `webkit` 的CSS属性扩展，所以兼容浏览器范围是PC端的 `webkit` 内核的浏览器，由于移动端大多数是使用 `webkit` ，所以移动端常用该形式

需要注意的是，如果文本为一段很长的英文或者数字，则需要添加 `word-wrap: break-word` 属性

## 12. CSS预编语言

预处理语言

扩充了 Css 语言，增加了诸如变量、混合（mixin）、函数等功能，让 Css 更易维护、方便

本质上，预处理是Css的超集

包含一套自定义的语法及一个解析器，根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 Css 文件

Css预编译语言在前端里面有三大优秀的预编处理器，分别是：

- sass
- less

### sass

Sass 是一种成熟的、功能强大的 CSS 扩展语言，提供了变量、嵌套、混合、继承等功能
文件后缀名为.sass与scss，可以严格按照 sass 的缩进方式省去大括号和分号

### less

Less 是一种 CSS 预处理器，提供了变量、嵌套、混合、函数等功能

其缺点是比起 SASS来，可编程功能不够，不过优点是简单和兼容 Css，反过来也影响了 SASS演变到了Scss 的时代

### 区别

虽然各种预处理器功能强大，但使用最多的，还是以下特性：

- 变量（variables）
- 作用域（scope）
- 代码混合（ mixins）
- 嵌套（nested rules）
- 代码模块化（Modules）

**基本使用**：

less和scss

```less
.box {
  display: block;
}
```

```sass
.box
  display: block
```

**嵌套**:

二者的嵌套语法都是一致的，甚至连引用父级选择器的标记 & 也相同
只不过sass没有大括号和分号

```less
.a {
  &.b {
    color: red;
  }
}
```

**变量**：

less和scss都支持变量，less使用@符号，scss使用$符号

```less
@red: #c00;

strong {
  color: @red;
}
```

```scss
$red: #c00;
strong {
  color: $red;
}
```

**作用域**：

Css 预编译器把变量赋予作用域，也就是存在生命周期。就像 js一样，它会先从局部作用域查找变量，依次向上级作用域查找

sass中不存在全局变量

```scss
$color: black;
.scoped {
  $bg: blue;
  $color: white;
  color: $color;
  background-color:$bg;
}
.unscoped {
  color:$color;
} 
```

编译后

```css
.scoped {
  color:white;/*是白色*/
  background-color:blue;
}
.unscoped {
  color: white /*（无全局变量概念）;*/
}
```

less的作用域跟javascript十分的相似，首先会查找局部定义的变量，如果没有找到，会像冒泡一样，一级一级往下查找，直到根为止

```less
@color: black;
.scoped {
  @bg: blue;
  @color: white;
  color: @color;
  background-color:@bg;
}
.unscoped {
  color:@color;
} 
```

编译后

```css
.scoped {
  color:white;/*白色（调用了局部变量）*/
  background-color:blue;
}
.unscoped {
  color:black;/*黑色（调用了全局变量）*/
}
```

**混入**:

less和scss都支持混入，less使用.mixin()，scss使用@mixin

```less
.mixin() {
  color: red;
}
.box {
  .mixin();
}
```

```scss
@mixin mixin {
  color: red;
}
.box {
  @include mixin;
}
```

**代码模块化**:

less和scss都支持模块化，less使用@import，scss使用@import

```less
@import "common.less";
```

```scss
@import "common.scss";
```
