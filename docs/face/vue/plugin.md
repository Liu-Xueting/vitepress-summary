# Vue 项目中常用插件

## 目录

- [Vue Router](#vue-router)
- [Vuex](#vuex)
- [Pinia](#pinia)
- [Axios](#axios)
- [Element Plus](#element-plus)
- [Vant](#vant)
- [Echarts](#echarts)
- [Dayjs](#dayjs)
- [Lodash](#lodash)
- [Moment](#moment)
- [Vue I18n](#vue-i18n)
- [VueUse](#vueuse)
- [NProgress](#nprogress)
- [Vue Draggable Next](#vue-draggable-next)
- [Vue3-Carousel](#vue3-carousel)
- [Vue3-Leaflet](#vue3-leaflet)
- [Vue3-ApexCharts](#vue3-apexcharts)
- [vue-pdf-embed](#vue-pdf-embed)

## vue-pdf-embed

用于在 Vue 应用中嵌入和显示 PDF 文件的插件，基于 PDF.js 库。

### 安装

```bash
npm install vue-pdf-embed
```

### 使用

```js
import { createApp } from 'vue';
import App from './App.vue';
import VuePdfEmbed from 'vue-pdf-embed';
import 'vue-pdf-embed/dist/vue-pdf-embed.css';

const app = createApp(App);
app.use(VuePdfEmbed);
app.mount('#app');
```

### 示例

```vue
<template>
  <div>
    <pdf-embed src="path/to/your/file.pdf" style="width: 100%; height: 600px;"></pdf-embed>
  </div>
</template>
<script>
export default {
  name: 'PdfViewer',
};
</script>
```

## excel 导入导出

用于在 Vue 应用中处理 Excel 文件的插件，支持导入和导出功能。

### 安装

```bash
npm install xlsx file-saver
```

### 使用

```js
import { createApp } from 'vue';
import App from './App.vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const app = createApp(App);
app.mount('#app');
```

### 示例

```vue
<template>
  <div>
    <button @click="exportExcel">导出 Excel</button>
    <input type="file" @change="importExcel" />
  </div>
</template>
<script>
export default {
  name: 'ExcelHandler',
  methods: {
    exportExcel() {
      const data = [
        { name: '张三', age: 28 },
        { name: '李四', age: 32 },
      ];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
      saveAs(blob, 'data.xlsx');
    },
    importExcel(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];  
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
      };
      reader.readAsArrayBuffer(file);
    },
  },
};
</script>
