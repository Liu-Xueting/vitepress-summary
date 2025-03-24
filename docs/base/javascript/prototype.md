# 原型链

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

## 字面量的隐式构造函数

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

## 构建更长的继承链

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

## 使用不同的方法来创建对象和改变原型链

- ## [使用语法结构创建对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain#使用语法结构创建对象)

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

- ## 使用构造函数

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

- ## 使用 Object.create()

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

- ## 使用类

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

- ## 使用 Object.setPrototypeOf()

  虽然上面的所有方法都会在对象创建时设置原型链，但是 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 允许修改现有对象的 `[[Prototype]]` 内部属性。它甚至能强制为 `Object.create(null)` 创建的无原型的对象设置原型，或者将原型设置为 `null` 移除对象的原型

  ```javascript
  const obj = { a: 1 };
  const anotherObj = { b: 2 };
  Object.setPrototypeOf(obj, anotherObj);
  // obj ---> anotherObj ---> Object.prototype ---> null
  ```
