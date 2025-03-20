# JavaScript 学习重点总结

## 1. DOM

### 1.1 节点层级

document 节点表示每个文档的根节点。在这里，根节点的唯一子节点是`<html>`元素，我们称之

为文档元素（documentElement）

#### 1.1.1 **Node** 类型

DOM Level 1 描述了名为 Node 的接口，这个接口是所有 DOM 节点类型都必须实现的。Node 接口

在 JavaScript中被实现为 Node 类型

每个节点都有 nodeType 属性，表示该节点的类型。节点类型由定义在 Node 类型上的 12 个数值

常量表示：

 Node.ELEMENT_NODE（1）

 Node.ATTRIBUTE_NODE（2）

 Node.TEXT_NODE（3）

 Node.CDATA_SECTION_NODE（4） 14.1 节点层级 403

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

#### 1.1.2 **Document** 类型

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

#### 1.1.3 **Element** 类型

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

#### 1.1.4 **Text** 类型

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

#### 1.1.5 **Comment** 类型

DOM 中的注释通过 Comment 类型表示。Comment 类型的节点具有以下特征：

 nodeType 等于 8；

 nodeName 值为"#comment"；

 nodeValue 值为注释的内容；

 parentNode 值为 Document 或 Element 对象；

 不支持子节点。

```javascript
<div id="myDiv"><!-- A comment --></div>
```

#### 1.1.6 **CDATASection** 类型

CDATASection 类型表示 XML 中特有的 CDATA 区块。CDATASection 类型继承 Text 类型，因此拥有包括 splitText()在内的所有字符串操作方法。CDATASection 类型的节点具有以下特征：

 nodeType 等于 4；

 nodeName 值为"#cdata-section"；

 nodeValue 值为 CDATA 区块的内容；

 parentNode 值为 Document 或 Element 对象；

 不支持子节点。

```javascript
<div id="myDiv"><![CDATA[This is some content.]]></div>
```

#### 1.1.7 **DocumentType** 类型

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

#### 1.1.8 **DocumentFragment** 类型

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

#### 1.1.9 **Attr** 类型

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

### 1.2 DOM 编程

#### 1.2.1 动态脚本

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

#### 1.2.2 动态样式

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

#### 1.2.3 操作表格

