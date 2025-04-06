# 继承

继承可以使得子类具有父类别的各种属性和方法，而不需要再次编写相同的代码

在子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能

下面给出JavaScripy常见的继承方式：

- 原型链继承
- 构造函数继承（借助 call）
- 组合继承
- 原型式继承
- 寄生式继承
- 寄生组合式继承

## 原型链继承

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

## 构造函数继承

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

## 组合继承

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

## 原型式继承

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

## 寄生式继承

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

## 寄生组合式继承

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
