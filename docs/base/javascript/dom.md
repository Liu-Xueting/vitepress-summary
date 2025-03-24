# 1. DOM

## 1 节点层级

document 节点表示每个文档的根节点。在这里，根节点的唯一子节点是`<html>`元素，我们称之

为文档元素（documentElement）

### 1 **Node** 类型

DOM Level 1 描述了名为 Node 的接口，这个接口是所有 DOM 节点类型都必须实现的。Node 接口

在 JavaScript中被实现为 Node 类型

每个节点都有 nodeType 属性，表示该节点的类型。节点类型由定义在 Node 类型上的 12 个数值

常量表示：

 Node.ELEMENT_NODE（1）

 Node.ATTRIBUTE_NODE（2）

 Node.TEXT_NODE（3）

 Node.CDATA_SECTION_NODE（4） 14 节点层级 403

 Node.ENTITY_REFERENCE_NODE（5）

 Node.ENTITY_NODE（6）

 Node.PROCESSING_INSTRUCTION_NODE（7）

 Node.COMMENT_NODE（8）

 Node.DOCUMENT_NODE（9）

 Node.DOCUMENT_TYPE_NODE（10）

 Node.DOCUMENT_FRAGMENT_NODE（11）

 Node.NOTATION_NODE（12）

```javascript
// 节点类型可通过与这些常量比较来确定，比如：
if (someNode.nodeType == Node.ELEMENT_NODE){ 
 alert("Node is an element."); 
}
```

- **nodeName** 与 **nodeValue**

  nodeName 与 nodeValue 保存着有关节点的信息。这两个属性的值完全取决于节点类型。在使用

  这两个属性前，最好先检测节点类型

  ```javascript
  if (someNode.nodeType == 1){ 
   value = someNode.nodeName; // 会显示元素的标签名
  }
  ```

- 节点关系

  ```javascript
  let firstChild = someNode.childNodes[0]; 
  let secondChild = someNode.childNodes.item(1); 
  let count = someNode.childNodes.length;
  ```

  注意，length 属性表示那一时刻 NodeList 中节点的数量。使用 Array.prototype. slice()可以像前面介绍 arguments 时一样把 NodeList 对象转换为数组

  ```javascript
  let arrayOfNodes = Array.prototype.slice.call(someNode.childNodes,0);
  let arrayOfNodes = Array.from(someNode.childNodes);
  ```

  使用 previousSibling 和 nextSibling 可以在这个列表的节点间导航。这个列表中第一个节点的 previousSibling 属性是 null，最后一个节点的nextSibling 属性也是 null

  ```javascript
  if (someNode.nextSibling === null){ 
   alert("Last node in the parent's childNodes list."); 
  } else if (someNode.previousSibling === null){ 
   alert("First node in the parent's childNodes list."); 
  }
  ```

- 操纵节点

  DOM 又提供了一些操纵节点的方法。最常用的方法是**appendChild()**，用于在 childNodes 列表末尾添加节点

  ```javascript
  let returnedNode = someNode.appendChild(newNode); 
  alert(returnedNode == newNode); // true 
  alert(someNode.lastChild == newNode); // true
  ```

  如果把文档中已经存在的节点传给 appendChild()，则这个节点会从之前的位置被转移到新位置。

  ```javascript
  // 假设 someNode 有多个子节点
  let returnedNode = someNode.appendChild(someNode.firstChild); 
  alert(returnedNode == someNode.firstChild); // false 
  alert(returnedNode == someNode.lastChild); // true
  ```

  如果想把节点放到 childNodes 中的特定位置而不是末尾，则可以使用 **insertBefore()**方法

  这个方法接收两个参数：要插入的节点和参照节点。调用这个方法后，要插入的节点会变成参照节点的

  前一个同胞节点，并被返回

  ```javascript
  // 作为最后一个子节点插入
  returnedNode = someNode.insertBefore(newNode, null); 
  alert(newNode == someNode.lastChild); // true 
  // 作为新的第一个子节点插入
  returnedNode = someNode.insertBefore(newNode, someNode.firstChild); 
  alert(returnedNode == newNode); // true 
  alert(newNode == someNode.firstChild); // true 
  // 插入最后一个子节点前面
  returnedNode = someNode.insertBefore(newNode, someNode.lastChild); 
  alert(newNode == someNode.childNodes[someNode.childNodes.length - 2]); // true
  ```

  **replaceChild()**方法接收两个参数：要插入的节点和要替换的节点。

  ```javascript
  // 替换第一个子节点
  let returnedNode = someNode.replaceChild(newNode, someNode.firstChild); 
  // 替换最后一个子节点
  returnedNode = someNode.replaceChild(newNode, someNode.lastChild);
  ```

