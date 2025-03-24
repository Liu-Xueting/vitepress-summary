# 代理与反射

## 普通代理

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

## 定义捕获器

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

## 捕获器参数和反射 API

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

## 代理捕获器与反射方法

## **get()**

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

## **set()**

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

## **has()**

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

## **defineProperty()**

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
