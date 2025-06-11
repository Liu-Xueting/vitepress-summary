# 闭包

## 是什么

一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）

也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域

在 JavaScript中，每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁

下面给出一个简单的例子

```javascript
function outer() {
    var a = 1;
    function inner() {
        console.log(a);
    }
    return inner;
}
var innerFunc = outer();
innerFunc(); // 1
```

## 使用场景

任何闭包的使用场景都离不开这两点：

- 创建私有变量
- 延长变量的生命周期

> 一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用，即便创建时所在的执行上下文被销毁，但创建时所在词法环境依然存在，以达到延长变量的生命周期的目的

下面举个例子：

在页面上添加一些可以调整字号的按钮

```js
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

### 1. 数据封装

闭包可以用来封装数据，保护数据不被外部访问和修改

```javascript
function createCounter() {
    let count = 0;
    return {
        increment: function() {
            count++;
        },
        getCount: function() {
            return count;
        }
    };
}
const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
```

### 2. 柯里化函数

柯里化的目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的重用

```javascript
// 假设我们有一个求长方形面积的函数
function getArea(width, height) {
    return width * height
}
// 如果我们碰到的长方形的宽老是10
const area1 = getArea(10, 20)
const area2 = getArea(10, 30)
const area3 = getArea(10, 40)

// 我们可以使用闭包柯里化这个计算面积的函数
function getArea(width) {
    return height => {
        return width * height
    }
}

const getTenWidthArea = getArea(10)
// 之后碰到宽度为10的长方形就可以这样计算面积
const area1 = getTenWidthArea(20)

// 而且如果遇到宽度偶尔变化也可以轻松复用
const getTwentyWidthArea = getArea(20)
```

### 3. 延迟执行

闭包可以用来实现延迟执行的功能

```javascript
function delayedFunction() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    };
}
const func = delayedFunction();
setTimeout(func, 1000); // 1
setTimeout(func, 2000); // 2
```

### 4. 节流和防抖

闭包可以用来实现节流和防抖的功能

```javascript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
const debouncedFunc = debounce(() => {
    console.log('Debounced function executed');
}, 1000);
window.addEventListener('resize', debouncedFunc);
```

```javascript

function throttle(func, delay) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            func.apply(this, args);
        }
    };
}
const throttledFunc = throttle(() => {
    console.log('Throttled function executed');
}, 1000);
window.addEventListener('scroll', throttledFunc);
```

### 5. 函数缓存

闭包可以用来实现函数缓存，避免重复计算

```javascript
function memoize(func) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) {
            return cache[key];
        }
        const result = func.apply(this, args);
        cache[key] = result;
        return result;
    };
}
const memoizedAdd = memoize((a, b) => {
    console.log('Calculating...');
    return a + b;
});
console.log(memoizedAdd(1, 2)); // Calculating... 3
console.log(memoizedAdd(1, 2)); // 3 (cached)
```
