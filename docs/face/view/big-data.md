# 前端接受1万条数据 怎么渲染不卡 / 长列表压缩

## 1. 使用虚拟滚动

- 使用虚拟列表技术，**只渲染可视区域内的元素**，减少DOM节点数量，提高性能。
- 例如，使用`react-window`或`react-virtualized`等库来实现虚拟列表。

### 1.1 react-window

```bash
npm install react-window
```

```javascript
import { FixedSizeList as List } from 'react-window';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Row = ({ index, style }) => (
  <div className="row" style={style}>
    Row {index}
  </div>
);
const App = () => (
  <List
    height={150}
    itemCount={10000}
    itemSize={35}
    width={300}
  >
    {Row}
  </List>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

### 1.2 react-virtualized

```bash

npm install react-virtualized
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { AutoSizer, List } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import './index.css';

const rowRenderer = ({ index, key, style }) => (
  <div key={key} style={style}>
    Row {index}
  </div>
);

const App = () => (
  <AutoSizer>
    {({ height, width }) => (
      <List
        height={height}
        rowCount={10000}
        rowHeight={35}
        rowRenderer={rowRenderer}
        width={width}
      />
    )}
  </AutoSizer>
);
ReactDOM.render(<App />, document.getElementById('root'));
```

### 1.3 vue-virtual-scroller

```bash
npm install vue-virtual-scroller
```

```vue
<template>
  <RecycleScroller
    class="scroller"
    :items="bigData"
    :item-size="50"
    key-field="id"
  >
    <template #default="{ item }">
      <div class="item">{{ item.text }}</div>
    </template>
  </RecycleScroller>
</template>

<script>
import { RecycleScroller } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

export default {
  components: { RecycleScroller },
  data() {
    return {
      bigData: Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        text: `Item ${i}`,
      })),
    };
  },
};
</script>

<style scoped>
.scroller {
  height: 500px;
}
.item {
  height: 50px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
</style>
```

## 2. 分片渲染

- 将数据分成多个小块，逐步渲染到页面上，而不是一次性渲染所有数据。
- 例如，使用`setTimeout`或`requestAnimationFrame`来分批渲染数据。
- `requestAnimationFrame()` 方法会告诉浏览器你希望执行一个动画。它**要求浏览器在下一次重绘之前，调用用户提供的回调函数**。

```vue
<template>
  <div>
    <!-- 渲染已加载的数据 -->
    <div v-for="item in visibleData" :key="item.id">{{ item.text }}</div>
    <!-- 加载中的提示 -->
    <div v-if="isLoading">加载中...</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    // 原始数据：1万条
    const allData = ref(
      Array.from({ length: 10000 }, (_, i) => ({
        id: i,
        text: `Item ${i}`,
      }))
    );

    // 当前已渲染的数据
    const visibleData = ref([]);
    // 每次渲染的数据量
    const chunkSize = 100;
    // 当前渲染到的位置
    const currentIndex = ref(0);
    // 是否正在加载
    const isLoading = ref(false);

    // 分片渲染函数
    const renderChunk = () => {
      isLoading.value = true;
      const end = currentIndex.value + chunkSize;
      // 截取下一块数据
      visibleData.value = allData.value.slice(0, end);
      currentIndex.value = end;

      if (end < allData.value.length) {
        // 使用 requestAnimationFrame 继续渲染下一块
        requestAnimationFrame(renderChunk);
      } else {
        isLoading.value = false;
      }
    };

    // 组件挂载后开始渲染
    onMounted(() => {
      renderChunk();
    });

    return { visibleData, isLoading };
  },
};
</script>
```

## 3. 分页加载

将数据分页加载，每次只渲染当前页的数据。

```vue
<template>
  <div>
    <div v-for="item in currentPageData" :key="item.id">{{ item.text }}</div>
    <button @click="prevPage">上一页</button>
    <button @click="nextPage">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allData: Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Item ${i}` })),
      currentPage: 1,
      pageSize: 100,
    };
  },
  computed: {
    currentPageData() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.allData.slice(start, end);
    },
  },
  methods: {
    prevPage() { this.currentPage--; },
    nextPage() { this.currentPage++; },
  },
};
</script>
```

## 4. 使用 Web Worker

- 将数据处理和渲染逻辑放在 Web Worker 中，避免阻塞主线程。
- Web Worker 是一种在后台线程中运行 JavaScript 的方式，可以用于处理大量数据而不影响 UI 渲染。

```javascript
// worker.js
self.onmessage = function (e) {
  const data = e.data;
  // 处理数据
  const processedData = data.map(item => item * 2);
  // 将处理后的数据发送回主线程
  self.postMessage(processedData);
};
```

```javascript
// main.js
const worker = new Worker('worker.js');
const data = Array.from({ length: 10000 }, (_, i) => i);
worker.postMessage(data);
worker.onmessage = function (e) {
  const processedData = e.data;
  // 更新 UI
  console.log(processedData);
};
```

## 5. 数据冻结

- 使用`Object.freeze()`冻结数据对象，**防止不必要的重新渲染**。
- 这可以减少 Vue 或 React 的虚拟 DOM 比较次数，提高性能。
- `Object.freeze()` 静态方法可以使一个对象被冻结。冻结对象可以防止扩展，并使现有的属性不可写入和不可配置。

```javascript
export default {
  data() {
    return {
      bigData: Object.freeze(
        Array.from({ length: 10000 }, (_, i) => ({
          id: i,
          text: `Item ${i}`,
        }))
      ),
    };
  },
};
```

## 6. 优化 Vue 3 响应式数据

使用 `shallowRef` 或 `shallowReactive`：减少深层响应式开销。

```javascript
import { shallowRef } from 'vue';

export default {
  setup() {
    const bigData = shallowRef(
      Array.from({ length: 10000 }, (_, i) => ({ id: i, text: `Item ${i}` }))
    );
    return { bigData };
  },
};
```
