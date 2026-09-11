# 大文件上传

注意点：

- 获取视频、图片、文件等响应数据为 Blob 对象时，需要在 封装的请求函数中设置 **`responseType: 'blob'`**，否则会报错。
- 上传文件时，`Content-Type` 需要设置为 `multipart/form-data`，否则会报错。
- 上传文件时，`FormData` 对象的 key 需要与后端接口要求的 key 一致，否则会报错。
- 上传文件时，`FormData` 对象的 value 需要是 `File` 对象，否则会报错。
- 上传文件时，`FormData` 对象可以添加其他字段，但需要与后端接口要求的字段一致，否则会报错。

## 分片上传

分片上传，就是将所要上传的文件，按照一定的大小，将整个文件分隔成多个数据块（Part）来进行分片上传
上传完之后再由服务端对所有上传的文件进行汇总整合成原始的文件
大致流程如下：

1. 将需要上传的文件按照一定的分割规则，分割成相同大小的数据块；
2. 初始化一个分片上传任务，返回本次分片上传唯一标识；
3. 按照一定的策略（串行或并行）发送各个分片数据块；
4. 发送完成后，服务端根据判断数据上传是否完整，如果完整，则进行数据块合成得到原始文件

## 断点续传

断点续传指的是在下载或上传时，将下载或上传任务人为的划分为几个部分
每一个部分采用一个线程进行上传或下载，如果碰到网络故障，可以从已经上传或下载的部分开始继续上传下载未完成的部分，而没有必要从头开始上传下载。用户可以节省时间，提高速度
一般实现方式有两种：

- 服务器端返回，告知从哪开始
- 浏览器端自行处理
上传过程中将文件在服务器写为临时文件，等全部写完了（文件上传完），将此临时文件重命名为正式文件即可
如果中途上传中断过，下次上传的时候根据当前临时文件大小，作为在客户端读取文件的偏移量，从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可

在前端，我们通过 JavaScript 的 `File.slice()` 方法将大文件切割成多个小的分片，然后逐个分片上传到后端。这样可以避免在上传过程中遇到的大文件上传性能瓶颈，且支持断点续传。

1. 选择文件并切割成分片
我们需要先选择文件，并通过 `slice()` 方法将大文件切割成多个小块（即分片）。每个分片会单独上传。每次上传文件分片时，我们会附带必要的元数据（如文件名、总分片数、当前分片编号等）来帮助后端完成文件合并

```html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文件分片上传</title>
    <style>
      /* 样式 */
      .success { color: green; }
      .error { color: red; }
    </style>
  </head>
  <body>

    <div class="container">
      <h1>文件分片上传</h1>
      <form id="uploadForm">
        <label for="file">选择文件:</label>
        <input type="file" id="file" name="file" required>
        <br><br>
        <button type="submit">上传文件</button>
      </form>
      <div id="message" class="message"></div>
      <div>
        <label>上传进度：</label>
        <progress id="uploadProgress" value="0" max="100" style="width: 100%;"></progress>
        <span id="progressPercentage">0%</span>
      </div>
    </div>

    <script>
      const form = document.getElementById('uploadForm');
      const messageDiv = document.getElementById('message');
      const progressBar = document.getElementById('uploadProgress');
      const progressPercentage = document.getElementById('progressPercentage');
      const chunkSize = 1024 * 1024; // 每个分片的大小（1MB）

      // 获取已上传的分片列表
      function getUploadedChunks(identifier) {
        return fetch(`/api/upload/check?identifier=${identifier}`)
          .then(response => response.ok ? response.json() : [])
          .then(result => result.uploadedChunks || []);
      }

      // 上传当前分片
      function uploadChunk(file, chunkNumber, totalChunks, identifier) {
        const chunk = file.slice(chunkNumber * chunkSize, (chunkNumber + 1) * chunkSize);
        const formData = new FormData();
        formData.append('file', chunk);
        formData.append('filename', file.name);
        formData.append('totalChunks', totalChunks);
        formData.append('chunkNumber', chunkNumber + 1); // 当前分片的编号
        formData.append('identifier', identifier);

        return fetch('/api/upload/chunk', {
          method: 'POST',
          body: formData,
        })
          .then(response => {
            if (!response.ok) throw new Error('分片上传失败');
            return response.text();
          });
      }

      form.onsubmit = function(e) {
        e.preventDefault();  // 阻止表单的默认提交行为
        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];  // 获取选择的文件
        const totalChunks = Math.ceil(file.size / chunkSize);  // 计算分片总数
        const identifier = file.name + "_" + Date.now();  // 为文件生成唯一标识符

        // 获取已上传的分片列表
        getUploadedChunks(identifier)
          .then(uploadedChunks => {
            let chunkNumber = uploadedChunks.length;  // 从已上传的分片之后开始上传
            const totalSize = file.size;  // 文件的总大小

            // 更新进度条
            function updateProgress(totalSize, uploadedSize) {
              uploadedSize = Math.min(uploadedSize, totalSize);
              const progress = (uploadedSize / totalSize) * 100; // 计算进度
              progressBar.value = progress;
              progressPercentage.textContent = `${Math.round(progress)}%`;
            }

                // 上传下一个分片
            function uploadNextChunk() {
                if (chunkNumber < totalChunks) {
                    return uploadChunk(file, chunkNumber, totalChunks, identifier)
                        .then(result => {
                            messageDiv.innerHTML = `<span class="success">${result}</span>`;
                            chunkNumber++;  // 上传成功后，进入下一个分片
                            const uploadedSize = chunkNumber * chunkSize; // 已上传的大小
                            updateProgress(totalSize, uploadedSize);  // 更新进度条
                            return uploadNextChunk();  // 上传下一个分片
                        })
                        .catch(error => {
                            messageDiv.innerHTML = `<span class="error">${error.message}</span>`;
                            // 如果上传失败，重试当前分片
                            return new Promise(resolve => setTimeout(resolve, 3000))  // 等待 3 秒重试
                                .then(() => uploadNextChunk());
                        });
                } else {
                    // 确保进度条显示为100%并显示上传完成
                    updateProgress(totalSize, totalSize);
                    messageDiv.innerHTML += "<span class='success'>文件上传完成！</span>";
                    return Promise.resolve();  // 上传完成
                }
            }

            uploadNextChunk();  // 开始上传分片
        })
        .catch(error => {
            messageDiv.innerHTML = `<span class="error">${error.message}</span>`;
        });
    };
</script>

</body>
</html>
```
