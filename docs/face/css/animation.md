# 动画

[[TOC]]

常见的动画效果有很多，如平移、旋转、缩放等等，复杂动画则是多个简单动画的组合

css实现动画的方式，有如下几种：

- transition 实现渐变动画
- transform 转变动画
- animation 实现自定义动画

## 实现方式

### transition

transition的属性如下：

- property:填写需要变化的css属性（如background-color、width、height等）
- duration:完成过渡效果需要的时间单位(s或者ms)
- timing-function:完成效果的速度曲线
- delay: 动画效果的延迟触发时间

其中timing-function的值有如下：

| 值 | 描述 |
| --- | --- |
| ease | 默认值，先加速后减速 |
| linear | 匀速 |
| ease-in | 加速 |
| ease-out | 减速 |
| ease-in-out | 先加速后减速（较ease速度变化效果明显） |
|cubic-bezier(n,n,n,n)| 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值|

注意：并不是所有的属性都能使用过渡的，如 `display:none` <-> `display:block` 就不能使用过渡

### transform 2D

包含四个常用的功能：

- translate：位移
- scale：缩放
- rotate：旋转
- skew：倾斜

transform 2D/3D 的属性值有如下：

- transform-origin：设置变形的原点
- tranform : translate 平移效果
- transform ：scale 缩放效果
- transform : rotate 旋转效果

注意： **大多数情况下，如果既有旋转也有移动，要先写移动再写旋转**

**transform-origin**：

基点就是位移或者旋转等变形围绕的中心，默认都是中心点，**切记：基点设置给要过渡的元素**

基点的值：

基点的值可以是具体数值例如 `transform-origin：20px 30px;` 第一个为x方向，第二个为y方向，

也可以是方位名词 `transform-origin：top left;` 此处先写x或先写y方向都可以，此处 `top left` 表示基点为左上角，`bottom right` 表示右下角...

**transform：translate 平移**:

首先要知道的是 **x轴是水平方向，y轴是竖直方向，z轴是深度方向(垂直于屏幕方向)**

平移可分为以下几种：

- transform：translateX   沿水平方向平移
- transform: translateY  沿竖直方向平移
- transform: translateZ  沿Z方向移动的距离，不加透视的话看不出来效果，这个放在后面3D板块讲解
- transform：translate(x, y, z)  沿和向量方向平移，第一个为x方向移动距离，第二个为y方向移动的距离，第三个为z轴移动的距离，中间要求逗号隔开

```html

<style>
    div{
        width: 200px;
        height: 200px;
        background-color: rgb(229, 171, 171);
        transition: all 2s linear;
    }
    div:hover{
        transform:translate(200px,200px)
    }
</style>
```

**transform：rotate 旋转**:

旋转的角度单位为 deg，要旋转360度即为 360deg

旋转可分为以下几种：

- transform：rotateX   以x为轴旋转，不加3D透视看不出立体3D效果，后面讲到3D再讲解
- transform: translateY  以y为轴旋转，不加3D透视看不出立体3D效果，后面讲到3D再讲解
- transform: translateZ  沿Z为轴旋转，为2D平面旋转，可以设置基点

此处先讲第三个不需要加3D透视的沿z轴旋转

```html
<style>
    div{
        width: 200px;
        height: 200px;
        background-color: rgb(229, 171, 171);
        margin: 100px auto;
        transition: all 2s linear;
    }
    div:hover{
        transform: rotateZ(90deg);
    }
</style>
```

### transform：scale 放缩

此处放缩的优点在于其是不影响其他页面布局的位置的，并且可以设置基点，默认基点为中心，放缩默认为围绕中心向外扩大或向内缩小，参数直接填写 要放缩的倍数即可，例如要放缩2倍： transform：scale(2)

```html
<style>
    div{
        width: 200px;
        height: 200px;
        background-color: rgb(229, 171, 171);
        transition: all 2s linear;
        margin: 100px auto;
        transform-origin: top left;
    }
    div:hover{
        transform:scale(2)
    }
</style>

```

### transform 3D动画效果

上述案例中的沿z位移，绕x/y旋转等等，其实都是3D的动画效果，我们需要加上透视属性才能有用：`perspective: 1000px;` 数值是视距可以自己设置，这个值大小可以根据自己的视觉感受调整满意即可。

注意：**透视要加给需要3D效果的元素的父元素**

**加透视的绕x轴旋转**:

