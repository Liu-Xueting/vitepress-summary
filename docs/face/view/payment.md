# 支付流程

## PC 端支付

1. 选择支付方式
用户在支付页面选择所需的支付方式。

2. 提交支付请求
用户点击支付按钮，系统将生成支付请求并提交到支付网关。

3. 获取支付链接和预支付数据展示支付二维码

```js
// 假设使用支付宝支付
const paymentData = {
  amount: 100, // 支付金额
  method: 'alipay', // 支付方式
  orderId   
: '123456789' // 订单号
};
const paymentUrl = generatePaymentUrl(paymentData); // 生成支付链接
document.getElementById('payment-qr').src = paymentUrl; // 显示二维码
```

或者后端返回支付链接，前端使用二维码展示 使用 `QRCode.js` 库生成二维码。

```js
$.ajax({
    type: 'get',
    url: url,
    dataType: "json",
    success: function (res) {
        layer.close(loading);
        var no = res.no;
        new QRCode(document.getElementById("wx_ewm"),{//对象
            text: decodeURIComponent(res.url),//解码微信支付二维码
            width: 120,//二维码大小
            height: 120,//二维码高
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H//级别
        } );
        var url = "";//回调url
        var data = {'no': no};//订单号
        clearInterval(timer);
        timer = setInterval(function(){
            $.post(url,data,function(res){
                if(res == 'yes'){
                    parent.location.href = "";//支付成功跳转地址
                }
            })
        },3000)
    },
    error: function (res) {
        console.log(res)
    }
});
```

4. 轮询查询支付状态

```js
var timer = setInterval(function(){
    $.post(url,data,function(res){
        if(res == 'yes'){
            parent.location.href = "";//支付成功跳转地址
        }
    })
},3000);
```

## 移动端支付

- 先获取 code授权码
- 根据 code 获取用户的OpenID
- 创建预支付交易会话标识（prepay_id）
- 根据 prepay_id 向后台发送请求获取支付参数
- 调用微信支付API进行支付

1. 获取用户的OpenID

要获取用户的OpenID，首先需要将用户引导到微信的授权页。通过微信公众平台提供的OAuth2.0接口，可以获取用户的基本信息和OpenID。具体步骤如下：

   1. 用户点击支付按钮，前端跳转到微信授权页面。
   2. 用户同意授权后，微信会重定向到你配置的回调URL，并带上一个code参数。
   3. 通过这个code参数，向微信服务器请求用户的OpenID。

这里忽略了调取授权页面 需要用到 OAuth2.0 接口获取 code

```js
// 示例代码
const getOpenId = async (code) => {
  const response = await fetch(`/api/getOpenId?code=${code}`);
  const data = await response.json();
  return data.openId;
};
```

1. 生成预支付交易会话标识（prepay_id）

获取OpenID后，需要向你的服务器请求生成预支付交易会话标识（prepay_id）。这一步需要服务器与微信支付服务器进行交互，服务器端会将支付信息发送到微信支付服务器，微信支付服务器返回一个prepay_id。

```js
// 示例代码
const createPrepayId = async (openId, amount) => {
  const response = await fetch('/api/createPrepayId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ openId, amount }),
  });
  const data = await response.json();
  return data.prepay_id;
};
```

3. 调起微信支付

获取到prepay_id后，前端需要调用微信的支付API，调起微信支付界面。

- 调用微信支付API时，需要传递一些必要的参数，包括appId、timeStamp、nonceStr、package（即prepay_id）、signType和paySign。这些参数需要由后端生成并返回给前端。

```js
// 示例代码
const getPayParameters = async (prepayId) => {
  const response = await fetch(`/api/getPayParameters?prepayId=${prepayId}`);
  const data = await response.json();
  return data;
};
```

- 调用微信支付API

获取支付参数后，可以使用微信提供的WeixinJSBridge对象调用支付API。

```js
// 调用微信支付API
const invokeWeChatPay = (payParameters) => {
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',
    {
      appId: payParameters.appId,
      timeStamp: payParameters.timeStamp,
      nonceStr: payParameters.nonceStr,
      package: payParameters.package,
      signType: payParameters.signType,
      paySign: payParameters.paySign
    },
    (res) => {
      if (res.err_msg === "get_brand_wcpay_request:ok") {
        // 支付成功
        alert('支付成功');
      } else {
        // 支付失败
        alert('支付失败');
      }
    }
  );
};

```

这里后端使用 微信支付 SDK 进行创建预支付订单

