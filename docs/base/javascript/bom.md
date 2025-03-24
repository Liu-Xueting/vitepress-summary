# BOM

## **window** 对象

BOM 的核心是 window 对象，表示浏览器的实例。

### **Global** 作用域

因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函

数都会变成 window 对象的属性和方法

如果在这里使用 let 或 const 替代 var，则不会把变量添加给全局对象

### 窗口位置与像素比

可以使用 moveTo()和 moveBy()方法移动窗口

// 把窗口移动到左上角

window.moveTo(0,0);

// 把窗口向下移动 100 像素

window.moveBy(0, 100); 12 window 对象

// 把窗口移动到坐标位置(200, 300)

window.moveTo(200, 300);

// 把窗口向左移动 50 像素

window.moveBy(-50, 0);

### 窗口大小

浏览器窗口自身的精确尺寸不好确定，但可以确定页面视口的大小

```javascript
let pageWidth = window.innerWidth, 
 pageHeight = window.innerHeight; 
if (typeof pageWidth != "number") { 
 if (document.compatMode == "CSS1Compat"){ 
 pageWidth = document.documentElement.clientWidth; 
 pageHeight = document.documentElement.clientHeight; 
 } else { 
 pageWidth = document.body.clientWidth; 
 pageHeight = document.body.clientHeight; 
 } 
}
```

在移动设备上，window.innerWidth 和 window.innerHeight 返回视口的大小，也就是屏幕上页面可视区域的大小

可以使用resizeTo()和resizeBy()方法调整窗口大小

```javascript
// 缩放到 100×100 
window.resizeTo(100, 100); 
// 缩放到 200×150 
window.resizeBy(100, 50); 
// 缩放到 300×300 
window.resizeTo(300, 300);
```

### 视口位置

```javascript
// 相对于当前视口向下滚动 100 像素
window.scrollBy(0, 100); 
// 相对于当前视口向右滚动 40 像素
window.scrollBy(40, 0); 
// 滚动到页面左上角
window.scrollTo(0, 0); 
// 滚动到距离屏幕左边及顶边各 100 像素的位置
window.scrollTo(100, 100);
```

### 导航与打开新窗口

- 弹出窗口

  ```javascript
  window.open("http://www.wrox.com/", 
   "wroxWindow", 
   "height=400,width=400,top=10,left=10,resizable=yes");
  ```

  window.open()方法返回一个对新建窗口的引用。这个对象与普通 window 对象没有区别，只是为

  控制新窗口提供了方便。

  ```javascript
  let wroxWin = window.open("http://www.wrox.com/", 
   "wroxWindow", 
   "height=400,width=400,top=10,left=10,resizable=yes"); 
  // 缩放
  wroxWin.resizeTo(500, 500); 
  // 移动
  wroxWin.moveTo(100, 100);
  wroxWin.close()
  ```

### 定时器

**setTimeout()**用于指定在一定时间后执行某些代码，而 **setInterval()**用于指定每隔一段时间执行某些代码

```javascript
// 设置超时任务
let timeoutId = setTimeout(() => alert("Hello world!"), 1000); 
// 取消超时任务
clearTimeout(timeoutId);
```

```javascript
setInterval(() => alert("Hello world!"), 10000);
```

### 系统对话框

alert()、confirm()和 prompt()

```javascript
if (confirm("Are you sure?")) { 
 alert("I'm so glad you're sure!"); 
} else { 
 alert("I'm sorry to hear you're not sure."); 
}
```

```javascript
let result = prompt("What is your name? ", ""); 
if (result !== null) { 
 alert("Welcome, " + result); 
}
```

## **location** 对象

window.location 和 document.location 指向同一个对象。location 对象不仅保存着当前加载文

档的信息，也保存着把 URL 解析为离散片段后能够通过属性访问的信息。

假设浏览器当前加载的 URL 是 <http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=>

javascript#contents，location 对象的内容如下表所示

