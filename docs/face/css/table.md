# Table布局

Table布局是一种常见的网页布局方式，它通过将元素设置为表格的形式来进行页面布局。
在CSS中，可以通过 `display: table` 和相关的属性值来实现类似HTML `<table>` 元素的布局效果，从而创建具有表头、表尾、行和单元格等概念的布局结构。

## 基本实现

在实现Table布局时，通常会设置一个父级容器为 `display: table` ，然后将子级容器设置为 `display: table-cell` ，

这样子级容器就会像表格单元格一样进行布局。例如，以下代码展示了如何创建一个简单的两列布局，其中左右两个子容器平分父容器的宽度

```css
.box {
    display: table;
    width: 600px;
    height: 100px;
}
.left, .right {
    display: table-cell;
}
.left {
    background: yellowgreen;
}
.right {
    background: skyblue;
}  
```

## 属性

### table-layout

table-layout 属性定义了用于布局表格的单元格、行和列的算法。

```css
/* 关键字值 */
table-layout: auto;
table-layout: fixed;
```

**取值**：

- auto：默认值。浏览器根据内容的大小来计算列宽。
- fixed：浏览器根据表格的宽度和列数来计算列宽。即使内容溢出，也不会改变列宽。

### vertical-align

vertical-align 属性定义了单元格内容的垂直对齐方式。

```css
/* 关键字值 */
vertical-align: baseline;
vertical-align: middle;
vertical-align: bottom;

```

### 等高对齐

下面的案例是不对右侧的box设置display:table-cell，只对左侧，所以就会出现左侧跟随右侧高度变化而变化，
如果要实现不管两个box哪个高度产生变化另一个就跟随，只需要把右侧的box也设置成display:table－cell就可以实现了

```html
<body>
   <div class="content">
      <div class="img-box">
         [图片上传失败...(image-5e66ac-1553415098492)]
      </div>
     <div class="text-box">
         <span>
    王尼玛和陈尼玛都是年轻有为的骚年，有一天他们相遇了然后发现都对对方一见钟情后，所以就愉快的生活在了一起。。。。。王尼玛和陈尼玛都是年轻有为的骚年，有一天他们相遇了，然后发现都对对方一见钟情后，所以就愉快的生活在了一起。。。。。王尼玛和陈尼玛都是年轻有为的骚年，有一天他们相遇了，然后发现都对对方一见钟情后，所以就愉快的生活在了一起。。。。。王尼玛和陈尼玛都是年轻有为的骚年，有一天他们相遇了，然后发现都对对方一见钟情后，所以就愉快的生在了一起。。。。。王尼玛和陈尼玛都是年轻有为的骚年，有一天他们相遇了，然后发现都对对方一见钟情后，所以就愉快的生活在了一起。。。。。王尼玛和陈尼玛都是年轻有为的骚年，>有一天他们相遇了，然后发现都对对方一见钟情后，所以就愉快的生活在了一起。。。。。
         </span>
      </div>
    </div> 
</body>

 <style type="text/css">
     *{
         box-sizing:border-box;
      }
       .content{
          display: table;
          border:1px solid #06c;
          padding:15px 15px;
          max-width: 1000px;
          margin:10px auto;
          min-width:320px;
          width:100%;
       }
       .img-box{
         height:150px;
         width:100px;
          border:1px solid red;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          background-color: #4679bd;
       }
       .text-box{
          margin-left: 20px;
          border:1px solid #ddd;
          padding:10px;
       }
    </style>
```