- 其他方法

  **cloneNode()**

  ```javascript
  <ul> 
   <li>item 1</li> 
   <li>item 2</li> 
   <li>item 3</li> 
  </ul> 
  // 如果myList保存着对这个<ul>元素的引用，则下列代码展示了使用cloneNode()方法的两种方式：
  let deepList = myList.cloneNode(true); 
  alert(deepList.childNodes.length); // 3（IE9 之前的版本）或 7（其他浏览器）
  let shallowList = myList.cloneNode(false); 
  alert(shallowList.childNodes.length); // 0
  ```

### 1 **Document** 类型

Document 类型是 JavaScript 中表示文档节点的类型。在浏览器中，文档对象 document 是

HTMLDocument 的实例（HTMLDocument 继承 Document），表示整个 HTML 页面

Document 类型的节点有以下特征：

 nodeType 等于 9；

 nodeName 值为"#document"；

 nodeValue 值为 null；

 parentNode 值为 null；

 ownerDocument 值为 null；

 子节点可以是 DocumentType（最多一个）、Element（最多一个）、ProcessingInstruction

或 Comment 类型。

- 文档子节点

  虽然 DOM 规范规定 Document 节点的子节点可以是 DocumentType、Element、Processing

  Instruction 或 Comment，但也提供了两个访问子节点的快捷方式

  第一个是 **documentElement** 属性，始终指向 HTML 页面中的`<html>`元素

  ```javascript
  <html> 
   <body> 
   </body> 
  </html> 
  // 浏览器解析完这个页面之后，文档只有一个子节点，即<html>元素。这个元素既可以通过
  // documentElement 属性获取，也可以通过 childNodes 列表访问，如下所示：
  let html = document.documentElement; // 取得对<html>的引用
  let body = document.body; // 取得对<body>的引用
  ```

- 文档信息

  第一个属性是 title，包含`<title>`元素中的文本，通常显示在浏览器窗口或标签页的标题栏。修改 title 属性并不会改变`<title>`元素

  ```javascript
  // 读取文档标题
  let originalTitle = document.title; 
  // 修改文档标题
  document.title = "New page title";
  ```

  **URL、domain 和 referrer**。

  其中，URL 包含当前页面的完整 URL（地址栏中的 URL），domain 包含页面的域名，而 referrer 包含链接到当前页面的那个页面的 URL。

  ```javascript
  // 取得完整的 URL 
  let url = document.URL; 
  // 取得域名
  let domain = document.domain; 
  // 取得来源
  let referrer = document.referrer;
  ```

- 定位元素

  **getElementById(**)和 **getElementsByTagName(**)就是 Document 类型提供的两个方法

  ```javascript
  <div id="myDiv">Some text</div> 
  // 可以使用如下代码取得这个元素：
  let div = document.getElementById("myDiv"); // 取得对这个<div>元素的引用
  ```

  ```javascript
  let images = document.getElementsByTagName("img");
  ```

  **getElementsByName()**最常用于单选按钮，因为同一字段的单选按钮必须具有相同的 name 属性才能确保把正确的值发送给服务器

  ```html
  <fieldset> 
   <legend>Which color do you prefer?</legend> 
   <ul> 
   <li> 
   <input type="radio" value="red" name="color" id="colorRed"> 
   <label for="colorRed">Red</label> 
   </li> 
   <li> 
   <input type="radio" value="green" name="color" id="colorGreen"> 
   <label for="colorGreen">Green</label> 
   </li> 
   <li> 
   <input type="radio" value="blue" name="color" id="colorBlue"> 
   <label for="colorBlue">Blue</label> 
   </li> 
   </ul> 
  </fieldset>
  ```

  ```javascript
  let radios = document.getElementsByName("color");
  ```

- 特殊集合

  - document.anchors 包含文档中所有带 name 属性的`<a>`元素。

  - document.forms 包含文档中所有`<form>`元素（与 document.getElementsByTagName ("form")

  返回的结果相同）。

  - document.images 包含文档中所有`<img>`元素（与 document.getElementsByTagName ("img")

  返回的结果相同）。

  - document.links 包含文档中所有带 href 属性的`<a>`元素。

- 文档写入

  document 对象有一个古老的能力，即向网页输出流中写入内容。这个能力对应 4 个方法：write()、

  writeln()、open()和 close()。

  ```html
  <html> 
  <head> 
   <title>document.write() Example</title> 
  </head> 
  <body> 
   <p>The current date and time is: 
   <script type="text/javascript"> 
   document.write("<strong>" + (new Date()).toString() + "</strong>"); 
   </script> 
  </p> 
  </body> 
  </html>
  ```

### 1 **Element** 类型

