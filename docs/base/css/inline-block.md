# display: inline-block

在CSS布局中，如果我们想要将一些元素在同一行显示，其中的一种方法就是把要同行显示的元素设置display属性为inline-block。但是你会发现这些同行显示的inline-block元素之间经常会出现一定的空隙，这就是“换行符/空格间隙问题”。

## 产生原因

元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据white-space的处理方式（默认是normal，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素font-size:16px时，间距为8px。

## 解决方法

### 为父元素中设置font-size: 0，在子元素上重置正确的font-size

```html

<div class="parent" style="font-size: 0px">
  <div class="child" style="font-size: 16px">child1</div>
  <div class="child" style="font-size: 16px">child2</div>
</div>
```

### 使用负边距

```html
<div class="parent">
  <div class="child" style="margin-right: -4px">child1</div>
  <div class="child">child2</div>
</div>
```

### 设置父元素，display:table和word-spacing

```html
<div class="parent" style="display: table; word-spacing: -1em">
  <div class="child">child1</div>
  <div class="child">child2</div>
</div>
```

### 使用flex布局

```html
<div class="parent" style="display: flex">
  <div class="child">child1</div>
  <div class="child">child2</div>
</div>
```
