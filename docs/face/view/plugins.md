# 前端场景中好用的插件

本文档介绍了一些在前端场景中常用且好用的插件，涵盖了数据可视化、用户界面增强、性能优化等方面。

## js-table2excel

将 HTML 表格导出为 Excel 文件的插件，支持多种格式和样式。

安装

```bash
npm install js-table2excel
```

使用

```js
import Table2Excel from 'js-table2excel';

const table2excel = new Table2Excel();
table2excel.export(document.querySelectorAll('#my-table'), 'my-excel-file');
```

```js
function onExport() {
  const column = [
    {
      title: "姓名",
      key: "name",
      type: "text",
    },
    {
      title: "班级",
      key: "clazzName",
      type: "text",
    },
    {
      title: "实训案例",
      key: "caseName",
      type: "text",
    },
    {
      title: "案例开始时间",
      key: "createTime",
      type: "text",
    },
    {
      title: "当前进度",
      key: "progress",
      type: "text",
    },
    {
      title: "得分",
      key: "totalScore",
      type: "text",
    },
    {
      title: "客户数",
      key: "hide",
      type: "text",
    },
    {
      title: "总销售量",
      key: "orderNum",
      type: "text",
    },
    {
      title: "总销售额",
      key: "salesVolume",
      type: "text",
    },
    {
      title: "销售天数",
      key: "day",
      type: "text",
    },
  ]
  table2excel(column, caseList.value, "实训案例数据表")
}
```

## file-saver

用于在浏览器中保存文件的插件，支持多种文件格式。

安装

```bash
npm install file-saver
```

使用

```js
import { saveAs } from 'file-saver';

const blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' });
saveAs(blob, 'hello.txt');
```