除了Document 类型，Element 类型就是Web开发中最常用的类型了。Element 表示XML或HTML元素，对外暴

露出访问元素标签名、子节点和属性的能力。Element 类型的节点具有以下特征：

nodeType 等于 1；

 nodeName 值为元素的标签名；

 nodeValue 值为 null；

 parentNode 值为 Document 或 Element 对象；

 子节点可以是 Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference 类型。

可以通过 nodeName 或 tagName 属性来获取元素的标签名。

```javascript
<div id="myDiv"></div> 
// 可以像这样取得这个元素的标签名：
let div = document.getElementById("myDiv"); 
alert(div.tagName); // "DIV" 
alert(div.tagName == div.nodeName); // true
```

- HTML 元素

  所有 HTML 元素都通过 HTMLElement 类型表示，包括其直接实例和间接实例。另外，HTMLElement

  直接继承 Element 并增加了一些属性。它们是所有 HTML 元素上都有的标准属性：

   id，元素在文档中的唯一标识符；

   title，包含元素的额外信息，通常以提示条形式展示；

   lang，元素内容的语言代码（很少用）；

   dir，语言的书写方向（"ltr"表示从左到右，"rtl"表示从右到左，同样很少用）；

   className，相当于 class 属性，用于指定元素的 CSS 类（因为 class 是 ECMAScript 关键字，

  所以不能直接用这个名字）。

  ```javascript
  <div id="myDiv" class="bd" title="Body text" lang="en" dir="ltr"></div> 
  ```

  这个元素中的所有属性都可以使用下列 JavaScript 代码读取

  ```javascript
  let div = document.getElementById("myDiv"); 
  alert(div.id); // "myDiv" 
  alert(div.className); // "bd" 
  alert(div.title); // "Body text" 
  alert(div.lang); // "en" 
  alert(div.dir); // "ltr"
  ```

- 取得属性

  > getAttribute()、setAttribute()和 removeAttribute()

  ```javascript
  let div = document.getElementById("myDiv"); 
  alert(div.getAttribute("id")); // "myDiv" 
  alert(div.getAttribute("class")); // "bd" 
  alert(div.getAttribute("title")); // "Body text" 
  alert(div.getAttribute("lang")); // "en" 
  alert(div.getAttribute("dir")); // "ltr"
  ```

- 设置属性

  ```javascript
  div.setAttribute("id", "someOtherId"); 
  div.setAttribute("class", "ft"); 
  div.setAttribute("title", "Some other text"); 
  div.setAttribute("lang","fr"); 
  div.setAttribute("dir", "rtl");
  // 或者
  div.id = "someOtherId"; 
  div.align = "left";

- 删除属性

  ```javascript
  div.removeAttribute("class");
  ```

- **attributes** 属性

  Element 类型是唯一使用 attributes 属性的 DOM 节点类型。attributes 属性包含一个NamedNodeMap 实例，是一个类似 NodeList 的“实时”集合。元素的每个属性都表示为一个 Attr 节点，并保存在这个 NamedNodeMap 对象中。NamedNodeMap 对象包含下列方法：

  getNamedItem(*name*)，返回 nodeName 属性等于 *name* 的节点；

   removeNamedItem(*name*)，删除 nodeName 属性等于 *name* 的节点；

   setNamedItem(*node*)，向列表中添加 *node* 节点，以其 nodeName 为索引；

   item(*pos*)，返回索引位置 *pos* 处的节点。

​ attributes 属性中的每个节点的 nodeName 是对应属性的名字，nodeValue 是属性的值。比如，

​ 要取得元素 id 属性的值

```javascript
let id = element.attributes.getNamedItem("id").nodeValue; 
// 下面是使用中括号访问属性的简写形式：
let id = element.attributes["id"].nodeValue;
```

- 创建元素

  document.createElement()

  ```javascript
  let div = document.createElement("div");
  ```

  使用 createElement()方法创建新元素的同时也会将其 ownerDocument 属性设置为 document。

  此时，可以再为其添加属性、添加更多子元素

  ```javascript
  div.id = "myNewDiv"; 
  div.className = "box";

- 元素后代

  childNodes属性包含元素所有的子节点

  ```html
  <ul id="myList"> 
   <li>Item 1</li> 
   <li>Item 2</li> 
   <li>Item 3</li> 
  </ul> 
  ```

  ```javascript
  for (let i = 0, len = element.childNodes.length; i < len; ++i) { 
   if (element.childNodes[i].nodeType == 1) { 
   // 执行某个操作
   } 
  }
  ```

  以上代码会遍历某个元素的子节点，并且只在 nodeType 等于 1（即 Element 节点）时执行某个操作。

### 1 **Text** 类型

