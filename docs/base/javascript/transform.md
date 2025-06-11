# 进制转换

## 十进制转 X 进制

```javascript
function decToBase(num, base) {
  if (base < 2 || base > 36) {
    throw new Error('Base must be in the range 2-36');
  }
  return num.toString(base);
}
```

## X 进制转十进制

```javascript
function baseToDec(numStr, base) {
  if (base < 2 || base > 36) {
    throw new Error('Base must be in the range 2-36');
  }
  return parseInt(numStr, base);
}
```
