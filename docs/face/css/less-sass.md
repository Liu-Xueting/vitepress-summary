# CSS预编语言

预处理语言

扩充了 Css 语言，增加了诸如变量、混合（mixin）、函数等功能，让 Css 更易维护、方便

本质上，预处理是Css的超集

包含一套自定义的语法及一个解析器，根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 Css 文件

Css预编译语言在前端里面有三大优秀的预编处理器，分别是：

- sass
- less

## sass

Sass 是一种成熟的、功能强大的 CSS 扩展语言，提供了变量、嵌套、混合、继承等功能
文件后缀名为.sass与scss，可以严格按照 sass 的缩进方式省去大括号和分号

## less

Less 是一种 CSS 预处理器，提供了变量、嵌套、混合、函数等功能

其缺点是比起 SASS来，可编程功能不够，不过优点是简单和兼容 Css，反过来也影响了 SASS演变到了Scss 的时代

## 区别

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

总结：
Less和Sass的主要不同就是他们的实现方式。、

- Less是基于JavaScript，是在客户端处理的。
- Sass是基于Ruby的，是在服务器端处理的。
- 关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。
- less混合使用.mixin()，scss使用@mixin
