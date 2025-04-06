# JavaScript

## 继承

继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码

在子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能

下面给出JavaScripy常见的继承方式：

- 原型链继承
- 构造函数继承（借助 call）
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

### 原型链继承

原型链继承是通过将子类的原型对象指向父类的实例对象来实现继承的

```javascript
function Parent() {
    this.name = 'parent1';
    this.play = [1, 2, 3]
}
function Child() {
    this.type = 'child2';
}
Child1.prototype = new Parent();
console.log(new Child())
```

上面代码看似没问题，实际存在潜在问题

```js
var s1 = new Child2();
var s2 = new Child2();
s1.play.push(4);
console.log(s1.play, s2.play); // [1,2,3,4]
```

改变s1的play属性，会发现s2也跟着发生变化了，这是因为两个实例使用的是同一个原型对象，**内存空间是共享的**

### 构造函数继承

构造函数继承是通过在子类的构造函数中调用父类的构造函数来实现继承的
借助 call调用Parent函数

```javascript
function Parent(){
    this.name = 'parent1';
}

Parent.prototype.getName = function () {
    return this.name;
}

function Child(){
    Parent1.call(this);
    this.type = 'child'
}

let child = new Child();
console.log(child);  // 没问题
console.log(child.getName());  // 会报错
```

上面代码中，child对象没有getName方法，因为**构造函数继承只会继承父类的实例属性，而不会继承父类的原型属性**

### 组合继承

前面我们讲到两种继承方式，各有优缺点。组合继承则将前两种方式继承起来

```javascript
function Parent(){
    this.name = 'parent3';
    this.play = [1, 2, 3];
}
Parent.prototype.getName = function () {
    return this.name;
}
function Child(){
    Parent.call(this);
    this.type = 'child'
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
```

这种方式看起来就没什么问题，方式一和方式二的问题都解决了，但是从上面代码我们也可以看到Parent3 执行了两次，造成了多构造一次的性能开销

### 原型式继承

这里主要借助 `Object.create` 方法实现普通对象的继承

```javascript
let parent4 = {
    name: "parent4",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
  };

  let person4 = Object.create(parent4);
  person4.name = "tom";
  person4.friends.push("jerry");

  let person5 = Object.create(parent4);
  person5.friends.push("lucy");

  console.log(person4.name); // tom
  console.log(person4.name === person4.getName()); // true
  console.log(person5.name); // parent4
  console.log(person4.friends); // ["p1", "p2", "p3","jerry","lucy"]
  console.log(person5.friends); // ["p1", "p2", "p3","jerry","lucy"]
```

这种继承方式的缺点也很明显，因为Object.create方法实现的是浅拷贝，多个实例的引用类型属性指向相同的内存，存在篡改的可能

### 寄生式继承

寄生式继承是对原型式继承的进一步封装，创建一个函数来封装原型式继承的过程

```javascript
function createAnother(original) {
    let clone = Object.create(original);
    clone.sayHi = function() {
        console.log("hi");
    };
    return clone;
}
let person6 = {
    name: "person6",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
  };
  
  let person7 = createAnother(person6);
  person7.name = "tom";
  person7.friends.push("jerry");
  
  let person8 = createAnother(person6);
  person8.friends.push("lucy");
  
  console.log(person7.name); // tom
  console.log(person7.name === person7.getName()); // true
  console.log(person8.name); // person6
  console.log(person7.friends); // ["p1", "p2", "p3","jerry","lucy"]
  console.log(person8.friends); // ["p1", "p2", "p3","jerry","lucy"]
```

其优缺点也很明显，跟上面讲的原型式继承一样

### 寄生组合式继承

寄生组合式继承是对组合式继承的进一步封装，避免了组合式继承中父类构造函数被调用两次的问题