Text 节点由 Text 类型表示，包含按字面解释的纯文本，也可能包含转义后的 HTML 字符，但不含 HTML 代码。Text 类型的节点具有以下特征：

 nodeType 等于 3；

 nodeName 值为"#text"；

 nodeValue 值为节点中包含的文本；

 parentNode 值为 Element 对象；

 不支持子节点。

文本节点暴露了以下操作文本的方法：

 appendData(*text*)，向节点末尾添加文本 *text*；

 deleteData(*offset, count*)，从位置 *offset* 开始删除 *count* 个字符；

 insertData(*offset, text*)，在位置 *offset* 插入 *text*；

 replaceData(*offset, count, text*)，用 *text* 替换从位置 *offset* 到 *offset* *+* *count* 的文本；

 splitText(*offset*)，在位置 *offset* 将当前文本节点拆分为两个文本节点；

 substringData(*offset, count*)，提取从位置 *offset* 到 *offset* *+* *count* 的文本。

- 创建文本节点

  ```javascript
  let textNode = document.createTextNode("<strong>Hello</strong> world!");
  ```

  以下代码创建了一个`<div>`元素并给它添加了一段文本消息

  ```javascript
  let element = document.createElement("div"); 
  element.className = "message"; 
  let textNode = document.createTextNode("Hello world!"); 
  element.appendChild(textNode); 
  document.body.appendChild(element);
  ```

- 规范化文本节点（合并文本节点）

  在包含两个或多个相邻文本节点的父节点上调用 **normalize()**时，所有同胞文本节点会被合并为一个文本节点，这个文本节点的 nodeValue 就等于之前所有同胞节点 nodeValue 拼接在一起得到的字符串。

  ```javascript
  let element = document.createElement("div"); 
  element.className = "message"; 
  let textNode = document.createTextNode("Hello world!"); 
  element.appendChild(textNode); 
  let anotherTextNode = document.createTextNode("Yippee!"); 
  element.appendChild(anotherTextNode); 
  document.body.appendChild(element); 
  alert(element.childNodes.length); // 2 
  element.normalize(); 
  alert(element.childNodes.length); // 1 
  alert(element.firstChild.nodeValue); // "Hello world!Yippee!"
  ```

- 拆分文本节点

  ```javascript
  let element = document.createElement("div"); 
  element.className = "message"; 
  let textNode = document.createTextNode("Hello world!"); 
  element.appendChild(textNode); 
  document.body.appendChild(element); 
  let newNode = element.firstChild.splitText(5); 
  alert(element.firstChild.nodeValue); // "Hello" 
  alert(newNode.nodeValue); // " world!" 
  alert(element.childNodes.length); // 2

### 1 **Comment** 类型

DOM 中的注释通过 Comment 类型表示。Comment 类型的节点具有以下特征：

 nodeType 等于 8；

 nodeName 值为"#comment"；

 nodeValue 值为注释的内容；

 parentNode 值为 Document 或 Element 对象；

 不支持子节点。

```javascript
<div id="myDiv"><!-- A comment --></div>
```

### 1 **CDATASection** 类型

CDATASection 类型表示 XML 中特有的 CDATA 区块。CDATASection 类型继承 Text 类型，因此拥有包括 splitText()在内的所有字符串操作方法。CDATASection 类型的节点具有以下特征：

 nodeType 等于 4；

 nodeName 值为"#cdata-section"；

 nodeValue 值为 CDATA 区块的内容；

 parentNode 值为 Document 或 Element 对象；

 不支持子节点。

```javascript
<div id="myDiv"><![CDATA[This is some content.]]></div>
```

### 1 **DocumentType** 类型

DocumentType 类型的节点包含文档的文档类型（doctype）信息，具有以下特征：

 nodeType 等于 10；

 nodeName 值为文档类型的名称；

 nodeValue 值为 null；

 parentNode 值为 Document 对象；

 不支持子节点。

```javascript
<!DOCTYPE HTML PUBLIC "-// W3C// DTD HTML 4.01// EN" 
 "http:// www.w3.org/TR/html4/strict.dtd"> 
