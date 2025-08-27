# ref

## ref 为什么要.value

ref 的基本数据类型绑定是使用 `Object.defineProperty` 来实现数据劫持的，是无法绑定基本类型的，所以 ref 的数据劫持是通过绑定一个对象的 value 属性来实现的。

ref 的数据劫持使用 geter 和 setter 实现的，因为 geter 和 setter 无法绑定基本类型，所以通过绑定一个对象（实例也是对象）的 value 属性来实现数据劫持。这也就是我们为什么在 script 中读取和修改 ref 定义的变量要通过打点 value 来实现

在 template 中会通过 target 形参来接收你传入需要被数据劫持的复杂类型，然后遍历 target，通过 isRef(res) 来判断你传入的参数是否有被 ref 标记过，如果是直接返回 res.value