```html
<table border="1" width="100%"> 
 <tbody> 
 <tr> 
 <td>Cell 1,1</td> 
 <td>Cell 2,1</td> 
 </tr> 
 <tr> 
 <td>Cell 1,2</td> 
 <td>Cell 2,2</td> 
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
let cell2_1 = document.createElement("td"); 
cell2_1.appendChild(document.createTextNode("Cell 2,1")); 
row1.appendChild(cell2_1); 
// 创建第二行
let row2 = document.createElement("tr"); 
tbody.appendChild(row2); 
let cell1_2 = document.createElement("td"); 
cell1_2.appendChild(document.createTextNode("Cell 1,2")); 
row2.appendChild(cell1_2); 
let cell2_2= document.createElement("td"); 
cell2_2.appendChild(document.createTextNode("Cell 2,2")); 
row2.appendChild(cell2_2); 
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

#### 1.2.4 使用 **NodeList**

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

#### 1.2.5 NodeList和HTMLCollection区别

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
3. **获取方式**：HTMLCollection 的元素可以通过 name、id 或 index 索引来获取。而 NodeList 只能通过 index 索引来获取[1](https://blog.csdn.net/m0_57033755/article/details/132040902)[2](https://juejin.cn/post/6977000721938022407)。
4. **数组方法**：HTMLCollection 和 NodeList 本身无法使用数组的方法（如 *pop()*、*push()* 或 *join()*）。需要将它们转换为数组后才能使用这些方法

选择器方法的区别：

*querySelectorAll()* *getElementsByClassName()* *Node.childNodes*返回 NodeList 集合，而 *getElementsByTagName* 返回 HTMLCollection 集合

### 1.3 **MutationObserver** 接口

不久前添加到 DOM 规范中的 MutationObserver 接口，可以在 DOM 被修改时异步执行回调

#### 1.3.1 基本用法

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

### 2.1 Selectors API

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

- #### **querySelectorAll()**

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

### 2.2 元素遍历

childElementCount，返回子元素数量（不包含文本节点和注释）；

firstElementChild，指向第一个 Element 类型的子元素；

lastElementChild，指向最后一个 Element 类型的子元素；

previousElementSibling ，指向前一个 Element 类型的同胞元素

nextElementSibling，指向后一个 Element 类型的同胞元素

### 2.3 HTML5

#### 2.3.1 CSS 类扩展

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

#### 2.3.2 焦点管理

```javascript
let button = document.getElementById("myButton"); 
button.focus(); 
console.log(document.activeElement === button); // true
```

#### 2.3.3 **HTMLDocument** 扩展

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

#### 2.3.4 插入标记

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

#### 2.3.5 **scrollIntoView()**

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

### 2.4 专有扩展

#### 2.4.1 **children** 属性

```javascript
let childCount = element.children.length; 
let firstChild = element.children[0];
```

#### 2.4.2 **contains()**方法

DOM 编程中经常需要确定一个元素是不是另一个元素的后代。contains()方法应该在要搜索的祖先元素上调

用，参数是待确定的目标节点。

```java
console.log(document.documentElement.contains(document.body)); // true
```

#### 2.4.3 插入标记

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

## 3. BOM

### 3.1 **window** 对象

BOM 的核心是 window 对象，表示浏览器的实例。

#### 3.1.1 **Global** 作用域

因为 window 对象被复用为 ECMAScript 的 Global 对象，所以通过 var 声明的所有全局变量和函

数都会变成 window 对象的属性和方法

如果在这里使用 let 或 const 替代 var，则不会把变量添加给全局对象

#### 3.1.2 窗口位置与像素比

可以使用 moveTo()和 moveBy()方法移动窗口

// 把窗口移动到左上角

window.moveTo(0,0);

// 把窗口向下移动 100 像素

window.moveBy(0, 100); 12.1 window 对象 363

// 把窗口移动到坐标位置(200, 300)

window.moveTo(200, 300);

// 把窗口向左移动 50 像素

window.moveBy(-50, 0);

#### 3.1.3 窗口大小

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

#### 3.1.4 视口位置

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

#### 3.1.5 导航与打开新窗口

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

#### 3.1.6 定时器

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

#### 3.1.7 系统对话框

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

### 3.2 **location** 对象

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

#### 3.2.1 查询字符串

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

#### 3.2.2 操作地址

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

### 3.3 **navigator** 对象

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

#### 3.3.1 检测插件

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

### 3.4 **screen** 对象

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

### 3.5 **history** 对象

history 对象表示当前窗口首次使用以来用户的导航历史记录。因为 history 是 window 的属性，

所以每个 window 都有自己的 history 对象。

#### 3.5.1 导航

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

#### 3.5.2 历史状态管理

hashchange 会在页面 URL 的散列变化时被触发，开发者可以在此时执行某些操作。而状态管理

API 则可以让开发者改变浏览器 URL 而不会加载新页面。为此，可以使用 history.pushState()方

法。这个方法接收 3 个参数：一个 state 对象、一个新状态的标题和一个（可选的）相对 URL。

```javascript
let stateObject = {foo:"bar"}; 
history.pushState(stateObject, "My title", "baz.html");
```

pushState()方法执行后，状态信息就会被推到历史记录中，浏览器地址栏也会改变以反映新的相对 URL。除了这些变化之外，即使 location.href 返回的是地址栏中的内容，浏览器页不会向服务器发送请求

为 pushState()会创建新的历史记录，所以也会相应地启用“后退”按钮

## 4. 基本引用类型

### 4.1 **Date**

```javascript
let now = new Date();
```

提供了两个辅助方法：**Date.parse()和 Date.UTC(**)。

Date.parse()方法接收一个表示日期的字符串参数，尝试将这个字符串转换为表示该日期的毫秒数。

所有实现都必须支持下列日期格式：

“月/日/年”，如"5/23/2019"；

“月名 日, 年”，如"May 23, 2019"；

“周几 月名 日 年 时:分:秒 时区”，如"Tue May 23 2019 00:00:00 GMT-0700"；

 ISO 8601 扩展格式“YYYY-MM-DDTHH:mm:ss.sssZ”，如 2019-05-23T00:00:00（只适用于

兼容 ES5 的实现）。

```javascript
let someDate = new Date(Date.parse("May 23, 2019"));
// 如果传给 Date.parse()的字符串并不表示日期，则该方法会返回 NaN。如果直接把表示日期的字
// 符串传给 Date 构造函数，那么 Date 会在后台调用 Date.parse()。换句话说，下面这行代码跟前面
// 那行代码是等价的
let someDate = new Date("May 23, 2019")
```

Date.UTC()方法也返回日期的毫秒表示，但使用的是跟 Date.parse()不同的信息来生成这个值。

传给 Date.UTC()的参数是年、零起点月数（1 月是 0，2 月是 1，以此类推）、日（1~31）、时（0~23）、

分、秒和毫秒。只有前两个（年和月）是必需的

```javascript
// GMT 时间 2000 年 1 月 1 日零点
let y2k = new Date(Date.UTC(2000, 0)); 
// GMT 时间 2005 年 5 月 5 日下午 5 点 55 分 55 秒
let allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
```

#### 4.1.1 继承的方法

Date 类型重写了 toLocaleString()、toString()和 valueOf()方法。

Date 类型的 toLocaleString()方法返回与浏览器运行的本地环境一致的日期和时间。这通常意味着格式中包含针对时间的 AM（上午）或 PM（下午），但不包含时区信息

toString()方法通常返回带时区信息的日期和时间，而时间也是以 24 小时制（0~23）表示的。

#### 4.1.2 日期格式化方法

Date 类型有几个专门用于格式化日期的方法，它们都会返回字符串：

 toDateString()显示日期中的周几、月、日、年（格式特定于实现）；

 toTimeString()显示日期中的时、分、秒和时区（格式特定于实现）；

 toLocaleDateString()显示日期中的周几、月、日、年（格式特定于实现和地区）；

 toLocaleTimeString()显示日期中的时、分、秒（格式特定于实现和地区）；

 toUTCString()显示完整的 UTC 日期（格式特定于实现）。

#### 4.1.3 日期/时间组件方法

Date 类型剩下的方法（见下表）直接涉及取得或设置日期值的特定部分。注意表中“UTC 日期”，

指的是没有时区偏移（将日期转换为 GMT）时的日期

|               方 法                | 说 明                                                        |
| :--------------------------------: | ------------------------------------------------------------ |
|             getTime()              | 返回日期的毫秒表示；与 valueOf()相同                         |
|      setTime(*milliseconds*)       | 设置日期的毫秒表示，从而修改整个日期                         |
|           getFullYear()            | 返回 4 位数年（即 2019 而不是 19）                           |
|          getUTCFullYear()          | 返回 UTC 日期的 4 位数年                                     |
|        setFullYear(*year*)         | 设置日期的年（*year* 必须是 4 位数）                         |
|       setUTCFullYear(*year*)       | 设置 UTC 日期的年（*year* 必须是 4 位数）                    |
|             getMonth()             | 返回日期的月（0 表示 1 月，11 表示 12 月）                   |
|           getUTCMonth()            | 返回 UTC 日期的月（0 表示 1 月，11 表示 12 月）              |
|         setMonth(*month*)          | 设置日期的月（*month* 为大于 0 的数值，大于 11 加年）        |
|        setUTCMonth(*month*)        | 设置 UTC 日期的月（*month* 为大于 0 的数值，大于 11 加年）   |
|             getDate()              | 返回日期中的日（1~31）                                       |
|            getUTCDate()            | 返回 UTC 日期中的日（1~31）                                  |
|          setDate(*date*)           | 设置日期中的日（如果 *date* 大于该月天数，则加月）           |
|         setUTCDate(*date*)         | 设置 UTC 日期中的日（如果 *date* 大于该月天数，则加月）      |
|              getDay()              | 返回日期中表示周几的数值（0 表示周日，6 表示周六）           |
|            getUTCDay()             | 返回 UTC 日期中表示周几的数值（0 表示周日，6 表示周六）      |
|             getHours()             | 返回日期中的时（0~23）                                       |
|           getUTCHours()            | 返回 UTC 日期中的时（0~23）                                  |
|         setHours(*hours*)          | 设置日期中的时（如果 *hours* 大于 23，则加日）               |
|        setUTCHours(*hours*)        | 设置 UTC 日期中的时（如果 *hours* 大于 23，则加日）          |
|            getMinutes()            | 返回日期中的分（0~59）                                       |
|          getUTCMinutes()           | 返回 UTC 日期中的分（0~59）                                  |
|       setMinutes(*minutes*)        | 设置日期中的分（如果 *minutes* 大于 59，则加时）             |
|      setUTCMinutes(*minutes*)      | 设置 UTC 日期中的分（如果 *minutes* 大于 59，则加时）        |
|            getSeconds()            | 返回日期中的秒（0~59）                                       |
|          getUTCSeconds()           | 返回 UTC 日期中的秒（0~59）                                  |
|       setSeconds(*seconds*)        | 设置日期中的秒（如果 *seconds* 大于 59，则加分）             |
|      setUTCSeconds(*seconds*)      | 设置 UTC 日期中的秒（如果 *seconds* 大于 59，则加分）        |
|         getMilliseconds()          | 返回日期中的毫秒                                             |
|        getUTCMilliseconds()        | 返回 UTC 日期中的毫秒                                        |
|  setMilliseconds(*milliseconds*)   | 设置日期中的毫秒                                             |
| setUTCMilliseconds(*milliseconds*) | 设置 UTC 日期中的毫秒                                        |
|        getTimezoneOffset()         | 返回以分钟计的 UTC 与本地时区的偏移量（如美国 EST 即“东部标准时间”，返回 300，进入夏令时的地区可能有所差异） |

### 4.2 **RegExp**

ECMAScript 通过 RegExp 类型支持正则表达式。正则表达式使用类似 Perl 的简洁语法来创建：

let expression = */pattern/flags;*

下面给出了表示匹配模式的标记。

 g：全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。

 i：不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。

 m：多行模式，表示查找到一行文本末尾时会继续查找。

 y：粘附模式，表示只查找从 lastIndex 开始及之后的字符串。

 u：Unicode 模式，启用 Unicode 匹配。

 s：dotAll 模式，表示元字符.匹配任何字符（包括\n 或\r）。

```javascript
// 匹配字符串中的所有"at" 
let pattern1 = /at/g; 
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern2 = /[bc]at/i; 
// 匹配所有以"at"结尾的三字符组合，忽略大小写
let pattern3 = /.at/gi;
```

与其他语言中的正则表达式类似，所有元字符在模式中也必须转义

包括： ( [ { \ ^ $ | ) ] } ? * + .

前面例子中的正则表达式都是使用字面量形式定义的。正则表达式也可以使用 RegExp 构造函数来

创建，它接收两个参数：模式字符串和（可选的）标记字符串。任何使用字面量定义的正则表达式也可

以通过构造函数来创建，

```javascript
// 匹配第一个"bat"或"cat"，忽略大小写
let pattern1 = /[bc]at/i; 
// 跟 pattern1 一样，只不过是用构造函数创建的
let pattern2 = new RegExp("[bc]at", "i");
```

这里的 pattern1 和 pattern2 是等效的正则表达式。注意，RegExp 构造函数的两个参数都是字

符串。因为 RegExp 的模式参数是字符串，所以在某些情况下需要二次转义。所有元字符都必须二次转

义，包括转义字符序列，如\n（\转义后的字符串是\\，在正则表达式字符串中则要写成\\\\）。

|      字面量模式      | 对应的字符串                    |
| :------------------: | ------------------------------- |
|    /\\\[bc\\]at/     | "\\\\[bc\\\\]at"                |
|       /\\\.at/       | "\\\\.at"                       |
|     /name\/age/      | "name\\\\/age"                  |
|     /\d.\d{1,2}/     | "\\\\d.\\\\d{1,2}"              |
| /\w\\\\hello\\\\123/ | "\\\\w\\\\\\\\hello\\\\\\\\123" |

#### 4.2.1 **RegExp** 实例属性

每个 RegExp 实例都有下列属性，提供有关模式的各方面信息。

 global：布尔值，表示是否设置了 g 标记。

 ignoreCase：布尔值，表示是否设置了 i 标记。

 unicode：布尔值，表示是否设置了 u 标记。

 sticky：布尔值，表示是否设置了 y 标记。

 lastIndex：整数，表示在源字符串中下一次搜索的开始位置，始终从 0 开始。

 multiline：布尔值，表示是否设置了 m 标记。

 dotAll：布尔值，表示是否设置了 s 标记。

 source：正则表达式的字面量字符串（不是传给构造函数的模式字符串），没有开头和结尾的

斜杠。

 flags：正则表达式的标记字符串。始终以字面量而非传入构造函数的字符串模式形式返回（没

有前后斜杠）。

```javascript
let pattern1 = /\[bc\]at/i; 
console.log(pattern1.global); // false 
console.log(pattern1.ignoreCase); // true 
console.log(pattern1.multiline); // false 
console.log(pattern1.lastIndex); // 0 
console.log(pattern1.source); // "\[bc\]at" 
console.log(pattern1.flags); // "i" 
let pattern2 = new RegExp("\\[bc\\]at", "i"); 
console.log(pattern2.global); // false 
console.log(pattern2.ignoreCase); // true 
console.log(pattern2.multiline); // false 
console.log(pattern2.lastIndex); // 0 
console.log(pattern2.source); // "\[bc\]at" 
console.log(pattern2.flags); // "i
```

#### 4.2.2 **RegExp** 实例方法

RegExp 实例的主要方法是 **exec()**，主要用于配合捕获组使用。

```javascript
let text = "mom and dad and baby"; 
let pattern = /mom( and dad( and baby)?)?/gi; 
let matches = pattern.exec(text); 
console.log(matches.index); // 0 
console.log(matches.input); // "mom and dad and baby" 
console.log(matches[0]); // "mom and dad and baby" 
console.log(matches[1]); // " and dad and baby" 
console.log(matches[2]); // " and baby
```

因为整个字符串匹配模式，所以 matchs数组的 index 属性就是 0。数组的第一个元素是匹配的整个字符串，第二个元素是匹配第一个捕获组的字符串，第三个元素是匹配第二个捕获组的字符串。

如果模式设置了全局标记，则每次调用 exec()方法会返回一个匹配的信息。如果没有设置全局标记，则无论对同一个字符串调用多少次 exec()，也只会返回第一个匹配的信息。

```javascript
let text = "cat, bat, sat, fat"; 
let pattern = /.at/; 
let matches = pattern.exec(text); 
console.log(matches.index); // 0 
console.log(matches[0]); // cat 
console.log(pattern.lastIndex); // 0 
matches = pattern.exec(text); 
console.log(matches.index); // 0 
console.log(matches[0]); // cat 
console.log(pattern.lastIndex); // 0
```

正则表达式的另一个方法是 **test()**，接收一个字符串参数。如果输入的文本与模式匹配，则参数返回 true，否则返回 false。

```javascript
let text = "000-00-0000"; 
let pattern = /\d{3}-\d{2}-\d{4}/; 
if (pattern.test(text)) { 
 console.log("The pattern was matched."); 
}
```

### 4.3 原始值包装类型

#### 4.3.1 **Boolean**

```javascript
let booleanObject = new Boolean(true);
```

Boolean 的实例会重写 valueOf()方法，返回一个原始值 true 或 false。toString()方法被调用时也会被覆盖，返回字符串"true"或"false"。

#### 4.3.2 **Number**

```javascript
let numberObject = new Number(10);
```

Boolean 类型一样，Number 类型重写了 valueOf()、toLocaleString()和 toString()方法。valueOf()方法返回 Number 对象表示的原始数值，另外两个方法返回数值字符串。toString()方法可选地接收一个表示基数的参数，并返回相应基数形式的数值字符串

```javascript
let num = 10; 
console.log(num.toString()); // "10" 
console.log(num.toString(2)); // "1010" 
console.log(num.toString(8)); // "12" 
console.log(num.toString(10)); // "10" 
console.log(num.toString(16)); // "a
```

**toFixed()**方法返回包含指定小数点位数的数值字符串

```javascript
let num = 10; 
console.log(num.toFixed(2)); // "10.00
```

另一个用于格式化数值的方法是 **toExponential()**，返回以科学记数法（也称为指数记数法）表示的数值字符串

```javascript
let num = 10; 
console.log(num.toExponential(1)); // "1.0e+1"
```

**toPrecision()**方法会根据情况返回最合理的输出结果，可能是固定长度，也可能是科学记数法形式

```javascript
let num = 99; 
console.log(num.toPrecision(1)); // "1e+2" 
console.log(num.toPrecision(2)); // "99" 
console.log(num.toPrecision(3)); // "99.0"
```

**isInteger()**方法与安全整数

ES6 新增了 Number.isInteger()方法，用于辨别一个数值是否保存为整数。有时候，小数位的 0可能会让人误以为数值是一个浮点值

```javascript
console.log(Number.isInteger(1)); // true 
console.log(Number.isInteger(1.00)); // true 
console.log(Number.isInteger(1.01)); // false
```

#### 4.3.3 **String**

```javascript
let stringObject = new String("hello world");
```

```javascript
let stringValue = "hello world"; 
console.log(stringValue.length); // "11"
```

- JavaScript 字符

​ JavaScript 字符串由 16 位码元（code unit）组成。对多数字符来说，每 16 位码元对应一个字符。换

​ 句话说，字符串的 length 属性表示字符串包含多少 16 位码元

```javascript
let message = "abcde"; 
console.log(message.length); // 5
```

​ charAt()方法返回给定索引位置的字符，由传给方法的整数参数指定

```javascript
let message = "abcde"; 
console.log(message.charAt(2)); // "c"
```

使用 charCodeAt()方法可以查看指定码元的字符编码。这个方法返回指定索引位置的码元值,索引以整数指定。

```javascript
let message = "abcde"; 
// Unicode "Latin small letter C"的编码是 U+0063 
console.log(message.charCodeAt(2)); // 99 
// 十进制 99 等于十六进制 63 
console.log(99 === 0x63); // true
```

- **normalize()**方法

  某些 Unicode 字符可以有多种编码方式。有的字符既可以通过一个 BMP 字符表示，也可以通过一个代理对表示。为解决这个问题，Unicode提供了 4种规范化形式，可以将类似上面的字符规范化为一致的格式，无论底层字符的代码是什么。这 4种规范化形式是：NFD（Normalization Form D）、NFC（Normalization Form C）、NFKD（Normalization Form KD）和 NFKC（Normalization Form KC）。可以使用 normalize()方法对字符串应用上述规范化形式，使用时需要传入表示哪种形式的字串："NFD"、"NFC"、"NFKD"或"NFKC"。

  ```javascript
  let a1 = String.fromCharCode(0x00C5), 
   a2 = String.fromCharCode(0x212B), 
   a3 = String.fromCharCode(0x0041, 0x030A); 
  // U+00C5 是对 0+212B 进行 NFC/NFKC 规范化之后的结果
  console.log(a1 === a1.normalize("NFD")); // false 
  console.log(a1 === a1.normalize("NFC")); // true 
  console.log(a1 === a1.normalize("NFKD")); // false 
  console.log(a1 === a1.normalize("NFKC")); // true 
  // U+212B 是未规范化的
  console.log(a2 === a2.normalize("NFD")); // false 
  console.log(a2 === a2.normalize("NFC")); // false 
  console.log(a2 === a2.normalize("NFKD")); // false 
  console.log(a2 === a2.normalize("NFKC")); // false 
  // U+0041/U+030A 是对 0+212B 进行 NFD/NFKD 规范化之后的结果
  console.log(a3 === a3.normalize("NFD")); // true 
  console.log(a3 === a3.normalize("NFC")); // false 
  console.log(a3 === a3.normalize("NFKD")); // true 
  console.log(a3 === a3.normalize("NFKC")); // false
  ```

- 字符串操作方法

  concat()，用于将一个或多个字符串拼接成一个新字符串

  ```javascript
  let stringValue = "hello "; 
  let result = stringValue.concat("world"); 
  console.log(result); // "hello world" 
  console.log(stringValue); // "hello
  ```

  ECMAScript 提供了 3 个从字符串中提取子字符串的方法：slice()、substr()和 substring()。与 concat()方法一样，slice()、substr()和 substring()也不会修改调用它们的字符串，而只会返回提取到的原始新字符串值。

  ```javascript
  let stringValue = "hello world"; 
  console.log(stringValue.slice(3)); // "lo world" 
  console.log(stringValue.substring(3)); // "lo world" 
  console.log(stringValue.substr(3)); // "lo world" 
  console.log(stringValue.slice(3, 7)); // "lo w" 
  console.log(stringValue.substring(3,7)); // "lo w" 
  console.log(stringValue.substr(3, 7)); // "lo worl"
  ```

  当某个参数是负值时，这 3 个方法的行为又有不同。比如，slice()方法将所有负值参数都当成字符串长度加上负参数值。而 substr()方法将第一个负参数值当成字符串长度加上该值，将第二个负参数值转换为 0。substring()方法会将所有负参数值都转换为 0

  ```javascript
  let stringValue = "hello world"; 
  console.log(stringValue.slice(-3)); // "rld" 
  console.log(stringValue.substring(-3)); // "hello world" 
  console.log(stringValue.substr(-3)); // "rld" 
  console.log(stringValue.slice(3, -4)); // "lo w" 
  console.log(stringValue.substring(3, -4)); // "hel" 
  console.log(stringValue.substr(3, -4)); // "" (empty string)
  ```

- 字符串位置方法

  有两个方法用于在字符串中定位子字符串：**indexOf()和 lastIndexOf()**。

  ```javascript
  let stringValue = "hello world"; 
  console.log(stringValue.indexOf("o")); // 4 
  console.log(stringValue.lastIndexOf("o")); // 7
  ```

- 字符串包含方法

  ECMAScript 6 增加了 3 个用于判断字符串中是否包含另一个字符串的方法：**startsWith()、**

  **endsWith()和 includes()**。

  ```javascript
  let message = "foobarbaz"; 
  console.log(message.startsWith("foo")); // true 
  console.log(message.startsWith("bar")); // false 
  console.log(message.endsWith("baz")); // true 
  console.log(message.endsWith("bar")); // false 
  console.log(message.includes("bar")); // true 
  console.log(message.includes("qux")); // false
  ```

- **trim()**方法

  ECMAScript 在所有字符串上都提供了 trim()方法。这个方法会创建字符串的一个副本，删除前、

  后所有空格符，再返回结果。

  ```javascript
  let stringValue = " hello world "; 
  let trimmedStringValue = stringValue.trim(); 
  console.log(stringValue); // " hello world " 
  console.log(trimmedStringValue); // "hello world
  ```

- **repeat()**方法

  ECMAScript 在所有字符串上都提供了 repeat()方法。这个方法接收一个整数参数，表示要将字

  符串复制多少次，然后返回拼接所有副本后的结果

  ```javascript
  let stringValue = "na "; 
  console.log(stringValue.repeat(16) + "batman"); 
  // na na na na na na na na na na na na na na na na batman
  ```

- **padStart()**和 **padEnd()**方法

  padStart()和 padEnd()方法会复制字符串，如果小于指定长度，则在相应一边填充字符，直至

  满足长度条件

  ```javascript
  let stringValue = "foo"; 
  console.log(stringValue.padStart(6)); // " foo" 
  console.log(stringValue.padStart(9, ".")); // "......foo" 
  console.log(stringValue.padEnd(6)); // "foo " 
  console.log(stringValue.padEnd(9, ".")); // "foo......"
  ```

- 字符串迭代与解构

  字符串的原型上暴露了一个@@iterator 方法，表示可以迭代字符串的每个字符。可以像下面这样

  手动使用迭代器

  ```javascript
  let message = "abc"; 
  let stringIterator = message[Symbol.iterator](); 
  console.log(stringIterator.next()); // {value: "a", done: false} 
  console.log(stringIterator.next()); // {value: "b", done: false} 
  console.log(stringIterator.next()); // {value: "c", done: false} 
  console.log(stringIterator.next()); // {value: undefined, done: true}
  ```

- 字符串大小写转换

  下一组方法涉及大小写转换，包括 4 个方法：toLowerCase()、toLocaleLowerCase()、toUpperCase()和toLocaleUpperCase()

  ```javascript
  let stringValue = "hello world"; 
  console.log(stringValue.toLocaleUpperCase()); // "HELLO WORLD" 
  console.log(stringValue.toUpperCase()); // "HELLO WORLD" 
  console.log(stringValue.toLocaleLowerCase()); // "hello world" 
  console.log(stringValue.toLowerCase()); // "hello world"
  ```

  - **localeCompare()**方法

    最后一个方法是 localeCompare()，这个方法比较两个字符串，返回如下 3 个值中的一个。

     如果按照字母表顺序，字符串应该排在字符串参数前头，则返回负值。（通常是-1，具体还要看与实际值相关的实现。）

     如果字符串与字符串参数相等，则返回 0。

     如果按照字母表顺序，字符串应该排在字符串参数后头，则返回正值。（通常是 1，具体还要看

    与实际值相关的实现。）

    ```javascript
    let stringValue = "yellow"; 
    console.log(stringValue.localeCompare("brick")); // 1 
    console.log(stringValue.localeCompare("yellow")); // 0 
    console.log(stringValue.localeCompare("zoo")); // -1
    ```

## 5. 集合引用类型

### 5.1 **Object**

显式地创建 Object 的实例有两种方式。第一种是使用 new 操作符和 Object 构造函数

```javascript
let person = new Object(); 
person.name = "Nicholas"; 
person.age = 29;
```

另一种方式是使用对象字面量（object literal）表示法

```javascript
let person = { 
 name: "Nicholas", 
 age: 29 
}; 
```

```javascript
let person = {}; // 与 new Object()相同
person.name = "Nicholas"; 
person.age = 29;
```

### 5.2 **Array**

#### 5.2.1 创建数组

有几种基本的方式可以创建数组。一种是使用 Array 构造函数，比如：

```javascript
let colors = new Array();
let colors = new Array(20);
let colors = new Array("red", "blue", "green");
```

另一种创建数组的方式是使用数组字面量（array literal）表示法

```javascript
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个元素的数组
let names = []; // 创建一个空数组
let values = [1,2,]; // 创建一个包含 2 个元素的数组
```

Array 构造函数还有两个 ES6 新增的用于创建数组的静态方法：**from()和 of()**。from()用于将

类数组结构转换为数组实例，而 of()用于将一组参数转换为数组实例

```java
// 字符串会被拆分为单字符数组
console.log(Array.from("Matt")); // ["M", "a", "t", "t"] 
// 可以使用 from()将集合和映射转换为一个新数组
const m = new Map().set(1, 2) 
 .set(3, 4); 