// 对于这个文档类型，name 属性的值是"html"：
alert(document.doctype.name); // "html
```

### 1 **DocumentFragment** 类型

在所有节点类型中，DocumentFragment 类型是唯一一个在标记中没有对应表示的类型。DOM 将文档片段定义为“轻量级”文档，能够**包含和操作节点**，却**没有完整文档那样额外的消耗**。

DocumentFragment 节点具有以下特征：

 nodeType 等于 11；

 nodeName 值为"#document-fragment"；

 nodeValue 值为 null；

 parentNode 值为 null；

 子节点可以是 Element、ProcessingInstruction、Comment、Text、CDATASection 或

EntityReference。

假设想给这个`<ul>`元素添加 3 个列表项。后一次性将它们添加到了`<ul>`元素

```javascript
let fragment = document.createDocumentFragment(); 
let ul = document.getElementById("myList"); 
for (let i = 0; i < 3; ++i) { 
 let li = document.createElement("li"); 
 li.appendChild(document.createTextNode(`Item ${i + 1}`)); 
 fragment.appendChild(li); 
} 
ul.appendChild(fragment);
```

### 1 **Attr** 类型

元素数据在 DOM 中通过 Attr 类型表示。Attr 类型构造函数和原型在所有浏览器中都可以直接访

问。技术上讲，属性是存在于元素 attributes 属性中的节点。Attr 节点具有以下特征：

 nodeType 等于 2；

 nodeName 值为属性名；

 nodeValue 值为属性值；

 parentNode 值为 null；

 在 HTML 中不支持子节点；

 在 XML 中子节点可以是 Text 或 EntityReference。

```javascript
let attr = document.createAttribute("align"); 
attr.value = "left"; 
element.setAttributeNode(attr); 
alert(element.attributes["align"].value); // "left" 
alert(element.getAttributeNode("align").value); // "left" 
alert(element.getAttribute("align")); // "left"
```

## 1 DOM 编程

### 1. 动态脚本

```javascript
// 动态加载外部文件很容易实现，比如下面的<script>元素：
<script src="foo.js"></script> 
// 可以像这样通过 DOM 编程创建这个节点：
let script = document.createElement("script"); 
script.src = "foo.js"; 
document.body.appendChild(script);
```

这个过程可以抽象为一个函数

```javascript
function loadScript(url) { 
 let script = document.createElement("script"); 
 script.src = url; 
 document.body.appendChild(script); 
}
```

另一个动态插入 JavaScript 的方式是嵌入源代码

```javascript
<script> 
 function sayHi() { 
 alert("hi"); 
 } 
</script>
```

```javascript
var script = document.createElement("script"); 
script.text = "function sayHi(){alert('hi');}"; 
document.body.appendChild(script);
```

### 1. 动态样式

```javascript
// 来看下面这个典型的<link>元素：
<link rel="stylesheet" type="text/css" href="styles.css"> 
// 这个元素很容易使用 DOM 编程创建出来：
let link = document.createElement("link"); 
link.rel = "stylesheet"; 
link.type = "text/css"; 
link.href = "styles.css"; 
let head = document.getElementsByTagName("head")[0]; 
head.appendChild(link);
```

```javascript
<style type="text/css"> 
body { 
 background-color: red; 
} 
</style> 
// 逻辑上，下列 DOM 代码会有同样的效果：
let style = document.createElement("style"); 
style.type = "text/css"; 
style.appendChild(document.createTextNode("body{background-color:red}")); 
let head = document.getElementsByTagName("head")[0]; 
head.appendChild(style);
```

## 1. 操作表格

```html
<table border="1" width="100%"> 
 <tbody> 
 <tr> 
 <td>Cell 1,1</td> 
 <td>Cell </td> 
 </tr> 
 <tr> 
 <td>Cell 1,2</td> 
 <td>Cell </td> 
 </tr> 
 </tbody> 
