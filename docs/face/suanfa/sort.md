# 排序算法

## 冒泡排序

```javascript
function bubbleSort(arr) {
    for(let i = 0;i < arr.length - 1; i++) {
        for(let j = 0;j < arr.length - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

```

## 选择排序

```javascript
function selectionSort(arr) {
    const n = arr.length;
    for(let i = 0;i < n - 1; i++) {
        let minIndex = i;
        for(let j = i + 1; j < n; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j; // 找到最小值的索引
            }
        }
        if(minIndex != i){
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]; // 交换
        }
    }
    return arr;
}

```

## 插入排序

```javascript
function insertSort(arr) {
    const n = arr.length;
    for(let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while(j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j]; // 将大于key的元素向后移动
            j--;
        }
        arr[j + 1] = key; // 将key插入到正确的位置
    }
    return arr;
}

```

## 快速排序

```javascript
function quickSort(arr, left, right) {
    if(arr.length <= 1) {
        return arr
    }
    const pivotIndex = Partition(arr, left, right);
    qickSort(arr, left, pivotIndex - 1);
    qickSort(arr, pivotIndex + 1, right);
    return arr;
}

function Partition(arr, left, right) {
    let i = left;
    let j = right;
    const base = arr[left];
    while(i < j) {
        while(i < j && arr[j] >= base) {
            j--;
        }   
        if(i < j ){
            arr[i] = arr[j];
            i++;
        } 
        while(i < j && arr[i] <= base) {
            i++;
        }
        if(i < j) {
            arr[j] = arr[i];
            j--;
        }
    }
    arr[i] = base; // 将基准元素放到正确的位置
    return i; // 返回基准元素的索引
}
```

## 归并排序

```javascript
function mergeSort(arr) {
    if(arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return mergr(left, right);
}

function merge(left, right){
    let i = 0;
    let j = 0;
    const result = [];
    while(i < left.length && j < right.length) {
        if(left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    while(i < left.length) {
        result.push(left[i]);
        i++;
    }
    while(j < right.length) {
        result.push(right[j]);
        j++;    
    }
    return result;
}
