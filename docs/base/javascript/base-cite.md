# 基本引用类型

## **Date**

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

## 继承的方法

Date 类型重写了 toLocaleString()、toString()和 valueOf()方法。

Date 类型的 toLocaleString()方法返回与浏览器运行的本地环境一致的日期和时间。这通常意味着格式中包含针对时间的 AM（上午）或 PM（下午），但不包含时区信息

toString()方法通常返回带时区信息的日期和时间，而时间也是以 24 小时制（0~23）表示的。

## 日期格式化方法

Date 类型有几个专门用于格式化日期的方法，它们都会返回字符串：

 toDateString()显示日期中的周几、月、日、年（格式特定于实现）；

 toTimeString()显示日期中的时、分、秒和时区（格式特定于实现）；

 toLocaleDateString()显示日期中的周几、月、日、年（格式特定于实现和地区）；

 toLocaleTimeString()显示日期中的时、分、秒（格式特定于实现和地区）；

 toUTCString()显示完整的 UTC 日期（格式特定于实现）。

## 日期/时间组件方法

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

## **RegExp**

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

## **RegExp** 实例属性

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

## **RegExp** 实例方法

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

## 原始值包装类型

## **Boolean**

```javascript
let booleanObject = new Boolean(true);
```

Boolean 的实例会重写 valueOf()方法，返回一个原始值 true 或 false。toString()方法被调用时也会被覆盖，返回字符串"true"或"false"。

## **Number**

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

## **String**

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
