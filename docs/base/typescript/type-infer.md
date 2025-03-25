# 类型推断

## typeof关键字

TypeScript 中 typeof的作用是：获取某个数据的类型

```typescript
const a : string = '1234';
console.log(typeof a); // string
```

```typescript

const b = '1234';
let c: typeof b; 
let c :"1234";   // error
```

这里ts 在 类型检查的时候报错，typeof 用在类型检查的位置。
上面的c 的类型是b的变量，这个b又是const定义的（const 和 let 定义的区别在于 const 定义常量， let 定义变量,详细）常量的值一般在声明的时候就要赋值，所以b 的类型不是string, 而是一个**字面量**

解决方法：

- 把const 修改为 let
- 手动给const声明类型

**TS中的typeof，书写的位置在类型约束的位置上。表示：获取某个数据的类型**，但是typeof 作用于类的时候，确实一个类的构造函数。

```typescript
class Person {
  name: string;
  age: number;
}
const a = new Person();
let obj1: typeof Person; // 类的构造函数
let obj2: Person; // 类的实例
```

## keyof 关键字

作用于**类、接口、类型别名**，用于获取其他类型中的所有成员名组成的**联合类型**

```typescript
interface Person {
  name: string;
  age: number;
}
let obj: keyof Person; // "name" | "age"
```

### 获取多个级联类型的**交集**

```typescript
interface Person {
  name: string;
  age: number;
}

type u = {
    name: string
    age: number
    sex: string
}

let a: keyof Person & keyof u; // "name" | "age"
// 若没有交集，则返回never
```

### 获取多个级联类型的**并集**

```typescript
interface Person {
  name: string;
  age: number;
}

type u = {
    name: string
    age: number
    sex: string
}

let a: keyof Person | keyof u; // "name" | "age" | "sex"
```

## in 关键字

作用于**联合类型**，用于遍历联合类型中的所有成员

```typescript
type Keys = "a" | "b";
type Obj = {
  [key in Keys]: any;
}
// 等价于
type Obj = {
  a: any;
  b: any;
}
```

```typescript
interface Person {
  name: string;
  age: number;
}
type User = {
    [key in keyof Person]: Person[key];
}
// 等价于
type User = {
    name: string;
    age: number;
}
```

## TS中预设的类型演算

### `Partial<T>`

将类型T中的成员变为可选

```typescript
interface Person {
  name: string;
  age: number;
}
type PartialPerson = Partial<Person>;
// 等价于
type PartialPerson = {
  name?: string;
  age?: number;
}
```

**原理：**

```typescript
type Partial<T> = {
  [key in keyof T]?: T[key];
}
```

### `Required<T>`

将类型T中的所有成员变为必选

```typescript
interface Person {
  name?: string;
  age?: number;
}
type RequiredPerson = Required<Person>;
// 等价于
type RequiredPerson = {
  name: string;
  age: number;
}
```

**原理：**

```typescript
type Required<T> = {
  [key in keyof T]-?: T[key];
}
```

### `Readonly<T>`

将类型T中的所有成员变为只读

```typescript
interface Person {
  name: string;
  age: number;
}
type ReadonlyPerson = Readonly<Person>;
// 等价于
type ReadonlyPerson = {
  readonly name: string;
  readonly age: number;
}
```

**原理：**

```typescript
type Readonly<T> = {
  readonly [key in keyof T]: T[key];
}
```

### Record<K, T>

创建一个类型，其属性名的类型为K，属性值的类型为T

```typescript
type User = Record<"name" | "age", string>;
// 等价于
type User = {
  name: string;
  age: string;
}
```

**原理：**

```typescript
type Record<K extends keyof any, T> = {
  [key in K]: T;
}
```

### Pick<T, K>

从类型T中挑选出属性名为K的属性

```typescript
interface Person {
  name: string;
  age: number
}
type User = Pick<Person, "name">;
// 等价于
type User = {
  name: string;
}
```

**原理：**

```typescript
type Pick<T, K extends keyof T> = {
  [key in K]: T[key];
}
```

### Exclude<T, U>

从类型T中排除所有可以赋值给U的类型（T中的差集）

```typescript
type User = Exclude<"a" | "b" | "c", "a" | "b">;
// 等价于
type User = "c";
```

**原理：**

```typescript
type Exclude<T, U> = T extends U ? never : T;
```

### Extract<T, U>

从类型T中提取所有可以赋值给U的类型（T中的交集）

```typescript
type User = Extract<"a" | "b" | "c", "a" | "b">;
// 等价于
type User = "a" | "b";
```

**原理：**

```typescript

type Extract<T, U> = T extends U ? T : never;
```

### Omit<T, K>

从类型T中排除属性名为K的属性

```typescript
interface Person {
  name: string;
  age: number
}
type User = Omit<Person, "name">;
// 等价于
type User = {
  age: number;
}
```

**原理：**

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

### `NonNullable<T>`

从类型T中排除null和undefined

```typescript
type User = NonNullable<string | null | undefined>;
// 等价于
type User = string;
```

