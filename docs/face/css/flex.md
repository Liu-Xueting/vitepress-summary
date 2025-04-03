# flex布局

## flex模型定义

弹性盒子是一种用于按行或按列布局元素的一维布局方法。元素可以膨胀以填充额外的空间，收缩以适应更小的空间。

首先，我们需要选择将哪些元素将设置为弹性的盒子。我们需要给这些 flexible 元素的父元素 display 设置一个特定值

```css
section {
  display: flex;
}
```

display: flex: 将元素设置为弹性盒子，允许其子元素使用弹性布局。
display: inline-flex: 将元素设置为弹性盒子，允许其子元素使用弹性布局，但该元素本身是内联元素。

## flex模型说明

当元素表现为 flex 框时，它们沿着两个轴来布局：
![Flex Layout](./flex.png)

- 主轴（main axis）是沿着 flex 元素放置的方向延伸的轴。该轴的开始和结束被称为 main start 和 main end。
- 交叉轴（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 cross start 和 cross end。
- 设置了 display: flex 的父元素被称之为 flex 容器
- 在 flex 容器中表现为弹性的盒子的元素被称之为 flex 项。

## flex属性
  
- flex: 是flex-grow flex-shrink flex-basic的缩写
  **若设置flex-basic属性，每个flex项的基础值都相同，多出来的空间会根据flex-grow的值来分配**

```css
.container{
    /* 关键字值 */
    flex: auto;
    flex: initial;
    flex: none;

    /* 单值，无单位数字：flex-grow
    flex-basis 此时等于 0。 */
    flex: 2;

    /* 单值，宽度/高度：flex-basis */
    flex: 10em;
    flex: 30px;
    flex: min-content;

    /* 双值：flex-grow | flex-basis */
    flex: 1 30px;

    /* 双值：flex-grow | flex-shrink */
    flex: 2 2;

    /* 三值：flex-grow | flex-shrink | flex-basis */
    flex: 2 2 10%;

    /* 全局值 */
    flex: inherit;
    flex: initial;
    flex: revert;
    flex: revert-layer;
    flex: unset;
}
```

**取值**：

initial：元素会根据自身宽高设置尺寸。它会缩短自身以适应 flex 容器，但不会伸长并吸收 flex 容器中的额外自由空间来适应 flex 容器。相当于将属性设置为"flex: 0 1 auto"。
auto：元素会根据自身的宽度与高度来确定尺寸，但是会伸长并吸收 flex 容器中额外的自由空间，也会缩短自身来适应 flex 容器。这相当于将属性设置为 "flex: 1 1 auto".
none：元素会根据自身宽高来设置尺寸。它是完全非弹性的：既不会缩短，也不会伸长来适应 flex 容器。相当于将属性设置为"flex: 0 0 auto"。

- flex-basis： 指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒的尺寸
  
```css
/* 指定<'width'> */
flex-basis: 10em;
flex-basis: 3px;
flex-basis: auto;

/* 固有的尺寸关键词 */
flex-basis: fill;
flex-basis: max-content;
flex-basis: min-content;
flex-basis: fit-content;

/* 在 flex item 内容上的自动尺寸 */
flex-basis: content;

/* 全局数值 */
flex-basis: inherit;
flex-basis: initial;
flex-basis: unset;
```

**取值**：
<'width'> : width 值可以是 `<length>`; 该值也可以是一个相对于其父弹性盒容器主轴尺寸的百分数
content：基于 flex 的元素的内容自动调整大小。

- flex-direction：指定了 flex 元素在主轴方向上的排列方式。它决定了 flex 元素在 flex 容器中的排列顺序。
  
```css
/* 文本排成行的方向 */
flex-direction: row;

/* 类似于 <row>，但方向相反 */
flex-direction: row-reverse;

/* 文本行堆叠的方向 */
flex-direction: column;

/* 类似于 <column>，但方向相反 */
flex-direction: column-reverse;

/* 全局值 */
flex-direction: inherit;
flex-direction: initial;
flex-direction: revert;
flex-direction: revert-layer;
flex-direction: unset;
```

- flex-wrap：指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。
  
```css
flex-wrap: nowrap; /* Default value */
flex-wrap: wrap;
flex-wrap: wrap-reverse;

/* Global values */
flex-wrap: inherit;
flex-wrap: initial;
flex-wrap: revert;
flex-wrap: revert-layer;
flex-wrap: unset;
```

**取值**：
nowrap：flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。cross-start 会根据 flex-direction 的值等价于 start 或 before。为该属性的默认值。

wrap：flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值等价于 start 或before。cross-end 为确定的 cross-start 的另一端。

wrap-reverse：和 wrap 的行为一样，但是 cross-start 和 cross-end 互换。

- flex-flow：是 flex-direction 和 flex-wrap 的简写
  
```css
flex-flow: <flex-direction> || <flex-wrap>;
```

- flex-grow：设置 flex 项 主尺寸 的 flex 增长系数
  
```css
/* <number> 值 */
flex-grow: 3;
flex-grow: 0.6;

/* 全局值 */
flex-grow: inherit;
flex-grow: initial;
flex-grow: revert;
flex-grow: unset;
```

- flex-shrink：属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值
  
```css
flex-shrink: 2;
flex-shrink: 0.6;

/* Global values */
flex-shrink: inherit;
flex-shrink: initial;
flex-shrink: unset;
```
