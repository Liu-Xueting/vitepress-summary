# TypeScript

TypeScript 是 JavaScript 的超集，通过添加静态类型系统和其他高级特性，显著提升了代码的可维护性和开发效率。本文将系统讲解 TypeScript 的核心概念，涵盖以下内容：

---

## 一、数据类型

### 1.1 基础类型

```typescript
let num: number = 42;          // 数字
let str: string = "Hello";     // 字符串
let bool: boolean = true;      // 布尔值
let arr: number[] = [1, 2];    // 数组（元素为 number）
let tuple: [string, number] = ["Alice", 30]; // 元组（固定长度）
enum Color { Red, Green = 2 }; // 枚举（默认数值，可手动赋值）
let notSure: any = "任意类型";  // 任意类型（慎用）
let nothing: void = undefined; // 无返回值（常用于函数）
let u: undefined = undefined;  // undefined
let n: null = null;            // null
```

### 1.2 特殊类型

```typescript
// Never：永远不会出现的值（如抛出错误）
function error(): never {
  throw new Error("Error!");
}

// 类型断言（强制指定类型）
let value: any = "123";
let strLength: number = (value as string).length;
```

---

## 二、接口（Interface）

### 2.1 对象形状约束

```typescript
interface User {
  name: string;
  age?: number;       // 可选属性
  readonly id: number; // 只读属性
}

const user: User = { 
  name: "Alice", 
  id: 1 
};
```

### 2.2 函数与索引类型

```typescript
// 函数类型接口
interface SearchFunc {
  (source: string, keyword: string): boolean;
}

// 可索引类型接口
interface StringArray {
  [index: number]: string; // 索引签名
}
```

---

## 三、类（Class）

### 3.1 基本语法

```typescript
class Animal {
  // 访问修饰符
  public name: string;        // 公开（默认）
  private secret: string;     // 仅类内部访问
  protected age: number;      // 类与子类可访问

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`);
  }
}
```

### 3.2 继承与抽象

```typescript
// 继承
class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

// 抽象类（不可实例化）
abstract class Shape {
  abstract getArea(): number; // 抽象方法
}
```

---

## 四、类型操作

### 4.1 联合与交叉类型

```typescript
type ID = string | number;  // 联合类型
type Person = User & { address: string }; // 交叉类型
```

### 4.2 泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg;
}

// 泛型接口
interface Response<T> {
  code: number;
  data: T;
}
```

### 4.3 类型工具

```typescript
type Keys = keyof User; // "name" | "age" | "id"
type UserNameType = User["name"]; // string
```

---

## 五、tsconfig.json 配置

### 5.1 核心配置项

```json
{
  "compilerOptions": {
    "target": "ES2020",       // 编译目标版本
    "module": "CommonJS",     // 模块系统
    "strict": true,           // 启用严格模式
    "outDir": "./dist",       // 输出目录
    "rootDir": "./src",       // 源码目录
    "esModuleInterop": true  // 兼容 CommonJS/ESM
  },
  "include": ["src/**/*"],    // 包含文件
  "exclude": ["node_modules"] // 排除文件
}
```

---

## 六、tsc 编译器

### 6.1 常用命令

```bash
# 初始化配置文件
tsc --init

# 编译所有 .ts 文件
tsc

# 监视模式（实时编译）
tsc -w

# 编译单个文件
tsc src/app.ts
```

---

## 七、TypeScript 优势总结

1. **类型安全**：编译时捕获类型错误，减少运行时 Bug
2. **代码智能提示**：IDE 基于类型提供自动补全
3. **可维护性**：显式类型定义提升代码可读性
4. **渐进式采用**：支持与 JavaScript 混合开发
5. **现代语法支持**：兼容 ES6+ 特性（如装饰器、可选链）

---

## 下一步学习建议

- **高级类型**：映射类型、条件类型、模板字面量类型
- **装饰器**：类、方法、属性装饰器实现元编程
- **工程化**：配置 Webpack/Vite 构建工具链
- **类型声明文件**：为第三方库编写 .d.ts 文件

TypeScript 通过严谨的类型系统为 JavaScript 生态注入强类型能力，是构建大型应用的理想选择。
