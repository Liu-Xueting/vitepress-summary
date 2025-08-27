# 如何实现多端代码分割与按需加载

## 基于构建工具的代码分割（Webpack/Vite示例）

### Webpack配置示例

```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        mobile: {
          test: /[\\/]src[\\/]mobile[\\/]/, // 移动端代码
          name: 'mobile-bundle',
          priority: 20
        },
        desktop: {
          test: /[\\/]src[\\/]desktop[\\/]/, // PC端代码
          name: 'desktop-bundle',
          priority: 10
        }
      }
    }
  }
};
```

## 动态导入（Dynamic Import）

```javascript
// 根据设备类型动态加载
const loadDeviceModule = async () => {
  if (isMobile()) {
    return import(/* webpackChunkName: "mobile" */ './mobile/main');
  } else {
    return import(/* webpackChunkName: "desktop" */ './desktop/main');
  }
};

// 使用
loadDeviceModule().then(module => {
  module.initApp();
});
```

## 多端识别策略

```javascript
// 设备检测工具函数
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    .test(navigator.userAgent);
};

// 增强版：结合媒体查询
const isMobileAdvanced = () => {
  return window.matchMedia('(max-width: 768px)').matches || 
         navigator.userAgent.match(/Mobi/);
};
```

## React 按端加载组件

```javascript
import React, { lazy, Suspense } from 'react';

const MobileComponent = lazy(() => import('./MobileComponent'));
const DesktopComponent = lazy(() => import('./DesktopComponent'));

const ResponsiveComponent = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {isMobile() ? <MobileComponent /> : <DesktopComponent />}
    </Suspense>
  );
};
```
