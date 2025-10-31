# 文件上传与下载

注意点：

- 获取视频、图片、文件等响应数据为 Blob 对象时，需要在 封装的请求函数中设置 **`responseType: 'blob'`**，否则会报错。
- 上传文件时，`Content-Type` 需要设置为 `multipart/form-data`，否则会报错。
- 上传文件时，`FormData` 对象的 key 需要与后端接口要求的 key 一致，否则会报错。
- 上传文件时，`FormData` 对象的 value 需要是 `File` 对象，否则会报错。
- 上传文件时，`FormData` 对象可以添加其他字段，但需要与后端接口要求的字段一致，否则会报错。
