# JavaScript

## 案例

```js
// const content = chatHistory.value.map(item => {
//     if (item.role === 'TEACHER') {
//         return item.content;
//     }
// }).join('\n');
const content = chatHistory.value.filter(item => item.role === 'TEACHER').map(item => item.content).join('\n');
```

上述写法一会多出很多 \n 原因是 map 中不符合条件的也会返回 undefined，就会多一个 \n, 所以 **先过滤再合并**
