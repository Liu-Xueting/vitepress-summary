# 集合引用类型

## **Object**

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

## **Array**

## 创建数组

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

## 数组空位

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

## 数组索引

```javascript
let colors = ["red", "blue", "green"]; // 定义一个字符串数组
alert(colors[0]); // 显示第一项
colors[2] = "black"; // 修改第三项
colors[3] = "brown"; // 添加第四项
```

## 检测数组

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

## 迭代器方法

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

## 复制和填充方法

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

## 4 转换方法

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

## 4 栈方法

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

## 4 队列方法

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

## 0 排序方法

数组有两个方法可以用来对元素重新排序：reverse()和 sort()。

```javascript
let values = [1, 2, 3, 4, 5]; 
values.reverse(); 
alert(values); // ,3,2,1
```

```javascript
let values = [0, 1, 5, 10, 15]; 
values.sort(); 
alert(values); // 0,1,10,1
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
alert(values); // 0,1,0,15
```

如果数组的元素是数值，或者是其 valueOf()方法返回数值的对象（如 Date 对象），这个比较函

数还可以写得更简单，因为这时可以直接用第二个值减去第一个值

```javascript
function compare(value1, value2){ 
 return value2 - value1; 
}
```

## 1 操作方法

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

## 2 搜索和位置方法

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

## 3 迭代方法

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

调用 filter()返回的数组包含 3、4、、3，因为只有对这些项传入的函数才返回 true。

这个方法非常适合从数组中筛选满足给定条件的元素

```javascript
let numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1]; 
let filterResult = numbers.filter((item, index, array) => item > 2); 
alert(filterResult); // 3,4,,3
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

## 3 归并方法

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

## 定性数组

## Map