```javascript
function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}

function Parent6() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
    return this.name;
}
function Child6() {
    Parent6.call(this);
    this.friends = 'child5';
}

clone(Parent6, Child6);

Child6.prototype.getFriends = function () {
    return this.friends;
}

let person6 = new Child6();
console.log(person6); //{friends:"child5",name:"child5",play:[1,2,3],__proto__:Parent6}
console.log(person6.getName()); // parent6
console.log(person6.getFriends()); // child5
```

## 事件代理

事件代理，俗地来讲，就是**把一个元素响应事件的函数委托到另一个元素**

前面讲到，事件流的都会经过三个阶段： 捕获阶段 -> 目标阶段 -> 冒泡阶段，而**事件委托就是在冒泡阶段**完成

事件委托，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，而不是目标元素

如果我们有一个列表，列表之中有大量的列表项，我们需要在点击列表项的时候响应一个事件

```html
<ul id="list">
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  ......
  <li>item n</li>
</ul>
```

如果给每个列表项一一都绑定一个函数，那对于内存消耗是非常大的

```javascript
// 获取目标元素
const lis = document.getElementsByTagName("li")
// 循环遍历绑定事件
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function(e){
        console.log(e.target.innerHTML)
    }
}
```

这时候就可以事件委托，把点击事件绑定在父级元素ul上面，然后执行事件的时候再去匹配目标元素

```javascript
// 给父层元素绑定事件
document.getElementById('list').addEventListener('click', function (e) {
    // 兼容性处理
    var event = e || window.event;
    var target = event.target || event.srcElement;
    // 判断是否匹配目标元素
    if (target.nodeName.toLocaleLowerCase === 'li') {
        console.log('the content is: ', target.innerHTML);
    }
});
```

## Ajax实现

AJAX全称(Async Javascript and XML)

即异步的JavaScript 和XML，是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页

Ajax的原理简单来说通过 `XmlHttpRequest` 对象来向服务器发异步请求，从服务器获得数据，然后用JavaScript来操作DOM而更新页面

### 实现过程

- 创建 Ajax的核心对象 `XMLHttpRequest` 对象
- 通过 XMLHttpRequest 对象的 `open()` 方法与服务端建立连接
- 构建请求所需的数据内容，并通过 `XMLHttpRequest` 对象的 `send()` 方法发送给服务器端
- 通过 `XMLHttpRequest` 对象提供的 `onreadystatechange` 事件监听服务器端你的通信状态
- 接受并处理服务端向客户端响应的数据结果
- 将处理结果更新到 HTML 页面中

**创建XMLHttpRequest对象**:

通过 `XMLHttpRequest()` 构造函数用于初始化一个 XMLHttpRequest 实例对象

```javascript
let xhr = new XMLHttpRequest();
```

**与服务器建立连接**:

通过 XMLHttpRequest 对象的 `open()` 方法与服务器建立连接

```javascript
xhr.open(method, url, [async][, user][, password])
```

参数说明：

- method：表示当前的请求方式，常见的有GET、POST
- url：服务端地址
- async：布尔值，表示是否异步执行操作，默认为true
- user: 可选的用户名用于认证用途；默认为`null`
- password: 可选的密码用于认证用途，默认为`null`

**给服务端发送数据**:

通过 XMLHttpRequest 对象的 `send()` 方法，将客户端页面的数据发送给服务端

```javascript
xhr.send([body])
```

**绑定onreadystatechange事件**:

body: 在 XHR 请求中要发送的数据体，如果不传递数据则为 null

如果使用GET请求发送数据的时候，需要注意如下：

将请求数据添加到 `open()` 方法中的url地址中
发送请求数据中的 `send()` 方法中参数设置为null

onreadystatechange 事件用于监听服务器端的通信状态，主要监听的属性为XMLHttpRequest.readyState ,

关于XMLHttpRequest.readyState属性有五个状态，