|       属 性       |                            值                            |                            说 明                             |
| :---------------: | :------------------------------------------------------: | :----------------------------------------------------------: |
|   location.hash   |                       "#contents"                        |   URL 散列值（井号后跟零或多个字符），如果没有则为空字符串   |
|   location.host   |                    "www.wrox.com:80"                     |                       服务器名及端口号                       |
| location.hostname |                      "www.wrox.com"                      |                           服务器名                           |
|   location.href   | "<http://www.wrox.com:80/WileyCDA/?q=javascript#contents>" | 当前加载页面的完整 URL。location 的 toString()方法返回这个值 |
| location.pathname |                       "/WileyCDA/"                       |                  URL 中的路径和（或）文件名                  |
|   location.port   |                           "80"                           |        请求的端口。如果 URL中没有端口，则返回空字符串        |
| location.protocol |                         "http:"                          |           页面使用的协议。通常是"http:"或"https:"            |
|  location.search  |                     "?q=javascript"                      |            URL 的查询字符串。这个字符串以问号开头            |
| location.username |                        "foouser"                         |                      域名前指定的用户名                      |
| location.password |                      "barpassword"                       |                       域名前指定的密码                       |
|  location.origin  |                  "<http://www.wrox.com>"                   |                      URL 的源地址。只读                      |

### 查询字符串

location 的多数信息都可以通过上面的属性获取。但是 URL 中的查询字符串并不容易使用。虽然

location.search 返回了从问号开始直到 URL 末尾的所有内容，但没有办法逐个访问每个查询参数。

**getQueryStringArgs()**:

```javascript
// 假设查询字符串为?q=javascript&num=10 
let args = getQueryStringArgs(); 
alert(args["q"]); // "javascript" 
alert(args["num"]); // "10
```

**URLSearchParams** 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。给

URLSearchParams 构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了 get()、

set()和 delete()等方法，可以对查询字符串执行相应操作。

```javascript
let qs = "?q=javascript&num=10"; 
let searchParams = new URLSearchParams(qs); 
alert(searchParams.toString()); // " q=javascript&num=10" 
searchParams.has("num"); // true 
searchParams.get("num"); // 10 
searchParams.set("page", "3"); 
alert(searchParams.toString()); // " q=javascript&num=10&page=3" 
searchParams.delete("q"); 
alert(searchParams.toString()); // " num=10&page=3"
```

### 操作地址

可以通过修改 location 对象修改浏览器的地址。首先，最常见的是使用 **assign()**方法并传入一

个 URL，立即启动导航到新 URL 的操作，同时在浏览器历史记录中增加一条记录

 ```javascript
 下面两行代码都会执行与显式调用 assign()一样的操作：
 window.location = "http://www.wrox.com"; 
 location.href = "http://www.wrox.com";
 ```

在以前面提到的方式修改 URL 之后，浏览器历史记录中就会增加相应的记录。当用户单击“后退”

按钮时，就会导航到前一个页面。如果不希望增加历史记录，可以使用 **replace()**方法。

```html
<!DOCTYPE html> 
<html> 
<head> 
 <title>You won't be able to get back here</title> 
</head> 
<body> 
 <p>Enjoy this page for a second, because you won't be coming back here.</p> 
 <script> 
 setTimeout(() => location.replace("http://www.wrox.com/"), 1000); 
 </script> 
</body> 
</html>
```

最后一个修改地址的方法是 **reload()**，它能重新加载当前显示的页面。

```javascript
location.reload(); // 重新加载，可能是从缓存加载
location.reload(true); // 重新加载，从服务器加载
```

## **navigator** 对象

navigator 是由 Netscape Navigator 2 最早引入浏览器的，现在已经成为客户端标识浏览器的标准

**navigator 对象的属性通常用于确定浏览器的类型。**