</table>
```

```javascript
// 创建表格
let table = document.createElement("table"); 
table.border = 1; 
table.width = "100%"; 
// 创建表体
let tbody = document.createElement("tbody"); 
table.appendChild(tbody); 
// 创建第一行
let row1 = document.createElement("tr"); 
tbody.appendChild(row1); 
let cell1_1 = document.createElement("td"); 
cell1_1.appendChild(document.createTextNode("Cell 1,1")); 
row1.appendChild(cell1_1); 
let cell = document.createElement("td"); 
cell.appendChild(document.createTextNode("Cell ")); 
row1.appendChild(cell); 
// 创建第二行
let row2 = document.createElement("tr"); 
tbody.appendChild(row2); 
let cell1_2 = document.createElement("td"); 
cell1_2.appendChild(document.createTextNode("Cell 1,2")); 
row2.appendChild(cell1_2); 
let cell= document.createElement("td"); 
cell.appendChild(document.createTextNode("Cell ")); 
row2.appendChild(cell); 
// 把表格添加到文档主体
document.body.appendChild(table);
```

HTML DOM 给`<table>`、`<tbody>`和`<tr>`

元素添加了一些属性和方法。

`<table>`元素添加了以下属性和方法：

 caption，指向`<caption>`元素的指针（如果存在）；

 tBodies，包含`<tbody>`元素的 HTMLCollection；

 tFoot，指向`<tfoot>`元素（如果存在）；

 tHead，指向`<thead>`元素（如果存在）；

 rows，包含表示所有行的 HTMLCollection；

 createTHead()，创建`<thead>`元素，放到表格中，返回引用；

 createTFoot()，创建`<tfoot>`元素，放到表格中，返回引用；

 createCaption()，创建`<caption>`元素，放到表格中，返回引用；

 deleteTHead()，删除`<thead>`元素；

 deleteTFoot()，删除`<tfoot>`元素；

 deleteCaption()，删除`<caption>`元素；

 deleteRow(*pos*)，删除给定位置的行；

 insertRow(*pos*)，在行集合中给定位置插入一行。

`<tbody>`元素添加了以下属性和方法：

 rows，包含`<tbody>`元素中所有行的 HTMLCollection；

​  deleteRow(*pos*)，删除给定位置的行；

​  insertRow(*pos*)，在行集合中给定位置插入一行，返回该行的引用。

​ `<tr>`元素添加了以下属性和方法：

​  cells，包含`<tr>`元素所有表元的 HTMLCollection；

​  deleteCell(*pos*)，删除给定位置的表元；

​  insertCell(*pos*)，在表元集合给定位置插入一个表元，返回该表元的引用。

### 1. 使用 **NodeList**

理解 NodeList 对象和相关的 NamedNodeMap、HTMLCollection，是理解 DOM 编程的关键。**NamedNodeMap是getElementByname返回的节点集合  是根据name属性查找的节点**

NodeList 就是基于 DOM 文档的实时查询。

下面的代码会导致无穷循环：

```javascript
let divs = document.getElementsByTagName("div"); 
for (let i = 0; i < divs.length; ++i){ 
 let div = document.createElement("div"); 
 document.body.appendChild(div); 
}
```

**第一行取得了包含文档中所有`<div>`元素的 HTMLCollection**

任何时候要迭代 NodeList，最好再初始化一个变量保存当时查询时的长度，然后用循环变量与这

个变量进行比较，如下所示

```javascript
let divs = document.getElementsByTagName("div"); 
for (let i = 0, len = divs.length; i < len; ++i) { 
 let div = document.createElement("div"); 
 document.body.appendChild(div); 
}
```

一般来说，最好限制操作 NodeList 的次数。因为每次查询都会搜索整个文档，所以最好把查询到

的 NodeList 缓存起来

### 1. NodeList和HTMLCollection区别

在 JavaScript 中，**HTMLCollection** 和 **NodeList** 都是用于表示一组 DOM 元素的集合，但它们有一些显著的区别。

- HTMLCollection

**HTMLCollection** 是一个动态集合，表示一个**包含了元素的集合**。它的元素顺序为文档流中的顺序。HTMLCollection 提供了一些属性和方法来选择集合中的元素，例如 *item(index)* 和 *length*

```javascript
const htmlCollection = document.getElementsByTagName('body');
console.log(htmlCollection.item(0)); // <body>...</body>
console.log(htmlCollection.length); // 1
```

- NodeList

**NodeList** 是一个静态集合，表示**一组节点**。NodeList 可以通过多种方法得到，例如 ***Node.childNodes*** 和 ***document.querySelectorAll()***。NodeList 提供了一些方法来遍历和操作集合中的节点，例如 *forEach()*、*keys()*、*values()* 和 *entries()*

```javascript
const nodeList = document.querySelectorAll('body');
console.log(nodeList.item(0)); // <body>...</body>
console.log(nodeList.length); // 1
nodeList.forEach(item => console.log(item)); // <body>...</body>
for (let key of nodeList.keys()) {
console.log(key); // 0
}
for (let value of nodeList.values()) {
console.log(value); // <body>...</body>
}
for (let entry of nodeList.entries()) {
console.log(entry); // [0, <body>...</body>]
}
```

主要区别

1. **动态与静态**：HTMLCollection 是动态集合，DOM 树发生变化时，HTMLCollection 也会随之变化。而 NodeList 是静态集合，不受 DOM 树变化的影响。
2. **节点类型**：NodeList 可以包含各种类型的节点，包括元素节点、属性节点和文本节点。而 HTMLCollection 只能包含元素节点[3](https://www.bookstack.cn/read/javascript-tutorial/docs-dom-nodelist.md)。
3. **获取方式**：HTMLCollection 的元素可以通过 name、id 或 index 索引来获取。而 NodeList 只能通过 index 索引来获取[1](https://blog.csdn.net/m0_57033755/article/details/130902)[2](https://juejin.cn/post/6977000738007)。
4. **数组方法**：HTMLCollection 和 NodeList 本身无法使用数组的方法（如 *pop()*、*push()* 或 *join()*）。需要将它们转换为数组后才能使用这些方法

选择器方法的区别：

*querySelectorAll()* *getElementsByClassName()* *Node.childNodes*返回 NodeList 集合，而 *getElementsByTagName* 返回 HTMLCollection 集合

## 1 **MutationObserver** 接口

不久前添加到 DOM 规范中的 MutationObserver 接口，可以在 DOM 被修改时异步执行回调

### 1 基本用法

- **observe()**方法

  下面的代码会创建一个观察者（observer）并配置它观察`<body>`元素上的属性变化

  ```javascript
  let observer = new MutationObserver(() => console.log('<body> attributes changed')); 
  observer.observe(document.body, { attributes: true });
  ```

- 回调与 **MutationRecord**

  每个回调都会收到一个 MutationRecord 实例的数组。MutationRecord 实例包含的信息包括发生了什么变化，以及 DOM 的哪一部分受到了影响。所以每次执行回调都会传入一个包含按顺序入队的 MutationRecord 实例的数组。

  ```javascript
  let observer = new MutationObserver( 
   (mutationRecords) => console.log(mutationRecords));
  observer.observe(document.body, { attributes: true }); 
  document.body.setAttribute('foo', 'bar'); 
  // [ 
  // { 
  // addedNodes: NodeList [], 
  // attributeName: "foo", 
  // attributeNamespace: null, 
  // nextSibling: null, 
  // oldValue: null, 
  // previousSibling: null 
  // removedNodes: NodeList [], 
  // target: body 
  // type: "attributes" 
  // } 
  // ]
  ```
  
- **disconnect()**方法

  默认情况下，只要被观察的元素不被垃圾回收，MutationObserver 的回调就会响应 DOM 变化事

  件，从而被执行。要**提前终止执行回调**，可以调用 disconnect()方法。

  ```javascript
  let observer = new MutationObserver(() => console.log('<body> attributes changed')); 
  observer.observe(document.body, { attributes: true }); 
  document.body.className = 'foo'; 
  observer.disconnect(); 
  document.body.className = 'bar'; 
  //（没有日志输出）
  ```

## 2. DOM扩展

### Selectors API

- #### **querySelector()**

> querySelector()方法接收 CSS 选择符参数，返回匹配该模式的第一个后代元素，如果没有匹配
>
> 项则返回 null

```javascript
// 取得<body>元素
let body = document.querySelector("body"); 
// 取得 ID 为"myDiv"的元素
let myDiv = document.querySelector("#myDiv");
```

- **querySelectorAll()**:

> querySelectorAll()方法跟 querySelector()一样，也接收一个用于查询的参数，但它会返回
>
> 所有匹配的节点，而不止一个

```javascript
// 取得 ID 为"myDiv"的<div>元素中的所有<em>元素
let ems = document.getElementById("myDiv").querySelectorAll("em"); 
// 取得所有类名中包含"selected"的元素
let selecteds = document.querySelectorAll(".selected");
```

- **matches()**

```javascript
if (document.body.matches("body.page1")){ 
 // true 
} 
// 使用这个方法可以方便地检测某个元素会不会被 querySelector()或 querySelectorAll()方
// 法返回
```

### 元素遍历

childElementCount，返回子元素数量（不包含文本节点和注释）；

firstElementChild，指向第一个 Element 类型的子元素；

lastElementChild，指向最后一个 Element 类型的子元素；

previousElementSibling ，指向前一个 Element 类型的同胞元素

nextElementSibling，指向后一个 Element 类型的同胞元素

### HTML5

#### CSS 类扩展

- **getElementsByClassName()**

​ getElementsByClassName()方法接收一个参数，即包含一个或多个类名的字符串，返回类名中

包含相应类的元素的 NodeList

- #### **classList** 属性

要操作类名，可以通过 className 属性实现添加、删除和替换。

```javascript
<div class="bd user disabled">...</div>
// 要删除"user"类
let targetClass = "user"; 
// 把类名拆成数组
let classNames = div.className.split(/\s+/); 
// 找到要删除类名的索引
let idx = classNames.indexOf(targetClass); 
// 如果有则删除
if (idx > -1) { 
 classNames.splice(i,1); 
} 
// 重新设置类名
div.className = classNames.join(" ")
```

#### 焦点管理

```javascript
let button = document.getElementById("myButton"); 
button.focus(); 
console.log(document.activeElement === button); // true
```

#### **HTMLDocument** 扩展

- **readyState** 属性

  document.readyState 属性有两个可能的值：

  loading，表示文档正在加载；

  complete，表示文档加载完成

​ 最好是把 document.readState 当成一个指示器，以判断文档是否加载完毕

- **compatMode** 属性

​ 自从 IE6 提供了以标准或混杂模式渲染页面的能力之后，检测页面渲染模式成为一个必要的需求

​ 标准模式下 document.compatMode 的值是"CSS1Compat"，而在混杂模式下，

​ document.compatMode 的值是"BackCompat":

```javascript
if (document.compatMode == "CSS1Compat"){ 
 console.log("Standards mode"); 
} else { 
 console.log("Quirks mode"); 
}
```

- **head** 属性

​ 作为对 document.body（指向文档的`<body>`元素）的补充，HTML5 增加了 document.head 属

性，指向文档的`<head>`元素

```javascript
let head = document.head;
```

#### 插入标记

相比先创建一堆节点，再把它们以正确的顺序连接起来，直接插入一个 HTML 字符串要简单

- **innerHTML** 属性

  因为所赋的值默认为 HTML，所以其中的所有标签都会以浏览器处理 HTML 的方式转换为元素

```javascript
<div id="content"> 
 <p>This is a <strong>paragraph</strong> with a list following it.</p> 
 <ul> 
 <li>Item 1</li> 
 <li>Item 2</li> 
 <li>Item 3</li> 
 </ul> 
