# 1. 深拷贝 & 浅拷贝

前面文章我们讲到，JavaScript中存在两大数据类型：

基本类型
引用类型
基本类型数据保存在在栈内存中

引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中

## 1.1 浅拷贝

浅拷贝是指只复制对象的第一层属性值，如果属性值是引用类型，则只复制引用地址，而不复制引用类型的实际内容。

```javascript
function shallowClone(obj) {
    const newObj = {};
    for(let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            newObj[prop] = obj[prop];
        }
    }
    return newObj;
}
```

在JavaScript中，存在浅拷贝的现象有：

- Object.assign
- Array.prototype.slice(), Array.prototype.concat()
- 使用拓展运算符实现的复制
- Array.from()

## 深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：

- _.cloneDeep()   lodash
- JSON.parse(JSON.stringify())
- jQuery.extend()
- 手写循环递归

**_cloneDeep**:

```javascript
const _ = require('lodash');
const obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
const obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);// false
```

**JSON.parse(JSON.stringify())**:

```javascript
const obj2=JSON.parse(JSON.stringify(obj1));
```

但是这种方式存在弊端，会忽略 **undefined、symbol和函数**

```javascript
const obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
const obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}
```

**循环递归**:

```javascript
function deepClone(target,map = new WeakMap()){
    if(map.get(target)){
        // 说明对象已经被复制过
        retrun map.get(target);
    }
        
    // 获取当前值的构造函数：获取它的类型
    let constructor = target.constructor;
    // 检测当前对象target是否与正则、日期格式对象匹配
    if(/^(RegExp|Date)$/i.test(constructor.name)){
         // 创建一个新的特殊对象(正则类/日期类)的实例
        retrun new constructor(target);
    }
    
    if(isObject(target)){
        // 引用类型
        const cloneTarget = Array.isArray(target) ? [] : {}
        for(let prop in target){
            if(target.hasOwnProperty(prop)){
                cloneTarget[prop] = deepClone(target[prop],map)
            }
        }
        map.set(target, cloneTarget)  // 为循环引用的对象做标记 对所有复制过的对象打上标记，以免重复复制 例如：对象中有个属性的值还是对象本身
        return cloneTarget;
    } else{
        // 常规类型
        return target;
    }
}
```

## 区别

浅拷贝和深拷贝都创建出一个新的对象，但在复制对象属性的时候，行为就不一样

浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象

注意： **浅拷贝会影响原对象属性为引用类型的值，如果复制对象改变了引用类型的属性值，原对象也会改变**

```js
// 浅拷贝
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj3=shallowClone(obj1) // 一个浅拷贝方法
obj3.name = "update";
obj3.arr[1] = [5,6,7] ; // 新旧对象还是共享同一块内存

console.log('obj1',obj1) // obj1 { name: 'init',  arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj3',obj3) // obj3 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

深拷贝会创建一个新的对象，修改新对象的属性不会影响原对象

```js
// 深拷贝
const obj1 = {
    name : 'init',
    arr : [1,[2,3],4],
};
const obj4=deepClone(obj1) // 一个深拷贝方法
obj4.name = "update";
obj4.arr[1] = [5,6,7] ; // 新对象跟原对象不共享内存

console.log('obj1',obj1) // obj1 { name: 'init', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4',obj4) // obj4 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

**小结**:

前提为拷贝类型为引用类型的情况下：

浅拷贝是拷贝一层，**属性为对象时**，浅拷贝是复制，两个对象指向同一个地址

深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址