| 值 | 状态 | 描述 |
| ------- | --------------- | ----------------- |
|0 | UNSENT| 代理被创建，但尚未调用 open() 方法。|
|1 | OPENED| open() 方法已经被调用。|
|2 | HEADERS_RECEIVED| send() 方法已经被调用，并且头部和状态已经可获得。|
|3 | LOADING| 下载中；responseText 属性已经包含部分数据。|
|4 | DONE| 下载操作已完成。|

只要 readyState 属性值一变化，就会触发一次 readystatechange 事件

XMLHttpRequest.responseText属性用于接收服务器端的响应结果

```javascript
const request = new XMLHttpRequest()
request.onreadystatechange = function(e){
    if(request.readyState === 4){ // 整个请求过程完毕
        if(request.status >= 200 && request.status <= 300){
            console.log(request.responseText) // 服务端返回的结果
        }else if(request.status >=400){
            console.log("错误信息：" + request.status)
        }
    }
}
request.open('POST','http://xxxx')
request.send()
```

## call apply bind

call、apply、bind都是JavaScript中函数对象的方法，用于改变函数的执行上下文（this指向）

那么什么情况下需要改变this的指向呢？下面举个例子

```javascript
var name = "lucy";
var obj = {
    name: "martin",
    say: function () {
        console.log(this.name);
    }
};
obj.say(); // martin，this 指向 obj 对象
setTimeout(obj.say,0); // lucy，this 指向 window 对象
```

从上面可以看到，正常情况say方法输出martin

但是我们把say放在setTimeout方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候this指向window，所以输出lucy

我们实际需要的是this指向obj对象，这时候就需要该改变this指向了

```javascript
setTimeout(obj.say.bind(obj),0); // martin
```

### apply

apply接受两个参数，第一个参数是this的指向，第二个参数是函数接受的参数，以数组的形式传入

改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次

```javascript
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

当第一个参数为null、undefined的时候，默认指向window(在浏览器中)

```javascript
fn.apply(null,[1,2]); // this指向window
```

### call

all方法的第一个参数也是this的指向，后面传入的是一个参数列表

跟apply一样，改变this指向后原函数会立即执行，且此方法只是临时改变this指向一次

```javascript
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```

同样的，当第一个参数为null、undefined的时候，默认指向window(在浏览器中)

```javascript
fn.call(null,1,2); // this指向window
```

### bind

bind方法和call很相似，第一参数也是this的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变this指向后不会立即执行，而是返回一个永久改变this指向的函数

```javascript
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```

从上面可以看到，apply、call、bind三者的区别在于：

- 三者都可以改变函数的this对象指向
- 三者第一个参数都是this要指向的对象，如果没有这个参数或参数为undefined或null，则默认指向全局window
- 三者都可以传参，但是apply是数组，而call是参数列表，且apply和call是一次性传入参数，而bind可以分为多次传入
- bind是返回绑定this之后的函数，apply、call 则是立即执行

## 事件循环

首先，JavaScript是一门单线程的语言，意味着同一时间内只能做一件事，但是这并不意味着单线程就是阻塞，而实现单线程非阻塞的方法就是事件循环

在JavaScript中，所有的任务都可以分为

- 同步任务：立即执行的任务，同步任务一般会直接进入到主线程中执行
- 异步任务：异步执行的任务，比如ajax网络请求，setTimeout定时函数等

同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就事件循环

### 宏任务与微任务

如果将任务划分为同步任务和异步任务并不是那么的准确，举个例子：

```javascript
console.log(1)

setTimeout(()=>{
    console.log(2)
}, 0)

new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})