const s = new Set().add(1) 
 .add(2) 
 .add(3) 
 .add(4); 
console.log(Array.from(m)); // [[1, 2], [3, 4]] 
console.log(Array.from(s)); // [1, 2, 3, 4] 
// Array.from()对现有数组执行浅复制
const a1 = [1, 2, 3, 4]; 
const a2 = Array.from(a1); 
console.log(a1); // [1, 2, 3, 4] 
alert(a1 === a2); // false 
// 可以使用任何可迭代对象
const iter = { 
 *[Symbol.iterator]() { 
 yield 1; 
 yield 2; 
 yield 3; 
 yield 4; 
 } 
}; 
console.log(Array.from(iter)); // [1, 2, 3, 4]
// arguments 对象可以被轻松地转换为数组
function getArgsArray() { 
 return Array.from(arguments); 
} 
console.log(getArgsArray(1, 2, 3, 4)); // [1, 2, 3, 4] 
// from()也能转换带有必要属性的自定义对象
const arrayLikeObject = { 
 0: 1, 
 1: 2, 
 2: 3, 
 3: 4, 
 length: 4 
}; 
console.log(Array.from(arrayLikeObject)); // [1, 2, 3, 4]
```

Array.of()可以把一组参数转换为数组。这个方法用于替代在 ES6之前常用的 Array.prototype.

slice.call(arguments)，一种异常笨拙的将 arguments 对象转换为数组的写法

```javascript
console.log(Array.of(1, 2, 3, 4)); // [1, 2, 3, 4] 
console.log(Array.of(undefined)); // [undefined]
```

#### 5.2.2 数组空位

使用数组字面量初始化数组时，可以使用一串逗号来创建空位（hole）。ECMAScript 会将逗号之间

相应索引位置的值当成空位

```javascript
const options = [,,,,,]; // 创建包含 5 个元素的数组
console.log(options.length); // 5 
console.log(options); // [,,,,,]
const options = [1,,,,5]; 
for (const option of options) { 
 console.log(option === undefined); 
} 
// false 
// true 
// true 
// true 
// false
```

#### 5.2.3 数组索引

```javascript
let colors = ["red", "blue", "green"]; // 定义一个字符串数组
alert(colors[0]); // 显示第一项
colors[2] = "black"; // 修改第三项
colors[3] = "brown"; // 添加第四项
```

#### 5.2.4 检测数组

一个经典的 ECMAScript 问题是判断一个对象是不是数组。在只有一个网页（因而只有一个全局作

用域）的情况下，使用 **instanceof** , isArray操作符就足矣

```javascript
if (value instanceof Array){ 
 // 操作数组
}
if (Array.isArray(value)){ 
 // 操作数组
}
```

#### 5.2.5 迭代器方法

Array 的原型上暴露了 3 个用于检索数组内容的方法：**keys()、values()和entries()** 。keys()返回数组索引的迭代器，values()返回数组元素的迭代器，而 entries()返回索引/值对的迭代器

```javascript
const a = ["foo", "bar", "baz", "qux"]; 
// 因为这些方法都返回迭代器，所以可以将它们的内容
// 通过 Array.from()直接转换为数组实例
const aKeys = Array.from(a.keys()); 
const aValues = Array.from(a.values()); 
const aEntries = Array.from(a.entries()); 
console.log(aKeys); // [0, 1, 2, 3] 
console.log(aValues); // ["foo", "bar", "baz", "qux"] 
console.log(aEntries); // [[0, "foo"], [1, "bar"], [2, "baz"], [3, "qux"]]
```

#### 5.2.6 复制和填充方法

ES6 新增了两个方法：批量复制方法 **copyWithin()**，以及填充数组方法 **fill()**

```javascript
const zeroes = [0, 0, 0, 0, 0]; 
// 用 5 填充整个数组
zeroes.fill(5); 
console.log(zeroes); // [5, 5, 5, 5, 5] 
zeroes.fill(0); // 重置
// 用 6 填充索引大于等于 3 的元素
zeroes.fill(6, 3); 
console.log(zeroes); // [0, 0, 0, 6, 6] 
zeroes.fill(0); // 重置
// 用 7 填充索引大于等于 1 且小于 3 的元素
zeroes.fill(7, 1, 3); 
console.log(zeroes); // [0, 7, 7, 0, 0]; 
zeroes.fill(0); // 重置
// 用 8 填充索引大于等于 1 且小于 4 的元素
// (-4 + zeroes.length = 1) 
// (-1 + zeroes.length = 4) 
zeroes.fill(8, -4, -1); 
console.log(zeroes); // [0, 8, 8, 8, 0];
```

copyWithin()会按照指定范围浅复制数组中的部分内容，然后将它们插入到指定索引开始的位置。开始索引和结束索引则与 fill()使用同样的计算方法

```javascript
let ints, 
 reset = () => ints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; 