</div> 
// 对于这里的<div>元素而言，其 innerHTML 属性会返回以下字符串：
<p>This is a <strong>paragraph</strong> with a list following it.</p> 
<ul> 
 <li>Item 1</li> 
 <li>Item 2</li> 
 <li>Item 3</li> 
</ul>
```

```javascript
div.innerHTML = "Hello & welcome, <b>\"reader\"!</b>";
// 这个操作的结果相当于：
<div id="content">Hello &amp; welcome, <b>&quot;reader&quot;!</b></div>
```

- **outerHTML** 属性

​ 读取 outerHTML 属性时，会返回调用它的元素（及所有后代元素）的 HTML 字符串。

​ 在写入outerHTML 属性时，调用它的元素会被传入的 HTML 字符串经解释之后生成的 DOM 子树取代

```javascript
<div id="content"> 
 <p>This is a <strong>paragraph</strong> with a list following it.</p> 
 <ul> 
 <li>Item 1</li> 
 <li>Item 2</li> 
 <li>Item 3</li> 
 </ul> 
</div>
// 在这个<div>元素上调用 outerHTML 会返回相同的字符串，包括<div>本身
```

```javascript
// 如果使用 outerHTML 设置 HTML，比如：
div.outerHTML = "<p>This is a paragraph.</p>"; 
// 则会得到与执行以下脚本相同的结果：
let p = document.createElement("p"); 
p.appendChild(document.createTextNode("This is a paragraph.")); 
div.parentNode.replaceChild(p, div); 
// 新的<p>元素会取代 DOM 树中原来的<div>元素。
```

**scrollIntoView()**:

scrollIntoView()方法存在于所有 HTML 元素上，可以滚动浏览器窗口或容器元素以便包含元

素进入视口。

`这个方法可以用来在页面上发生某个事件时引起用户关注。把焦点设置到一个元素上也会导致浏览`

`器将元素滚动到可见位置`

- alignToTop 是一个布尔值。

  true：窗口滚动后元素的顶部与视口顶部对齐。

  false：窗口滚动后元素的底部与视口底部对齐。

- scrollIntoViewOptions 是一个选项对象。

  behavior：定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。

  block：定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为 "start"。

  inline：定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为 "nearest"。

- 不传参数等同于 alignToTop 为 true。

```javascript
// 确保元素可见
document.forms[0].scrollIntoView(); 
// 同上
document.forms[0].scrollIntoView(true); 
document.forms[0].scrollIntoView({block: 'start'}); 
// 尝试将元素平滑地滚入视口
document.forms[0].scrollIntoView({behavior: 'smooth', block: 'start'});
```

### 专有扩展

**children** 属性

```javascript
let childCount = element.children.length; 
let firstChild = element.children[0];
```

**contains()**方法

DOM 编程中经常需要确定一个元素是不是另一个元素的后代。contains()方法应该在要搜索的祖先元素上调

用，参数是待确定的目标节点。

```java
console.log(document.documentElement.contains(document.body)); // true
```

**插入标记**:

- **innerText** 属性

  对比innerHtml，innerText不会解析文本内的标签

  ```javascript
  // 下面再看一个使用 innerText 设置<div>元素内容的例子：
  div.innerText = "Hello world!"; 
  // 执行这行代码后，HTML 页面中的这个<div>元素实际上会变成这个样子：
  <div id="content">Hello world!</div>
  ```

- **outerText** 属性

  outerText 与 innerText 是类似的，只不过作用范围包含调用它的节点。

  ```javascript
  div.outerText = "Hello world!"; 
  // 这行代码的执行效果就相当于以下两行代码：
  let text = document.createTextNode("Hello world!"); 
  div.parentNode.replaceChild(text, div);
  ```
