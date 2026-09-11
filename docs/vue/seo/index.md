# vue 项目做 seo 优化

在使用 Vue.js 构建单页应用（SPA）时，SEO 优化是一个重要的考虑因素。由于 SPA 通常依赖于客户端渲染，搜索引擎爬虫可能无法正确索引页面内容。以下是一些在 Vue 项目中进行 SEO 优化的常用方法：

## 1. 路由历史模式

使用 Vue Router 的历史模式（history mode）可以使 URL 更加友好，有助于搜索引擎索引页面内容。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
});
```

## 2. 为页面添加添加标题、描述、keywords

使用 `vue-meta` 或 `@vueuse/head` 等库，可以动态设置每个页面的标题和元标签。

```bash
npm install @vueuse/head
```

```js
import { createHead } from '@vueuse/head'

const head = createHead()
app.use(head)
```

在组件中使用：

```js
import { useHead } from '@vueuse/head'

useHead({
  title: '新闻-open-aiweb',
  meta: [
    { name: 'description', content: '最新新闻与活动资讯' },
    { name: 'keywords', content: '新闻, 活动, AI' },
    // 需要优化社交分享展示时添加以下 Open Graph 元标签
    { property: 'og:title', content: '新闻 - open-aiweb' },// 分享卡片标题
    { property: 'og:description', content: '最新新闻与活动资讯' },// 分享卡片描述
    { property: 'og:type', content: 'website' }  //  页面类型 website、article、product
  ],
  link: [
    { rel: 'canonical', href: typeof window !== 'undefined' ? window.location.href : '' }
  ]
})
```

## 3. 语义化标签 header  <footer> <nav>  <main>

使用语义化的 HTML 标签有助于搜索引擎理解页面结构和内容。例如，使用 `<header>`、`<footer>`、`<nav>` 和 `<main>` 标签来定义页面的不同部分。

## 4. 图片加alt

为图片添加 `alt` 属性，描述图片内容，有助于搜索引擎理解图片信息，同时提升无障碍体验。

## 5. 服务器端渲染（SSR）

### 5.1 vue + ssr

1. 安装

```bash
npm install vue-server-renderer express --save
```

1. 创建文件

- src/app.js  Vue应用实例

```js
import { createApp as _createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import { createRouter } from './router'

export function createApp() {
  const app = _createApp(App)
  const router = createRouter()
  const pinia = createPinia()
  const head = createHead()

  pinia.use(piniaPersist)
  app.use(pinia)
  app.use(router)
  app.use(head)
  app.use(ElementPlus)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  return { app, router, head }
}
```

- src/entry-client.js  客户端入口

```js
import { createApp } from './app'

const { app, router } = createApp()

router.isReady().then(() => {
  app.mount('#app')
})

```

- src/entry-server.js  服务端入口

```js
mport { createApp } from './app'
import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'

export async function render(url, manifest) {
  const { app, router, head } = createApp()

  await router.push(url)
  await router.isReady()

  const appHtml = await renderToString(app)
  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)

  return {
    appHtml,
    headTags,
    htmlAttrs,
    bodyAttrs,
  }
}
```

- server.js  Node服务器

```js
import fs from 'fs'
import path from 'path'
import express from 'express'

const isProd = process.env.NODE_ENV === 'production'
const __dirname = path.dirname(new URL(import.meta.url).pathname)