reset(); 
// 从 ints 中复制索引 0 开始的内容，插入到索引 5 开始的位置
// 在源索引或目标索引到达数组边界时停止
ints.copyWithin(5); 
console.log(ints); // [0, 1, 2, 3, 4, 0, 1, 2, 3, 4] 
reset(); 
// 从 ints 中复制索引 5 开始的内容，插入到索引 0 开始的位置
ints.copyWithin(0, 5); 
console.log(ints); // [5, 6, 7, 8, 9, 5, 6, 7, 8, 9]
reset(); 
// 从 ints 中复制索引 0 开始到索引 3 结束的内容
// 插入到索引 4 开始的位置
ints.copyWithin(4, 0, 3); 
alert(ints); // [0, 1, 2, 3, 0, 1, 2, 7, 8, 9] 
reset();
// 支持负索引值，与 fill()相对于数组末尾计算正向索引的过程是一样的
ints.copyWithin(-4, -7, -3); 
alert(ints); // [0, 1, 2, 3, 4, 5, 3, 4, 5, 6]
```

#### 4.2.7 转换方法

所有对象都有 toLocaleString()、toString()和 valueOf()方法。其中，valueOf()返回的还是数组本身。而 toString()返回由数组中每个值的等效字符串拼接而成的一个逗号分隔的字符串。

```javascript
let colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
alert(colors.toString()); // red,blue,green 
alert(colors.valueOf()); // red,blue,green 
alert(colors); // red,blue,green
```

**join()**方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

```javascript
let colors = ["red", "green", "blue"]; 
alert(colors.join(",")); // red,green,blue 
alert(colors.join("||")); // red||green||blue
```

#### 4.2.8 栈方法

```javascript
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
alert(count); // 2 
count = colors.push("black"); // 再推入一项
alert(count); // 3 
let item = colors.pop(); // 取得最后一项
alert(item); // black 
alert(colors.length); // 2
```

#### 4.2.9 队列方法

```javascript
let colors = new Array(); // 创建一个数组
let count = colors.push("red", "green"); // 推入两项
alert(count); // 2 
count = colors.push("black"); // 再推入一项
alert(count); // 3 
let item = colors.shift(); // !!! 取得第一项
alert(item); // red 
alert(colors.length); // 2
```

#### 5.2.10 排序方法

数组有两个方法可以用来对元素重新排序：reverse()和 sort()。

```javascript
let values = [1, 2, 3, 4, 5]; 
values.reverse(); 
alert(values); // 5,4,3,2,1
```

```javascript
let values = [0, 1, 5, 10, 15]; 
values.sort(); 
alert(values); // 0,1,10,15,5
```

sort()方法可以接收一个比较函数，用于判断哪个值应该排在前面

```javascript
function compare(value1, value2) { 
 if (value1 < value2) { 
 return -1; 
 } else if (value1 > value2) { 
 return 1; 
 } else { 
 return 0; 
 } 
}
let values = [0, 1, 5, 10, 15]; 
values.sort(compare); 
alert(values); // 0,1,5,10,15
```

如果数组的元素是数值，或者是其 valueOf()方法返回数值的对象（如 Date 对象），这个比较函

数还可以写得更简单，因为这时可以直接用第二个值减去第一个值

```javascript
function compare(value1, value2){ 
 return value2 - value1; 
}
```

#### 5.2.11 操作方法

**concat()**方法可以在现有数组全部元素基础上创建一个新数组。

```javascript
let colors = ["red", "green", "blue"]; 
let colors2 = colors.concat("yellow", ["black", "brown"]); 
console.log(colors); // ["red", "green","blue"] 
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

