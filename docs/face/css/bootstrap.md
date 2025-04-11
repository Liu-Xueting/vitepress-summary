# BootStarap

## 栅格布局

Bootstrap网格系统是透过横向的row(列)和直向的column(行)来设计网页版面，他将网页宽度平均分割为12等份，称为12个column。

### 网格选项

Bootstrap针对不同的荧幕尺寸提供多种网格选项

| 屏幕尺寸 | X-Small | Small | Medium | Large | Extra Large |
| -------- | ------- | ----- | ------ | ----- | ----------- |
| 断点    | <576px  | ≥576px | ≥768px | ≥992px | ≥1200px     |
| 前置词| col- | col-sm- | col-md- | col-lg- | col-xl- |

意思 比如 `col-4` 表示在所有屏幕尺寸下占据4列，`col-sm-4` 表示在小屏幕尺寸下占据4列，`col-md-4` 表示在中等屏幕尺寸下占据4列，依此类推。

### 容器(Container)

Bootstrap提供下列三种不同的容器:

- .container: 根据不同的响应式断点变更最大容器宽度。
- .container-fluid: 容器宽度是浏览器的100%宽度，两侧没有留白。
- .container-{breakpoint}: 容器宽度是浏览器的100%宽度，直到超过指定的断点，两侧才会有留白。

|                | Extra small <576px | Small ≥576px | Medium  ≥768px |  large ≥992px | Extra Large ≥1200px |
| ------------------ | ------------- | --------------- | -------------- | --------------------- |
|.container         |100%  | 540px | 720px | 960px | 1140px |
|.container-sm     |100%  | 540px | 720px | 960px | 1140px |
|.container-md     |100%  | 100%|  720px | 960px | 1140px |
|.container-lg     |100%  | 100%|  100%|  960px | 1140px |
|.container-xl     |100%  | 100%|  100%|  100%| 1140px |
|.container-fluid |100%  | 100%|  100%|  100%| 100% |

**这些容器只有超过指定的断点时，才会有留白。**

各类型容器下的两栏式版面

- 第一个容器使用.container类别
- 第二个容器使用.container-md类别
- 第三个容器使用.container-fluid类别

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CDN -->
    <!-- CSS only -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <!-- JavaScript Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    <title>Bootstrap網格系統-各類容器比較</title>
    <style>
     /*设定区块的背景色彩与框线，有助于看清楚区块位置*/
        div[class^="col"] {
            background-color: #EBDEF0;
            border: 0.5px solid purple;
        }
    </style>
</head>
<body>
 <!-- 容器1 -->
    <div class="container">
        <div class="row">
            <div class="col-8">區塊1</div>
            <div class="col-4">區塊2</div>
        </div>
    </div>
    <!-- 容器2 -->
    <div class="container-md">
        <div class="row">
            <div class="col-8">區塊3</div>
            <div class="col-4">區塊4</div>
        </div>
    </div>
    <!-- 容器3 -->
    <div class="container-fluid">
        <div class="row">
            <div class="col-8">區塊5</div>
            <div class="col-4">區塊6</div>
        </div>
    </div>
</body>
</html>
```

容器1 (.container) 会根据不同的响应式断点变更最大容器宽度，超过576px时两侧才会有留白。

容器2 (.container-md) 的宽度是浏览器的100%宽度，直到超过指定断点(768px)，两侧才会有留白。

容器3 (.container-fluid) 在任何时候容器宽度都是浏览器的100%宽度，两侧没有留白。

### 对齐方式

**row的垂直对齐方式**：

`.align-items-*` 类别设定row的垂直对齐方式

- `.align-items-start`：垂直上对齐
- `.align-items-center`：垂直置中对齐
- `.align-items-end`：垂直下对齐
- `.align-items-baseline`：基线对齐
- `.align-items-stretch`：拉伸对齐(默认值)

**column的水平对齐方式**：

`.justify-content-*` 类别设定column的水平对齐方式

- `.justify-content-start`：水平向前(容器开头)对齐
- `.justify-content-center`：水平向后(容器末端)对齐
- `.justify-content-end`：水平置中对齐
- `.justify-content-around` ：让区块等间距放置(左右有间距，但大小不相等)
  
![justify-content-around](/justify-around.png)

- `.justify-content-between`：让区块之间等间距放置(左右没有间距)
  
![justify-content-between](/justify-between.png)

- `.justify-content-evenly`: 让区块等间距放置(左右有间距，且大小相等)
  
![justify-content-evenly](/justify-evenly.png)

### column的宽度、位移、换行与顺序

**column的宽度**：

- `.col-*`：表示在所有屏幕尺寸下占据*列
- `.col-sm-*`：表示在小屏幕尺寸下占据*列
- `.col-md-*`：表示在中等屏幕尺寸下占据*列
- `.col-lg-*`：表示在大屏幕尺寸下占据*列
- `.col-xl-*`：表示在超大屏幕尺寸下占据*列
- `.col-xxl-*`：表示在超超大屏幕尺寸下占据*列

```html
<body>
    <div class="container">
        <div class="row">
         <!-- 三个区块平均分配容器宽度，也就是分别占用 1/3 的容器宽度 -->
            <div class="col">區塊1</div>
            <div class="col">區塊2</div>
            <div class="col">區塊3</div>
        </div>
        <div class="row">
         <!-- 第二个区块占用 6/12 (1/2)的容器宽度，剩下的宽度由其他两个区块平均分配，也就是各占 1/4 容器宽度 -->
            <div class="col">區塊1</div>
            <div class="col-6">區塊2</div>
            <div class="col">區塊3</div>
        </div>
    </div>
