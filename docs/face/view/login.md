
# 场景问题

微信登录流程

1. 申请账号创建应用 <https://open.weixin.qq.com/>
2. 获取应用的 AppID 和 AppSecret

开发

1. 创建项目
2. 修改 host
   要将当前开发地址 与 微信服务 redirect_uri 地址保持一致 ; 这样才能登录完成之后丝滑跳转 否则会被拦截

   修改 C:\Windows\System32\drivers\etc\hosts 文件
   添加下面一行

   ```txt
   127.0.0.1   www.example.com
   ```

    <www.example.com> -> 127.0.0.1  访问这个域名就会被代理到本地

补充：

Vue 项目改变项目 host 方法

1. 在 `vue.config.js` 中添加 `devServer` 配置

   ```js
   module.exports = {
     devServer: {
       host: '0.0.0.0', // 允许外部访问 或者填写 127.0.0.1
       port: 8080,
       allowedHosts: ['my-app']
     }
   }
   ```
2. 在 C:\Windows\System32\drivers\etc\hosts 文件中添加下面一行

   ```js
   127.0.0.1   my-app
   ```

之后就可以通过 <http://my-app:8080> 访问你的应用了

## PC 端扫码登录

1. 前端展示二维码 有一个 redirect_url 指向后端请求地址 前端轮询向后端查询登录状态
2. 后端接收扫描完二维码的请求 从 request中获取code  
3. 根据code 请求 access_token
4. 根据 access_token 获取用户信息 保存用户信息进数据库 返回给前端
5. 前端获取登录结果跳转到首页

## app 端登录

1. 前端点击登录之后 向后端发送登录请求
2. 后端请求 code - > access_token - > user_info 返回给前端
3. 前端获取登录结果跳转到首页

## 小程序端登录

1. 前端点击登录之后 调用 uni.login() 获取 code
2. 后端接收 code 请求 access_token 和 user_info 返回给前端

## 权限判断

- 按钮权限
  - 可以使用指令系统
  - 可以使用 `v-if` 进行判断 或者 点击事件中进行判断
- 页面权限
  - 路由守卫中进行判断

## 登录状态

- 登录状态可以通过 Vuex 存储在全局状态中
- 按钮
  - 在事件中根据 Vuex 中的登录状态进行判断
- 页面
  - 在路由守卫中进行判断 `beforeEach` 钩子函数中
