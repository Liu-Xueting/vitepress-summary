# 7. CSS3新特性

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

## 新样式

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

## transition 过渡

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

## animation 动画

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

## transform 变形

transform属性允许你**旋转，缩放，倾斜或平移**给定元素

transform-origin：转换元素的位置（围绕那个点进行转换），默认值为(x,y,z):(50%,50%,0)

使用方式：

transform: translate(120px, 50%)：位移
transform: scale(2, 0.5)：缩放
transform: rotate(0.5turn)：旋转
transform: skew(30deg, 20deg)：倾斜

## 渐变

颜色渐变是指在两个颜色之间平稳的过渡，css3渐变包括

linear-gradient：线性渐变
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);

radial-gradient：径向渐变
linear-gradient(0deg, red, green);

## 新的布局方式

flex布局：flexbox布局
grid布局：grid布局
calc()函数：计算函数
calc()函数允许你在CSS中进行简单的数学计算，允许你在CSS中使用数学表达式来计算长度值
