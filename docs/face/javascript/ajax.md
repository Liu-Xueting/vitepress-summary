# Ajax实现

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