方法 **slice()**用于创建一个包含原有数组中一个或多个元素的新数组

```javascript
let colors = ["red", "green", "blue", "yellow", "purple"]; 
let colors2 = colors.slice(1); 
let colors3 = colors.slice(1, 4); 
alert(colors2); // green,blue,yellow,purple 
alert(colors3); // green,blue,yellow
```

最强大的数组方法就属 **splice(**)了，使用它的方式可以有很多种。splice()的主要目的是在数组中间插入元素，但有 3 种不同的方式使用这个方法

 删除。需要给 splice()传 2 个参数：要删除的第一个元素的位置和要删除的元素数量。可以从

数组中删除任意多个元素，比如 splice(0, 2)会删除前两个元素。

 插入。需要给 splice()传 3 个参数：开始位置、0（要删除的元素数量）和要插入的元素，可

以在数组中指定的位置插入元素。第三个参数之后还可以传第四个、第五个参数，乃至任意多

个要插入的元素。比如，splice(2, 0, "red", "green")会从数组位置 2 开始插入字符串

"red"和"green"。

 替换。splice()在删除元素的同时可以在指定位置插入新元素，同样要传入 3 个参数：开始位

置、要删除元素的数量和要插入的任意多个元素。要插入的元素数量不一定跟删除的元素数量

