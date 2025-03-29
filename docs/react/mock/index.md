# Mock

在前后端分离的开发模式下，前端可以在没有实际后端接口的支持下先进行接口数据的模拟，进行正常的业务功能开发。

常见的Mock开发

1. 前端直接写假数据：纯静态，没有服务
2. 自研Mock平台：成本高，维护成本高
3. json-server等工具：有服务，成本低

实现步骤：

1. 安装json-server
   ```bash
    pnpm add json-server -D
    ```
2. 准备一个json文件
3. 添加启动命令
    ```json
     {
        "scripts": {
          "server": "json-server ./server/data.json --port 8888"
        }
     }
     ```
4. 访问接口进行测试
