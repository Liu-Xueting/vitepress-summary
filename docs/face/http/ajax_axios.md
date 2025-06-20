# Ajax & Axios

1. 技术原理

    Ajax：Asynchronous JavaScript and XML（异步JavaScript和XML）的缩写，是一种基于原生的XMLHttpRequest对象的技术。它允许网页在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页内容。

    Axios：是一个基于Promise的HTTP客户端库，用于浏览器和node.js。它提供了一套简洁、一致的API来处理HTTP请求和响应。

2. 使用方式

    Ajax：需要手动创建XMLHttpRequest对象、设置请求参数、监听事件等，过程相对繁琐。

    Axios：通过简单的API调用即可实现异步请求，如axios.get()、axios.post()等，使用更为便捷。

3. 功能性

    Ajax：主要实现基本的HTTP请求功能，如GET和POST。

    Axios：提供了更多的功能，如拦截请求和响应、转换请求数据和响应数据、取消请求、设置请求超时时间等。此外，Axios还支持自动转换JSON数据、发送FormData、Blob等类型的数据。

4. 兼容性

    Ajax：由于基于原生的XMLHttpRequest对象，因此在大多数现代浏览器中都得到了很好的支持。但在一些旧版本的浏览器中可能会出现兼容性问题。

    Axios：基于Promise，因此在现代浏览器中兼容性较好。然而，在旧版本的浏览器中使用时，可能需要额外的Polyfill或Babel等工具来支持Promise。

5. 易用性和开发效率

    Ajax：由于需要手动处理较多的细节，如创建XMLHttpRequest对象、设置请求头、监听事件等，因此开发效率相对较低。

    Axios：提供了简洁、一致的API，使得开发者可以更加专注于业务逻辑的实现，而不是处理HTTP请求的底层细节。因此，Axios的开发效率更高。

6. 跨平台支持

    Ajax：主要设计用于浏览器环境。

    Axios：是isomorphic的（即同一套代码可以运行在浏览器和node.js中），因此在浏览器和Node.js环境中都可以使用。

7. 错误处理

    Ajax：错误处理相对复杂，需要检查readyState和status属性来确定请求是否成功。

    Axios：使用Promise API，可以更自然地处理错误。如果请求失败，可以使用.catch()方法来捕获并处理错误。