**原理：**

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
```

### `ReturnType<T>`

获取函数类型T的返回值类型

```typescript
type User = ReturnType<() => string>;
// 等价于
type User = string;
```

**原理：**

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

### `Parameters<T>`

获取函数类型T的参数类型组成的元组

```typescript
type User = Parameters<(name: string, age: number) => void>;
// 等价于
type User = [string, number];
```

**原理：**

```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

## 集合运算示例

```typescript
// 并集运算
type A = number | string; // 数字或字符串的集合

// 交集运算
type B = number & string; // 空集，因为数字和字符串没有交集

// 差集运算（通过 Exclude）
type C = Exclude<"a" | "b" | 1, number>; // "a" | "b"
```

## 类型推导示例

### 变量类型推导

```typescript
let count = 0;          // 推导为 number
const msg = "hello";    // 推导为 "hello" (字面量类型)
const arr = [1, true];  // 推导为 (number | boolean)[]
```

类型推导的数学表达：
$$
\text{推导结果} = \bigcap \{ \tau \mid \text{表达式符合类型 } \tau \}
$$

### 函数类型推导

```typescript
// 参数推导
function sum(a: number, b: number) {
    return a + b; // 返回类型推导为 number
}

// 泛型推导
function identity<T>(arg: T): T {
    return arg; // 输入输出类型一致
}

// 调用时的类型流动
const num = identity(10);    // T 推导为 number
const str = identity("TS");  // T 推导为 string
```

## 类型演算工具箱

### 基础类型操作符

```typescript
// 类型别名
type UserID = string & { readonly brand: unique symbol };

// 索引访问
type User = { name: string; age: number };
type AgeType = User["age"];  // number

// 映射类型
type ReadonlyUser = {
    readonly [K in keyof User]: User[K];
};
```

### 条件类型系统

```typescript
type IsNumber<T> = T extends number ? "Yes" : "No";

type A = IsNumber<5>;     // "Yes"
type B = IsNumber<"abc">; // "No"

// 分布式条件类型
type ToArray<T> = T extends any ? T[] : never;
type C = ToArray<string | number>; // string[] | number[]
```

### 类型体操实战

```typescript
// 递归类型：反转数组
type Reverse<T extends any[]> = 
    T extends [infer First, ...infer Rest] 
    ? [...Reverse<Rest>, First] 
    : [];

type D = Reverse<[1, 2, 3]>; // [3, 2, 1]

// 模板字面量类型
type Route<T extends string> = `/${T}/detail`;
type UserRoute = Route<"user">; // "/user/detail"
```

## 高级类型推导技术

### 类型谓词（Type Guards）

```typescript
function isString(test: any): test is string {
    return typeof test === "string";
}

function example(val: string | number) {
    if (isString(val)) {
        // 此处 val 推导为 string
        console.log(val.toUpperCase());
    } else {
        // 此处 val 推导为 number
        console.log(val.toFixed(2));
    }
}
```

### 控制流分析

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value; // padding 推导为 number
    }
    if (typeof padding === "string") {
        return padding + value; // padding 推导为 string
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}
```

## 实用类型模式

### 类型约束与默认值

```typescript
// 带约束的泛型
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

// 带默认值的泛型
interface Box<T = string> {
    content: T;
}

const box1: Box = { content: "hello" }; // content 类型为 string
const box2: Box<number> = { content: 42 };
```

### 类型操纵工具

```typescript
// 从对象提取类型
const user = { name: "Alice", age: 30 };
type UserType = typeof user; // { name: string; age: number }

// 实用工具类型
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Omit<Todo, "description">; // { title: string; completed: boolean }
type TodoInfo = Pick<Todo, "title" | "completed">; // 同上
```

## 类型系统应用场景

### API 响应处理

```typescript
type ApiResponse<T> = 
    | { status: "success"; data: T }
    | { status: "error"; message: string };

async function fetchUser(): Promise<ApiResponse<User>> {
    try {
        const response = await fetch("/api/user");
        return { status: "success", data: await response.json() };
    } catch (e) {
        return { status: "error", message: e.message };
    }
}
```

### 表单验证系统

```typescript
type ValidationResult<T> = {
    [K in keyof T]?: string;
};

interface LoginForm {
    username: string;
    password: string;
}

function validate(form: LoginForm): ValidationResult<LoginForm> {
    const errors = {};
    if (form.username.length < 3) {
        errors.username = "用户名至少3个字符";
    }
    if (form.password.length < 6) {
        errors.password = "密码至少6位";
    }
    return errors;
}
```

## 类型系统数学原理

### 类型代数

```typescript
// 乘积类型（Product Types）
type Point = {
    x: number;
    y: number;
};

// 和类型（Sum Types）
type Result<T> = 
    | { kind: "success"; value: T }
    | { kind: "error"; message: string };
```

### 类型等价关系

```typescript
type A = string | number;
type B = number | string; // 与 A 等价

type C = { x: number };
type D = { readonly x: number }; // 不等价
```