async function createServer(root = process.cwd()) {
  const resolve = (p) => path.resolve(root, p)
  const app = express()

  let vite
  let template
  let render

  if (!isProd) {
    // Dev: use Vite in middleware mode
    const { createServer: createVite } = await import('vite')
    vite = await createVite({
      root,
      server: { middlewareMode: true, hmr: { port: 25000 } },
      appType: 'custom',
    })
    app.use(vite.middlewares)
    template = fs.readFileSync(resolve('index.html'), 'utf-8')
  } else {
    // Prod: serve built client
    app.use('/assets', express.static(resolve('dist/client/assets'), { maxAge: '1y', immutable: true }))
    template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  }

  app.use(async (req, res) => {
    try {
      const url = req.originalUrl
      let html = template

      if (!isProd) {
        html = await vite.transformIndexHtml(url, html)
        const mod = await vite.ssrLoadModule('/src/entry-server.js')
        render = mod.render
      } else {
        const { render: renderProd } = await import('./dist/server/entry-server.js')
        render = renderProd
      }

      const { appHtml, headTags, htmlAttrs, bodyAttrs } = await render(url)

      html = html
        .replace('<!--app-head-->', headTags || '')
        .replace('<html', `<html ${htmlAttrs || ''}`)
        .replace('<body', `<body ${bodyAttrs || ''}`)
        .replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  const port = process.env.PORT || 8070
  app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`)
  })
}

createServer()
```

- vite.config.js  Vite配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ command }) => {
  return {
    ssr: {
      noExternal: ['element-plus', '@vueuse/head']
    },
  }
})
```

- index.html  HTML模板

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--app-head-->
  </head>
  <body>
    <div id="app"><!--app-html--></div>
    <script type="module" src="/src/entry-client.js"></script>
  </body>
</html>
```

### 5.2 使用 Nuxt.js

Nuxt.js 是一个基于 Vue.js 的框架，内置了服务器端渲染（SSR）和静态站点生成（SSG）功能，非常适合用于 SEO 优化。使用 Nuxt.js 可以简化许多 SSR 相关的配置和实现。

[Nuxt.js 官方文档](https://nuxt.com/docs/3.x/getting-started/installation)

## 6. 其他优化建议

- 优化页面加载速度：使用代码分割、懒加载等技术提升页面加载速度，改善用户体验和 SEO 排名。
- 提交网站地图（sitemap）：向搜索引擎提交网站地图，帮助爬虫更好地索引网站内容。
- 使用结构化数据：通过添加结构化数据（如 JSON-LD）来帮助搜索引擎理解页面内容和结构。

## 注意

使用 vue + ssr 在发送请求时，

1. 如果需要首屏直接展示真实数据（SEO 友好、无闪烁），需要服务端获取数据 (如果首屏直接获取 会出现
首屏闪烁：先显示默认数据 → 后加载真实数据)

```js
// 在服务端入口文件 src/entry-server.js 中

import { createApp } from './app'
import { renderToString } from '@vue/server-renderer'
import { renderHeadToString } from '@vueuse/head'
import axios from 'axios'

export async function render(url, manifest) {
  const { app, router, head } = createApp()

  await router.push(url)
  await router.isReady()

  // ✅ 服务端获取数据
  let initialCards = []
  if (url === '/' || url === '/index') {
    try {
      const res = await axios.get('http://your-api.com/api/products')
      initialCards = res.data
    } catch (error) {
      console.error('Failed to fetch data on server:', error)
    }
  }

  // ✅ 将数据传给组件
  const route = router.currentRoute.value
  if (route.matched[0]?.components?.default) {
    route.meta.initialCards = initialCards
  }

  const appHtml = await renderToString(app)
  const { headTags, htmlAttrs, bodyAttrs } = renderHeadToString(head)

  return {
    appHtml,
    headTags,
    htmlAttrs,
    bodyAttrs,
  }
}
```

```vue
<!-- 在需要数据的组件中，例如 Home.vue -->

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cards = ref(route.meta?.initialCards || [])

// ✅ 客户端水合后，如果需要更新数据
onMounted(async () => {
  // 如果需要刷新数据或首次获取
  if (cards.value.length === 0) {
    try {
      const res = await axios.get('/api/products')
      cards.value = res.data
    } catch (error) {
      console.error(error)
    }
  }
})
</script>
  ```

1. 适合在 onMounted 中获取的数据

用户交互数据 - 不影响 SEO，不需要首屏展示

```js
onMounted(async () => {
  // ✅ 这些适合在 onMounted 中获取
  const userCollections = await fetchUserCollections() // 用户收藏列表
  const userPreferences = await fetchUserPreferences()  // 用户偏好设置
  const recommendations = await fetchRecommendations()  // 个性推荐
  
  // ✅ 这些也可以，因为是交互产生的
  // 搜索结果、筛选结果、分页数据等
})
```

比如：

cards 数据是首屏展示的主要内容 → 应该在服务端预取
handleLike、handleFilter 这些交互后的变化 → onMounted 中可以获取对应数据

| 使用场景 | 推荐方式 | 原因 |
| -------- | -------- | ---- |
| 首屏展示的主要数据 | entry-server.js | SSR 友好、SEO 优化、无闪烁 |
| 用户个性数据 | onMounted | 依赖用户身份、不需要 SEO |
| 交互后的数据 | onMounted | 用户操作触发 |
| DOM 操作 | onMounted | 必须，只能在客户端 |
