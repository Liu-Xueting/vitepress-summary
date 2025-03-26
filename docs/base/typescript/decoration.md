# 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类的声明、方法、属性、参数上，可以改变类的行为。通俗来讲装饰器就是一个方法，可以注入到类、方法、属性、参数上，来扩展类方法属性参数的功能（过去几年js最大的成就之一，es7的标准）。
常见的装饰器有：类装饰器、属性装饰器、方法装饰器、参数装饰器。
普通装饰器（无法传参）、装饰器工厂（可以传参）。

## 类装饰器

在类声明之前声明（紧挨着类声明）

### 普通装饰器(无法传参)

```typescript
function logClass(params: any) {
  console.log(params); // params: 当前类
  params.prototype.apiUrl = '动态扩展的属性';
  params.prototype.run = function() {
    console.log('动态扩展的方法');
  }
}

@logClass
class HttpClient {
  constructor() {}
  getData() {}
}

let http: any = new HttpClient();
console.log(http.apiUrl);
http.run();
```

### 装饰器工厂（可传参）

```typescript
function logClass(params: string) {
  return function(target: any) {
    console.log(target); // target: 当前类
    console.log(params); // params: 传入的参数
    target.prototype.apiUrl = params;
  }
}

@logClass('http://www.itying.com/api')
class HttpClient {
  constructor() {}
  getData() {}
}

let http: any = new HttpClient();
console.log(http.apiUrl);   // http://www.itying.com/api
```

### 类装饰器重载构造函数

```typescript

function logClass(target: any) {
  console.log(target);
  return class extends target {
    apiUrl: any = '我是修改后的数据';
    getData() {
      console.log(this.apiUrl);
    }
  }
}

@logClass
class HttpClient {
  apiUrl: string | undefined;
  constructor() {
    this.apiUrl = '我是构造函数里面的apiUrl';
  }
  getData() {
    console.log(this.apiUrl);
  }
}

let http: any = new HttpClient();
http.getData();  // 我是修改后的数据
```

## 属性装饰器

两个参数：**第一个是构造函数（实例来说是原型对象），第二是成员的名字（属性名）**

```typescript
function logProperty(params: any) {
  return function(target: any, attr: any) {
    console.log(target); // target: 当前类的原型对象
    console.log(attr); // attr: 成员的名字
    target[attr] = params;
  }
}

class HttpClient {
  @logProperty('http://www.itying.com/api')
  apiUrl: string | undefined;
  constructor() {}
  getData() {}
}

let http: any = new HttpClient();
console.log(http.apiUrl);   // http://www.itying.com/api
```

## 方法装饰器

三个参数：**第一个是构造函数（实例来说是原型对象），第二是方法名，第三个是方法的描述（desc.value就是方法本身）**

```typescript
function get(params: any) {
  return function(target: any, methodName: any, desc: any) {
    console.log(target); // target: 当前类的原型对象
    console.log(methodName); // methodName: 方法名
    console.log(desc.value); // desc.value: 方法本身
    target.apiUrl = 'xxx';
    target.run = function() {
      console.log('run');
    }
    // 修改装饰器的方法
    let oMethod = desc.value;
    desc.value = function(...args: any[]) {
      args = args.map((value) => {
        return String(value);
      });
      oMethod.apply(this, args);
    }
  }
}

class HttpClient {
  apiUrl: string | undefined;
  constructor() {}
  @get('http://www.itying.com/api')
  getData(...args: any[]) {
    console.log(args);
    console.log('我是getData里面的方法');
  }
}

let http: any = new HttpClient();
http.getData(123, 'xxx');   // ['123', 'xxx']
```

## 方法参数装饰器

三个参数:**第一是构造函数（实例来说是原型对象），第二是方法名，第三个是参数在参数中 的索引**

```typescript
function logParams(params: any) {
  return function(target: any, methodName: any, paramsIndex: any) {
    console.log(target); // target: 当前类的原型对象
    console.log(methodName); // methodName: 方法名
    console.log(paramsIndex); // paramsIndex: 参数的索引
    target.apiUrl = params;
  }
}

class HttpClient {
  apiUrl: string | undefined;
  constructor() {}
  getData(@logParams('uuid') uuid: any) {
    console.log(uuid);
  }
}

let http: any = new HttpClient();
http.getData(123);   // uuid
console.log(http.apiUrl);   // uuid
```