一致。比如，splice(2, 1, "red", "green")会在位置 2 删除一个元素，然后从该位置开始

向数组中插入"red"和"green"。

```javascript
let colors = ["red", "green", "blue"]; 
let removed = colors.splice(0,1); // 删除第一项
alert(colors); // green,blue 
alert(removed); // red，只有一个元素的数组
removed = colors.splice(1, 0, "yellow", "orange"); // 在位置 1 插入两个元素
alert(colors); // green,yellow,orange,blue 
alert(removed); // 空数组
removed = colors.splice(1, 1, "red", "purple"); // 插入两个值，删除一个元素
alert(colors); // green,red,purple,orange,blue 
alert(removed); // yellow，只有一个元素的数组
```

#### 5.2.12 搜索和位置方法

- 严格相等

  ECMAScript 提供了 3 个严格相等的搜索方法：indexOf()、lastIndexOf()和 includes()。

  在比较第一个参数跟数组每一项时，会使用全等（===）比较，也就是说两项必须严格相等

  ```javascript
  let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
  alert(numbers.indexOf(4)); // 3 
  alert(numbers.lastIndexOf(4)); // 5 
  alert(numbers.includes(4)); // true 
  alert(numbers.indexOf(4, 4)); // 5 
  alert(numbers.lastIndexOf(4, 4)); // 3 
  alert(numbers.includes(4, 7)); // false 
  let person = { name: "Nicholas" }; 
  let people = [{ name: "Nicholas" }]; 
  let morePeople = [person]; 
  alert(people.indexOf(person)); // -1 
  alert(morePeople.indexOf(person)); // 0 
  alert(people.includes(person)); // false 
  alert(morePeople.includes(person)); // true
  ```

