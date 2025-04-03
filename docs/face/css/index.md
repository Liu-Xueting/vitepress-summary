# CSS

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
