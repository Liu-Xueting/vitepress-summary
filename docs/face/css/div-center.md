# 元素水平垂直居中的方法

## 背景

居中是一个非常基础但又是非常重要的应用场景，实现居中的方法存在很多，可以将这些方法分成两个大类：

- 居中元素（子元素）的宽高已知
- 居中元素宽高未知

## 方法

- 实现元素水平垂直居中的方式：
- 利用定位+margin:auto
- 利用定位+margin:负值
- 利用定位+transform
- table布局
- flex布局
- grid布局

### 利用定位+margin:auto

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

### 利用定位+transform

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

### flex弹性布局

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

### grid布局

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

### table布局

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

- 利用定位+margin:auto
- 利用定位+transform
- flex布局
- grid布局

## 总结

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