- 断言函数

  find()和 findIndex()方法使用了断言函数。这两个方法都从数组的最小索引开始。find()返回

  第一个匹配的元素，findIndex()返回第一个匹配元素的索引

  ```javascript
  const people = [ 
   { 
   name: "Matt", 
   age: 27 
   }, 
   { 
   name: "Nicholas", 
   age: 29 
   } 
  ]; 
  alert(people.find((element, index, array) => element.age < 28)); 
  // {name: "Matt", age: 27} 
  alert(people.findIndex((element, index, array) => element.age < 28)); 
  // 0
  ```

#### 5.2.13 迭代方法

数组的 5 个迭代方法如下。

  every()：对数组每一项都运行传入的函数，如果对每一项函数都返回 true，则这个方法返回 true。

 filter()：对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回。

 forEach()：对数组每一项都运行传入的函数，没有返回值。

 map()：对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组。

 some()：对数组每一项都运行传入的函数，如果有一项函数返回 true，则这个方法返回 true。

这些方法都不改变调用它们的数组。

every()和 some()是最相似的，都是从数组中搜索符合某个条件的元素。对 every()

来说，传入的函数必须对每一项都返回 true，它才会返回 true；否则，它就返回 false。而对 some()

来说，只要有一项让传入的函数返回 true，它就会返回 true。

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
let everyResult = numbers.every((item, index, array) => item > 2); 
alert(everyResult); // false 
let someResult = numbers.some((item, index, array) => item > 2); 
alert(someResult); // true
```

调用 filter()返回的数组包含 3、4、5、4、3，因为只有对这些项传入的函数才返回 true。

这个方法非常适合从数组中筛选满足给定条件的元素

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
let filterResult = numbers.filter((item, index, array) => item > 2); 
alert(filterResult); // 3,4,5,4,3
```

map()方法也会返回一个数组。这个数组的每一项都是对原始数组中同样位置的元素运行传入函数而返回的结果  **(函数里写的是功能语句)**

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
let mapResult = numbers.map((item, index, array) => item * 2); 
alert(mapResult); // 2,4,6,8,10,8,6,4,2
```

再来看一看 forEach()方法。这个方法只会对每一项运行传入的函数，没有返回值。本质

上，forEach()方法相当于使用 for 循环遍历数组。

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
numbers.forEach((item, index, array) => { 
 // 执行某些操作 
});
```

#### 5.1.13 归并方法

ECMAScript 为数组提供了两个归并方法：reduce()和 reduceRight()。这两个方法都会迭代数

组的所有项，并在此基础上构建一个**最终返回值**。reduce()方法从数组第一项开始遍历到最后一项。

而 reduceRight()从最后一项开始遍历至第一项。四个参数：**上一个归并值、当前项**、当前项的索引和数

组本身。

可以使用 reduce()函数执行累加数组中所有数值的操作

```javascript
let values = [1, 2, 3, 4, 5]; 
let sum = values.reduce((prev, cur, index, array) => prev + cur); 
alert(sum); // 15
```

第一次执行归并函数时，prev 是 1，cur 是 2。第二次执行时，prev 是 3（1 + 2），cur 是 3（数

组第三项）。如此递进，直到把所有项都遍历一次，最后返回归并结果

### 5.3 定性数组

### 5.4 Map

## 6. 代理与反射

### 6.1 普通代理

```javascript
const target = { 
 id: 'target' 
}; 
const handler = {}; 
const proxy = new Proxy(target, handler); 
// id 属性会访问同一个值
console.log(target.id); // target 
console.log(proxy.id); // target
```

```javascript
// hasOwnProperty()方法在两个地方
// 都会应用到目标对象
console.log(target.hasOwnProperty('id')); // true 
console.log(proxy.hasOwnProperty('id')); // true
```

```javascript
// Proxy.prototype 是 undefined 
// 因此不能使用 instanceof 操作符
console.log(target instanceof Proxy); // TypeError: Function has non-object prototype 
'undefined' in instanceof check 
console.log(proxy instanceof Proxy); // TypeError: Function has non-object prototype 
'undefined' in instanceof check 
// 严格相等可以用来区分代理和目标
console.log(target === proxy); // false
```

### 6.2 定义捕获器

使用代理的主要目的是可以定义捕获器（trap）。捕获器就是在处理程序对象中定义的“基本操作的

拦截器”。每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接

或间接在代理对象上调用。每次在代理对象上调用这些基本操作时，代理可以在这些操作传播到目标对

象之前先调用捕获器函数，从而拦截并修改相应的行为

可以定义一个 get()捕获器，在 ECMAScript 操作以某种形式调用 get()时触发。下面的例

子定义了一个 get()捕获器

```javascript
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 // 捕获器在处理程序对象中以方法名为键
 get() { 
 return 'handler override'; 
 } 
};
```

### 6.3 捕获器参数和反射 API

```javascript
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 get() { 
 return Reflect.get(...arguments); 
 } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 
console.log(target.foo); // bar
```

甚至还可以写得更简洁一些

```javascript
const target = { 
 foo: 'bar' 
}; 
const handler = { 
 get: Reflect.get; 
 } 
}; 
const proxy = new Proxy(target, handler); 
console.log(proxy.foo); // bar 
console.log(target.foo); // bar
```

### 6.4 代理捕获器与反射方法

#### 6.4.1 **get()**

get()捕获器会在获取属性值的操作中被调用。对应的反射 API 方法为 Reflect.get()。

