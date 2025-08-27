```js

function bubbleSort(arr) {
    for(let i = 0;i < arr.length - 1; i++) {
        for(let j = 0;j < arr.length-1-i;j++) {
            if(arr[j] > arr[j+1]) {
                let tmp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = tmp
            }
        }
    }
    return arr
}
```

```js

function binarySearch(arr, target) {
    let left = 0
    let right = arr.length - 1
    while(left < right) {
        let mid = Math.floor((left + right) / 2)
        if(arr[mid] > target) {
            right = mid - 1
        } else if(arr[mid] < target) {
            left = mid + 1
        } else {
            return mid
        }
    }
    return -1
}

```

```js

function insertSort(arr) {
    const n = arr.length
    for(let i = 1;i < n;i++) {
        const key = arr[i]
        let j = i-1
        while(j>=0 && arr[j]>key){
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
    return arr
}
```

```js

function selectionSort(arr) {
    const n = arr.length
    for(let i = 0;i < n - 1;i++){
        const minIndex = i
        for(let j = i + 1;j < n; j++) {
            if(arr[j] < arr[minIndex]){
                minIndex = j
            }
        }
        if(i != minIndex) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
        }
    }
    return arr
}

```

```js

function quickSort(arr, left, right) {
    const pivot = partition(arr, left, right)
    quickSort(arr, left, pivot-1)
    quickSort(arr, pivot+1, right)
    return arr
}

function partition(arr, left, right) {
    let i = left
    let j = right
    const base = arr[left]
    while(i < j) {
        while(i < j && arr[j] >= base) {
            j--
        }
        if(i < j) {
            arr[i] = arr[j]
            i++
        }
        while(i < j && arr[i] <= base) {
            i++
        }
        if(i < j) {
            arr[j] = arr[i]
            j--
        }
    }
    arr[i] = base
    return i
}
```

```js

function mergeSort(arr) {
    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

function merge(left, right) {
    let i = 0
    let j = 0
    const result = []
    while(i < left.length && j < right.length) {
        if(arr[i] <= arr[j]){
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }
    while(i < left.lngth) {
        result.push(left[i])
            i++
    }
    while(j < right.lngth) {
        result.push(right[j])
            j++
    }
    return result
}
```

```js

const isObj = (obj) => return obj != null && typeof obj === 'object'

function deepClone(obj) {
    const newObj = Array.isArray(obj) ? [] : {}
    for(let key in obj) {
        const item = obj[key]
        newObj[key] = isObj(item) ? deepClone(item) : item
    }
    return newObj
}
```

```js

const treeData = (data) => {
    const map = new Map()
    const result = []

    data.forEach((item) => {
        map.set(item.id, {...item, children: []})
    })

    data.forEach((item) => {
        const node = map.get(item.id)
        if(item.parentId) {
            const parent = map.get(item.parentId)
            if(parent){
            parent.children.push(node)
            }
        } else {
            result.push(node)
        }
    })

    return result
}
```