console.log(3)
```

如果按照上面流程图来分析代码，我们会得到下面的执行步骤：

`console.log(1)`，同步任务，主线程中执行
`setTimeout()` ，异步任务，放到 `Event Table`，0 毫秒后 `console.log(2)` 回调推入 `Event Queue` 中
`new Promise` ，同步任务，主线程直接执行
`.then` ，异步任务，放到 `Event Table`
`console.log(3)`，同步任务，主线程执行
所以按照分析，它的结果应该是 `1` => `'new Promise'` => `3` => `2` => `'then'`

但是实际结果是：`1` => `'new Promise'` => `3` => `'then'` => `2`

出现分歧的原因在于异步任务执行顺序，事件队列其实是一个“先进先出”的数据结构，排在前面的事件会优先被主线程读取

例子中 setTimeout回调事件是先进入队列中的，按理说应该先于 .then 中的执行，但是结果却偏偏相反

原因在于**异步任务还可以细分为微任务与宏任务**

### 微任务

一个需要异步执行的函数，执行时机是在**主函数执行结束之后、当前宏任务结束之前**

常见的微任务有：

- Promise.then
- process.nextTick
- MutationObserver：监视DOM树的变化
- queueMicrotask
- Object.observe
- async/await awaits之后的代码阻塞放入微任务队列

### 宏任务

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

常见的宏任务有：

- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O 操作
- UI 渲染
- script标签的加载和执行
- postMessage
- MessageChannel
- WebSocket
- Worker
- setImmediate

按照这个流程，它的执行机制是：

- 执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中
- 当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

回到上面的题目

```javascript
console.log(1)
setTimeout(()=>{
    console.log(2)
}, 0)
new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})
console.log(3)
```

流程如下

```js
// 遇到 console.log(1) ，直接打印 1
// 遇到定时器，属于新的宏任务，留着后面执行
// 遇到 new Promise，这个是直接执行的，打印 'new Promise'
// .then 属于微任务，放入微任务队列，后面再执行
// 遇到 console.log(3) 直接打印 3
// 好了本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印 'then'
// 当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印 2
```

### async与await

`async` 是异步的意思，`await` 则可以理解为 `async wait`。所以可以理解 `async` 就是用来声明一个异步方法，而 `await` 是用来等待异步方法执行

**async**:

`async` 函数返回一个 `promise` 对象，下面两种方法是等效的

```javascript
function f() {
    return Promise.resolve('TEST');
}

// asyncF is equivalent to f!
async function asyncF() {
    return 'TEST';
}
```

**await**:

正常情况下，`await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值

```javascript
async function f(){
    // 等同于
    // return 123
    return await 123
}
f().then(v => console.log(v)) // 123
```

不管 `await` 后面跟着的是什么，`await` 都会阻塞后面的代码

```javascript
async function fn1 (){
    console.log(1)
    await fn2()
    console.log(2) // 阻塞
}

async function fn2 (){
    console.log('fn2')
}

fn1()
console.log(3)
```

### 流程分析

```js
async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
console.log('script start')
setTimeout(function () {
    console.log('settimeout')
})
async1()
new Promise(function (resolve) {
    console.log('promise1')
    resolve()
}).then(function () {
    console.log('promise2')
})
console.log('script end')
```

分析过程：

- 执行整段代码，遇到 `console.log('script start')` 直接打印结果，输出 `script start`
- 遇到定时器了，它是宏任务，先放着不执行
- 遇到 `async1()`，执行 `async1` 函数，先打印 `async1 start`，下面遇到await怎么办？先执行 `async2`，打印 `async2`，然后阻塞下面代码（即加入微任务列表），跳出去执行同步代码
- 跳到 `new Promise` 这里，直接执行，打印 `promise1`，下面遇到 `.then()`，它是微任务，放到微任务列表等待执行
- 最后一行直接打印 `script end`，现在同步代码执行完了，开始执行微任务，即 `await` 下面的代码，打印 `async1 end`
- 继续执行下一个微任务，即执行 then 的回调，打印 `promise2`
- 上一个宏任务所有事都做完了，开始下一个宏任务，就是定时器，打印 `settimeout`
  
所以最后的结果是：`script` `start`、`async1` `start`、`async2`、`promise1`、`script` `end`、`async1` `end`、`promise2`、`settimeout`
