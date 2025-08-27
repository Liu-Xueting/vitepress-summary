# 查找算法

## 快速查找

```javascript
function quickFind(arr, target) {
    let i = 0;
    while(i < arr.length) {
        if(arr[i] === target) {
            return i; // 返回目标元素的索引
        }
        i++;
    }
    return -1; // 如果未找到，返回-1
}

```

## 二分查找

```javascript
function binSearch(arr, target) {
    let left = 0;
    let right = arr.length -  1;
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] < target){
            mid = mid + 1;
        } else if (arr[mid] > target) {
            mid = mid - 1;
        } else {
            return mid; // 返回目标元素的索引
        }
    }
    return -1; // 如果未找到，返回-1
}
```