```html
<style>
    body{
        perspective: 500px;  //透视
    }
    div{
        width: 200px;
        height: 200px;
        background-color: rgb(229, 171, 171);
        transition: all 2s linear;
        margin: 100px auto;
    }
    div:hover{
        transform:rotateX(360deg)
    }
</style>
```

### 是否开启3D效果呈现

这个属性为 transform-style，默认值为 `flat` ，即不开启子盒子3D效果保持呈现，如果值改为 `preserve-3d`，则开启子盒子3D效果保持呈现，这个属性和透视一样也是 写给父级，但是影响的是子盒子3D效果是否保持呈现

- transform-style：flat  默认值，代表不开启保持子盒子3D效果
- transform-style：preserve-3d  代表开启保持子盒子3D效果

例如我们想做出这个效果，理论上只需要让蓝色的子盒子绕x旋转一定角度，再让外部粉色大盒子绕y旋转一定角度即可呈现

![box-example](/box-3d.png)

**第一步**：

让蓝色子盒子绕x旋转一定角度，并且记得父盒子添加透视

```css
.out{
    width: 200px;
    height: 200px;
    background-color: rgb(229, 171, 171);
    margin: 100px auto;
    perspective: 500px;
}
.inner{
    width: 200px;
    height: 200px;
    background-color: rgb(71, 142, 219);
    transform: rotateX(60deg);
}
```

**第二步**：

让外部粉色父盒子绕y旋转一定角度即可，由于外部大盒子也需要透视效果，所以给其父元素body也要加上透视

```html
<style>
    body{
        perspective: 500px;
    }
    .out{
        width: 200px;
        height: 200px;
        background-color: rgb(229, 171, 171);
        margin: 100px auto;
        transition: all 2s;
        perspective: 500px;
    }
    .inner{
        width: 200px;
        height: 200px;
        background-color: rgb(71, 142, 219);
        transform: rotateX(60deg);
    }
    .out:hover{
        transform: rotateY(50deg);
    }
</style>
```

**第三步**：

开启内部蓝色盒子的3D效果保持 transform-style：preserve-3d，注意要写给父级。另外我们的透视可以写给父亲的父亲，所以此处当父子两个盒子都需要透视时，只需要给父亲的父亲body加上透视即可，父亲不需要再加透视。

```html
<style>
    body{
        perspective: 500px;
    }
    .out{
        width: 200px;
        height: 200px;
        background-color: rgb(229, 171, 171);
        margin: 100px auto;
        transition: all 2s;
        transform-style: preserve-3d;  //开启子元素3D保持
    }
    .inner{
        width: 200px;
        height: 200px;
        background-color: rgb(71, 142, 219);
        transform: rotateX(60deg);
    }
    .out:hover{
        transform: rotateY(50deg);
    }
</style>
```

### tranform总结

- transform-origin：设置变形的原点
- tranform : translate 平移效果
- transform ：scale 缩放效果
- transform : rotate 旋转效果
- transform-style：flat  默认值，代表不开启保持子盒子3D效果
- transform-style：preserve-3d  代表开启保持子盒子3D效果
- perspective：透视

### animation

通过transition过度知道，利用 transition 属性可以实现简单的过渡动画，但过渡动画仅能指定开始和结束两个状态，整个过程都是由特定的函数来控制的，不是很灵活

所以使用animation属性来实现更复杂的动画效果

**@keyframes**：

@keyframes 规则用来创建动画。它可以让你在动画的开始和结束状态之间创建关键帧。每个关键帧定义了动画在特定时间点的样式

```css
@keyframes animationName {
    from {
        properties: value;
    }
    percentage {
        properties: value;
    }
    to {
        properties: value;
    }
}
// 或者
@keyframes animationName {
    0% {
        properties: value;
    }
    percentage {
        properties: value;
    }
    100% {
        properties: value;
    }
}
```

语法说明如下：

- animationName：表示动画的名称；
- from：定义动画的开头，相当于 0%；
- percentage：定义动画的各个阶段，为百分比值，可以添加多个；
- to：定义动画的结尾，相当于 100%；
- properties：不同的样式属性名称，例如 color、left、width 等等。

动画创建好后，还需要将动画应用到指定的 HTML 元素。要将动画应用到指定的 HTML 元素需要借助 CSS 属性，CSS 中提供了如下所示的动画属性：

