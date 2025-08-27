# 大文件上传

## 整体思路

**前端**：

前端大文件上传网上的大部分文章已经给出了解决方案，核心是利用 `Blob.prototype.slice` 方法，和数组的 `slice` 方法相似，文件的 `slice` 方法可以返回原文件的某个切片
预先定义好单个切片大小，将文件切分为一个个切片，然后借助 http 的可并发性，同时上传多个切片。这样从原本传一个大文件，变成了并发传多个小的文件切片，可以大大减少上传时间
另外由于是并发，传输到服务端的顺序可能会发生变化，因此我们还需要给每个切片记录顺序

**后端**：

服务端负责接受前端传输的切片，并在接收到所有切片后合并所有切片
这里又引伸出两个问题

何时合并切片，即切片什么时候传输完成
如何合并切片

第一个问题需要前端配合，前端在每个切片中都携带切片最大数量的信息，当服务端接受到这个数量的切片时自动合并。或者也可以额外发一个请求，主动通知服务端进行切片的合并

## 前端部分

前端使用 Vue 作为开发框架，对界面没有太大要求，原生也可以，考虑到美观使用 Element-ui 作为 UI 框架

### 上传控件

```vue
<template>
   <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">upload</el-button>
  </div>
</template>
​
<script>
export default {
  data: () => ({
    container: {
      file: null
    }
  }),
  methods: {
     handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    async handleUpload() {}
  }
};
</script>

```
