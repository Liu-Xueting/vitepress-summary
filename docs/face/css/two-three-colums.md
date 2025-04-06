# 两栏布局 & 三栏布局

两栏布局实现效果就是将页面分割成左右宽度不等的两列，宽度较小的列设置为固定宽度，剩余宽度由另一列撑满，

比如 Ant Design 文档，蓝色区域为主要内容布局容器，侧边栏为次要内容布局容器

三栏布局按照左中右的顺序进行排列，通常中间列最宽，左右两列次之

大家最常见的就是github

## 两栏布局

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

## 三栏布局

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