- animation-name：设置需要绑定到元素的动画名称；
- animation-duration：设置完成动画所需要花费的时间，单位为秒或毫秒，默认为 0；
- animation-timing-function：设置动画的速度曲线，默认为 ease；
- animation-fill-mode：设置当动画不播放时（动画播放完或延迟播放时）的状态；
- animation-delay：设置动画开始之前的延迟时间，默认为 0；
- animation-iteration-count：设置动画被播放的次数，默认为 1；
- animation-direction：设置是否在下一周期逆向播放动画，默认为 normal；
- animation-play-state：设置动画是正在运行还是暂停，默认是 running；
- animation：所有动画属性的简写属性。

**animation-name**：

animation-name 属性用于指定要应用于元素的动画名称。它的值是一个字符串，表示在 @keyframes 中定义的动画名称

```css
/* 关键字值 */
animation-name: none;
animation-name: animationName;
```

> 注意：要想让动画成功播放，您还需要定义 `animation-duratio`n 属性，否则会因为 `animation-duration` 属性的默认值为 0，导致动画并不会播放。

**animation-duration**：
animation-duration 属性用于设置动画完成所需要的时间，单位为秒或毫秒，默认为 0

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        @keyframes ball {
            0% { top: 0px; left: 0px;}
            25% { top: 0px; left: 350px;}
            50% { top: 200px; left: 350px;}
            75% { top: 200px; left: 0px;}
            100% { top: 0px; left: 0px;} 
        }
        div {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 3px solid black;
            position: relative;
            animation-name: ball;
            animation-duration: 2s;
        }
    </style>
</head>
<body>
    <div></div>
</body>
</html>
```

> 提示：动画若想成功播放，必须要定义 animation-name 和 animation-duration 属性。

**animation-timing-function**:

| 值 | 描述 |
| --- | --- |
| ease | 默认值，先加速后减速 |
| linear | 匀速 |
| ease-in | 加速 |
| ease-out | 减速 |
| ease-in-out | 先加速后减速（较ease速度变化效果明显） |
|cubic-bezier(n,n,n,n)| 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值|

**animation-fill-mode**:

animation-fill-mode 属性用来设置当动画不播放时（开始播放之前或播放结束之后）动画的状态（样式），属性的可选值如下：

| 值 | 描述 |
| --- | --- |
| forwards | 动画结束后，保持最后一帧的样式 |
| backwards | 动画开始前，保持第一帧的样式 |
| both | 动画结束后，保持最后一帧的样式，动画开始前，保持第一帧的样式 |
| none | 默认值，动画结束后，保持最后一帧的样式 |

**animation-delay**:

animation-delay 属性用于设置动画开始之前的延迟时间，单位为秒或毫秒，默认为 0

```css
/* 关键字值 */
animation-delay: none;
animation-delay: 2s;
animation-delay: 200ms;
```

> 参数值为正时，表示延迟指定时间开始播放；参数为负时，表示跳过指定时间，并立即播放动画

**animation-iteration-count**:

animation-iteration-count 属性用于设置动画被播放的次数，默认为 1
可选值如下：

| 值 | 描述 |
| --- | --- |
| n | 使用具体数值定义动画播放的次数，默认值为 1 |
| infinite | 无限次播放 |

**animation-direction**:

animation-direction 属性用于设置动画是否在下一周期逆向播放动画，默认为 normal
可选值如下：

| 值 | 描述 |
| --- | --- |
| normal | 默认值，动画在每个周期都正向播放 |
| reverse | 动画在每个周期都反向播放 |
| alternate | 播放动画时，奇数次（1、3、5 等）正常播放，偶数次（2、4、6 等）反向播放 |
| alternate-reverse | 播放动画时，奇数次（1、3、5 等）反向播放，偶数次（2、4、6 等）正常播放 |

**animation-play-state**:
animation-play-state 属性用于设置动画是正在运行还是暂停，默认是 running
可选值如下：

| 值 | 描述 |
| --- | --- |
| running | 默认值，动画正在运行 |
| paused | 动画暂停 |

**animation**:

animation 属性是所有动画属性的简写属性，语法如下：

```css
animation: [animation-name] [animation-duration] [animation-timing-function] [animation-delay] [animation-iteration-count] [animation-direction] [animation-fill-mode] [animation-play-state];
```

其中，方括号内的属性值可以省略，省略时使用默认值即可

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        @keyframes box {
            0% {transform: rotate(0);}
            50% {transform: rotate(0.5turn);}
            100% {transform: rotate(1turn);}
        }
        div {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            float: left;
            border: 3px solid black;
            text-align: center;
            line-height: 100px;
            position: relative;
            animation: box 2s linear 0s infinite alternate;
        }
    </style>
</head>
<body>
    <div>animation</div>
</body>
</html>
```