| 属性/方法           | 说 明                                                        |
| ------------------- | ------------------------------------------------------------ |
| activeVrDisplays    | 返回数组，包含 ispresenting 属性为 true 的 VRDisplay 实例    |
| appCodeName         | 即使在非 Mozilla 浏览器中也会返回"Mozilla"                   |
| appName             | 浏览器全名                                                   |
| appVersion          | 浏览器版本。通常与实际的浏览器版本不一致                     |
| battery             | 返回暴露 Battery Status API 的 BatteryManager 对象           |
| buildId             | 浏览器的构建编号                                             |
| connection          | 返回暴露 Network Information API 的 NetworkInformation 对象  |
| cookieEnabled       | 返回布尔值，表示是否启用了 cookie                            |
| credentials         | 返回暴露 Credentials Management API 的 CredentialsContainer 对象 |
| deviceMemory        | 返回单位为 GB 的设备内存容量                                 |
| doNotTrack          | 返回用户的“不跟踪”（do-not-track）设置                       |
| geolocation         | 返回暴露 Geolocation API 的 Geolocation 对象                 |
| getVRDisplays()     | 返回数组，包含可用的每个 VRDisplay 实例                      |
| getUserMedia()      | 返回与可用媒体设备硬件关联的流                               |
| hardwareConcurrency | 返回设备的处理器核心数量                                     |
| javaEnabled         | 返回布尔值，表示浏览器是否启用了 Java                        |
| language            | 返回浏览器的主语言                                           |
| languages           | 返回浏览器偏好的语言数组                                     |
| locks               | 返回暴露 Web Locks API 的 LockManager 对象                   |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |
|                     |                                                              |

### 检测插件

检测浏览器是否安装了某个插件是开发中常见的需求

```javascript
// 插件检测，IE10 及更低版本无效 
let hasPlugin = function(name) { 
 name = name.toLowerCase(); 
 for (let plugin of window.navigator.plugins){ 
 if (plugin.name.toLowerCase().indexOf(name) > -1){ 
 return true; 
 } 
 } 
 return false; 
} 
// 检测 Flash 
alert(hasPlugin("Flash")); 
// 检测 QuickTime 
alert(hasPlugin("QuickTime"));
```

这个 hasPlugin()方法接收一个参数，即待检测插件的名称。第一步是把插件名称转换为小写形

式，以便于比较。然后，遍历 plugins 数组，通过 indexOf()方法检测每个 name 属性，看传入的名

称是不是存在于某个数组中。比较的字符串全部小写，可以避免大小写问题。传入的参数应该尽可能独

一无二，以避免混淆。

## **screen** 对象

window 的另一个属性 screen 对象，是为数不多的几个在编程中很少用的 JavaScript 对象。这个对

象中保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像

素高度。每个浏览器都会在 screen 对象上暴露不同的属性。下表总结了这些属性

|    属 性    | 说 明                                        |
| :---------: | -------------------------------------------- |
| availHeight | 屏幕像素高度减去系统组件高度（只读）         |
|  availLeft  | 没有被系统组件占用的屏幕的最左侧像素（只读） |
|  availTop   | 没有被系统组件占用的屏幕的最顶端像素（只读） |
| availWidth  | 屏幕像素宽度减去系统组件宽度（只读）         |
| colorDepth  | 表示屏幕颜色的位数；多数系统是 32（只读）    |
|   height    | 屏幕像素高度                                 |
|    left     | 当前屏幕左边的像素距离                       |
| pixelDepth  | 屏幕的位深（只读）                           |
|     top     | 当前屏幕顶端的像素距离                       |
|    width    | 屏幕像素宽度                                 |
| orientation | 返回 Screen Orientation API 中屏幕的朝向     |

## **history** 对象

history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性，

所以每个 window 都有自己的 history 对象。

### 导航

```javascript
// 后退一页
history.go(-1); 
// 前进一页
history.go(1); 
// 前进两页
history.go(2);
// 导航到最近的 wrox.com 页面
history.go("wrox.com"); 
// 导航到最近的 nczonline.net 页面
history.go("nczonline.net");
// 后退一页
history.back(); 
// 前进一页
history.forward();
```

### 历史状态管理

hashchange 会在页面 URL 的散列变化时被触发，开发者可以在此时执行某些操作。而状态管理

API 则可以让开发者改变浏览器 URL 而不会加载新页面。为此，可以使用 history.pushState()方

法。这个方法接收 3 个参数：一个 state 对象、一个新状态的标题和一个（可选的）相对 URL。

```javascript
let stateObject = {foo:"bar"}; 
history.pushState(stateObject, "My title", "baz.html");
```

pushState()方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相对 URL。除了这些变化之外，即使 location.href 返回的是地址栏中的内容，浏览器页不会向服务器发送请求

为 pushState()会创建新的历史记录，所以也会相应地启用“后退”按钮