</body>
```

**column的位移**：

- `.offset-*`：表示在所有屏幕尺寸下向后偏移*列
- `.offset-sm-*`：表示在小屏幕尺寸下向后偏移*列
- `.offset-md-*`：表示在中等屏幕尺寸下向后偏移*列
- `.offset-lg-*`：表示在大屏幕尺寸下向后偏移*列
- `.offset-xl-*`：表示在超大屏幕尺寸下向后偏移*列
- `.offset-xxl-*`：表示在超超大屏幕尺寸下向后偏移*列

```html
<body>
    <div class="container">
        <div class="row">
         <!-- 此区块占用4个column且没有位移 -->
            <div class="col-md-4">.col-md-4</div>
            <!-- 此区块占用4个column且向右位移4个column -->
            <div class="col-md-4 offset-md-4">.col-md-4 offset-md-4</div>
        </div>
        <div class="row">
         <!-- 此区块占用3个column且向右位移3个column -->
            <div class="col-md-3 offset-md-3">.col-md-3 offset-md-3</div>
            <div class="col-md-3 offset-md-3">.col-md-3 offset-md-3</div>
        </div>
        <div class="row">
         <!-- 此区块占用6个column且向右位移3个column -->
            <div class="col-md-6 offset-md-3">.col-md-6 offset-md-3</div>
        </div>
    </div>
</body>
```

**column的换行**：

方法一：使用 `.row-cols-*` 类别

- `.row-cols-*`：表示在所有屏幕尺寸下每行显示*个column
- `.row-cols-sm-*`：表示在小屏幕尺寸下每行显示*个column
- `.row-cols-md-*`：表示在中等屏幕尺寸下每行显示*个column
- `.row-cols-lg-*`：表示在大屏幕尺寸下每行显示*个column
- `.row-cols-xl-*`：表示在超大屏幕尺寸下每行显示*个column

方法二：使用 `.w-100` 类别

只要在换到新行的地方加上一个有 width:100% 属性的元素即可。

```html
<body>
    <div class="container">
        <div class="row">
            <div class="col-6 col-sm-3">區塊1</div>
            <div class="col-6 col-sm-3">區塊2</div>
            <!-- 將column換到新行 -->
            <div class="w-100"></div>
            <div class="col-6 col-sm-3">區塊3</div>
            <div class="col-6 col-sm-3">區塊4</div>
        </div>
    </div>
</body>
```

**column的顺序**：

用数字1~5代表顺序(数字越小顺序越前面)，数字0表示不显示该column。

- `.order-*`：表示在所有屏幕尺寸下顺序为*
- `.order-sm-*`：表示在小屏幕尺寸下顺序为*
- `.order-md-*`：表示在中等屏幕尺寸下顺序为*
- `.order-lg-*`：表示在大屏幕尺寸下顺序为*
- `.order-xl-*`：表示在超大屏幕尺寸下顺序为*
- `.order-xxl-*`：表示在超超大屏幕尺寸下顺序为*

```html
<body>
    <div class="container">
        <div class="row">
            <div class="col">區塊1(沒有指定順序)</div>
            <div class="col order-5">區塊2(指定順序為5)</div>
            <div class="col order-1">區塊3(指定順序為1)</div>
        </div>
    </div>
</body>
```

没有指定顺序的区块1就按照他原先的顺序摆(此例为最前面)，接着是顺序为1的区块3，最后是顺序为5的区块2。

```html
<body>
    <div class="container">
        <div class="row">
            <div class="col order-last">區塊1(順序為最後)</div>
            <div class="col">區塊2(沒有指定順序)</div>
            <div class="col order-first">區塊3(指定順序為最先)</div>
        </div>
    </div>
</body>

```