```js
import React, { useEffect } from 'react';
import axios from 'axios';
import stores from './stores'; // 你的数据存储
import utils from './utils'; // 你的工具函数
 
function YourPaymentComponent() {
  const isWechatBrowser = () => {
    // 判断是否在微信内置浏览器中
    return /MicroMessenger/i.test(navigator.userAgent);
  };
 
  // 1. 跳转重定向获取code、一定要配置好相同域名的url才可以获取到code Oauth2.0
  const getWhatCodeLinks = () => {
    // 获取跳转链接并调起微信支付
    if (utils.IsWeixin()) {
      let mLocation = this.history.location;
      let rediectUrl = `${window.location.origin + mLocation.pathname}`;
      const growWhatUrl = '微信开发者平台配置的获取code链接';
      window.location.href = growWhatUrl;
    }
  };
 
  // 2. 请求获取code并存储
  const getOpenid = async (code) => {
    // 获取用户的openid
    const url = '获取openid的接口';
    const data = {
      code,
      appId: '配置的appid',
    };
 
    try {
      const response = await axios.post(url, data);
      const responseData = JSON.parse(response.data.data);
      this.openId = responseData.openid;
      localStorage.setItem('openid', this.openId);
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  // 3. 点击事件请求支付接口
  const sendPostRequest = async (openid) => {
    const userId = stores.Frame.userInfo && stores.Frame.userInfo.userId;
    const phone = stores.Frame.userInfo && stores.Frame.userInfo.phone;
    const url = '支付接口';
    const timestamp = Date.now();
    const requestData = {
      wayCode: 'WX_JSAPI',
      amount: 0.1, // 支付金额
      appId: '配置的appid',
      mchOrderNo: `M${timestamp}`,
      payDataType: 'codeImgUrl',
      authCode: '',
      divisionMode: 0,
      orderTitle: `活动名称${phone}`,
      mchId: 'M1686658386',
      openId: openid,
      body: userId,
    };
 
    try {
      const response = await axios.post(url, requestData);
      const responseData = JSON.parse(response.data.data.payData);
      invokeWechatPayPhone(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  // 4. 请求微信支付回调、原生自带的API
  const invokeWechatPayPhone = (prepayData) => {
    if (!isWechatBrowser()) {
      console.error('Not in WeChat browser');
      successCopy();
      return;
    }
 
    if (typeof WeixinJSBridge === 'undefined') {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
        // 唤醒微信支付工作台
      WeixinJSBridge.invoke('getBrandWCPayRequest', prepayData, function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          console.log('Payment successful');
          stores.Frame.success('支付成功');
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          console.log('Payment cancelled');
          stores.Frame.warning('取消支付');
        } else {
          stores.Frame.warning('支付失败');
          console.error('Payment failed');
        }
      });
    }
  };
 
  useEffect(() => {
    // 在组件加载时执行的初始化逻辑
    const code = 'your_wechat_code'; // 你的微信code
    getOpenid(code);
  }, []);
 
  return (
    // Your component JSX
  );
}
 
export default YourPaymentComponent;
```

**补充**：

`WeixinJSBridge` 使用

```bash
pnpm i weixin-jsbridge --save
```

```js
import Vue from 'vue'
import WeixinJSBridge from 'weixin-jsbridge'
Vue.use(WeixinJSBridge)
```

## 微信小程序

- 先获取 code授权码
- 根据 code 获取用户的OpenID
- 创建预支付交易会话标识（prepay_id）
- 根据 prepay_id 向后台发送请求获取支付参数
- 调用微信支付API进行支付

在微信小程序前端，你需要调用你的后端接口，以获取支付参数。假设你的后端接口为/api/getPayParams

```js
// 微信小程序支付示例
// pages/pay/pay.js
Page({
  data: {
    orderId: '', // 订单ID
  },
 
  onLoad: function (options) {
    // 从页面参数中获取订单ID
    this.setData({
      orderId: options.orderId
    });
  },
 
  initiatePayment: function () {
    const that = this;
    wx.request({
      url: 'https://your-backend.com/api/getPayParams',
      method: 'POST',
      data: {
        orderId: that.data.orderId,
      },
      success: function (res) {
        const payParams = res.data;
        that.wxPay(payParams);
      },
      fail: function (error) {
        console.error('Failed to get payment parameters:', error);
      }
    });
  },
 
  wxPay: function (payParams) {
    wx.requestPayment({
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.package,
      signType: payParams.signType,
      paySign: payParams.paySign,
      success: function (res) {
        console.log('Payment success:', res);
        // 处理支付成功的逻辑
      },
      fail: function (error) {
        console.error('Payment failed:', error);
        // 处理支付失败的逻辑
      }
    });
  }
});
```