```javascript
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 get(target, property, receiver) { 
 console.log('get()'); 
 return Reflect.get(...arguments) 
 } 
}); 
proxy.foo; 
// get()
```

#### 6.4.2 **set()**

set()捕获器会在设置属性值的操作中被调用。对应的反射 API 方法为 Reflect.set()

```javascript
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 set(target, property, value, receiver) { 
 console.log('set()'); 
 return Reflect.set(...arguments) 
 } 
}); 
proxy.foo = 'bar'; 
// set()
```

#### 6.4.3 **has()**

has()捕获器会在 in 操作符中被调用。对应的反射 API 方法为 Reflect.has()。

```javascript
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 has(target, property) { 
 console.log('has()'); 
 return Reflect.has(...arguments) 
 } 
}); 
'foo' in proxy; 
// has()
```

#### 6.4.4 **defineProperty()**

defineProperty()捕获器会在 Object.defineProperty()中被调用。对应的反射 API 方法为

Reflect.defineProperty()。

```javascript
const myTarget = {}; 
const proxy = new Proxy(myTarget, { 
 defineProperty(target, property, descriptor) { 
 console.log('defineProperty()'); 
 return Reflect.defineProperty(...arguments) 
 } 
}); 
Object.defineProperty(proxy, 'foo', { value: 'bar' }); 
// defineProperty()
```

类似函数还有很多

## 7. 原型链

```javascript
const o = {
  a: 1,
  b: 2,
  // __proto__ 设置了 [[Prototype]]。在这里它被指定为另一个对象字面量。
  __proto__: {
    b: 3,
    c: 4,
    __proto__: {
      d: 5,
    },
  },
};

// { a: 1, b: 2 } ---> { b: 3, c: 4 } ---> { d: 5 } ---> Object.prototype ---> null

console.log(o.d); // 5
```

### 7.1 字面量的隐式构造函数

JavaScript 中的一些字面量语法会创建隐式设置 `[[Prototype]]` 的实例

```javascript
// 对象字面量（没有 `__proto__` 键）自动将 `Object.prototype` 作为它们的 `[[Prototype]]`
const object = { a: 1 };
Object.getPrototypeOf(object) === Object.prototype; // true

// 数组字面量自动将 `Array.prototype` 作为它们的 `[[Prototype]]`
const array = [1, 2, 3];
Object.getPrototypeOf(array) === Array.prototype; // true

// 正则表达式字面量自动将 `RegExp.prototype` 作为它们的 `[[Prototype]]`
const regexp = /abc/;
Object.getPrototypeOf(regexp) === RegExp.prototype; // true
```

#### 7.2 构建更长的继承链

```javascript
function Constructor() {}

const obj = new Constructor();
// obj ---> Constructor.prototype ---> Object.prototype ---> null
```

如果函数的 `prototype` 被赋予了 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 以外的值，则当它被 `new` 运算符调用时，返回对象的原型将会指向 `Object.prototype`。

```javascript
function Ctor() {}
Ctor.prototype = 3;
console.log(Object.getPrototypeOf(new Ctor()) === Object.prototype); // true
```

要构建更长的原型链，我们可以通过 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 函数设置 `Constructor.prototype` 的 `[[Prototype]]`。

```javascript
function Base() {}
function Derived() {}
// 将 `Derived.prototype` 的 `[[Prototype]]`
// 设置为 `Base.prototype`
Object.setPrototypeOf(Derived.prototype, Base.prototype);

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

在类的术语中，这等同于使用 [`extends`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends) 语法。

```javascript
class Base {}
class Derived extends Base {}

const obj = new Derived();
// obj ---> Derived.prototype ---> Base.prototype ---> Object.prototype ---> null
```

#### 7.3 使用不同的方法来创建对象和改变原型链

- ### [使用语法结构创建对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain#使用语法结构创建对象)

```javascript
const o = { a: 1 };
// 新创建的对象 o 以 Object.prototype 作为它的 [[Prototype]]
// Object.prototype 以 null 作为它的 [[Prototype]]。
// o ---> Object.prototype ---> null

const b = ["yo", "whadup", "?"];
// 数组继承了 Array.prototype（具有 indexOf、forEach 等方法）
// 原型链如下所示：
// b ---> Array.prototype ---> Object.prototype ---> null

function f() {
  return 2;
}
// 函数继承了 Function.prototype（具有 call、bind 等方法）
// f ---> Function.prototype ---> Object.prototype ---> null

const p = { b: 2, __proto__: o };
// 可以通过 __proto__ 字面量属性（不要将其与 Object.prototype.__proto__ 访问器弄混）将新创建的对象的
// [[Prototype]] 指向另一个对象。
// p ---> o ---> Object.prototype ---> null
```

- ### 使用构造函数

  ```javascript
  function Graph() {
    this.vertices = [];
    this.edges = [];
  }
  
  Graph.prototype.addVertex = function (v) {
    this.vertices.push(v);
  };
  
  const g = new Graph();
  // g 是一个带有自有属性“vertices”和“edges”的对象。
  // 在执行 new Graph() 时，g.[[Prototype]] 是 Graph.prototype 的值。
  ```

- ### 使用 Object.create()

  调用 [`Object.create()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create) 会创建一个新对象。该对象的 `[[Prototype]]` 是该函数的第一个参数：

  ```javascript
  const a = { a: 1 };
  // a ---> Object.prototype ---> null
  
  const b = Object.create(a);
  // b ---> a ---> Object.prototype ---> null
  console.log(b.a); // 1（继承的）
  
  const c = Object.create(b);
  // c ---> b ---> a ---> Object.prototype ---> null
  
  const d = Object.create(null);
  // d ---> null（d 是一个直接以 null 为原型的对象）
  console.log(d.hasOwnProperty);
  // undefined，因为 d 没有继承 Object.prototype
  ```

- ### 使用类

  ```javascript
  class Rectangle {
    constructor(height, width) {
      this.name = "Rectangle";
      this.height = height;
      this.width = width;
    }
  }
  
  class FilledRectangle extends Rectangle {
    constructor(height, width, color) {
      super(height, width);
      this.name = "Filled rectangle";
      this.color = color;
    }
  }
  
  const filledRectangle = new FilledRectangle(5, 10, "blue");
  // filledRectangle ---> FilledRectangle.prototype ---> Rectangle.prototype ---> Object.prototype ---> null
  ```

- ### 使用 Object.setPrototypeOf()

  虽然上面的所有方法都会在对象创建时设置原型链，但是 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 允许修改现有对象的 `[[Prototype]]` 内部属性。它甚至能强制为 `Object.create(null)` 创建的无原型的对象设置原型，或者将原型设置为 `null` 移除对象的原型

  ```javascript
  const obj = { a: 1 };
  const anotherObj = { b: 2 };
  Object.setPrototypeOf(obj, anotherObj);
  // obj ---> anotherObj ---> Object.prototype ---> null
  ```
