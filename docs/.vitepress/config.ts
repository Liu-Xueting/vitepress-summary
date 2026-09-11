import { defineConfig } from 'vitepress'
import process from 'node:process'
import { slug as slugify } from 'github-slugger'
import { refactorSidebar } from './utils/catalog'
import { tasklist } from '@mdit/plugin-tasklist'
import { katex } from '@mdit/plugin-katex'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { footnote } from '@mdit/plugin-footnote'
import { attrs } from '@mdit/plugin-attrs'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { align } from '@mdit/plugin-align'
import AutoSidebarPlugin from 'vite-plugin-vitepress-auto-sidebar'

const isDev = process.env.npm_lifecycle_event?.startsWith('dev') ?? false
const HOST = 'https://ting.alexsun.top'
const BASE = '/'
type ThemeConfig = Parameters<typeof defineConfig>[0]

// https://vitepress.dev/reference/site-config
export default withMermaid(<ThemeConfig>{
  title: "小婷学习文档",
  description: "学习总结&技术讨论",
  head: [
    // 添加图标
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  base: BASE,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {
        text: '主页',
        items: [
          { text: "基础三件套", link: '/base/' },
          { text: "工具", link: '/tools/' },
        ]
      },
    ],
    footer: {
      message: `基于 <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener noreferrer">CC-BY-NC-SA 4.0</a> 协议共享知识 |
        构建时间：${new Date().toLocaleString()}`,
      copyright: `版权所有 ©${new Date().getFullYear()} Alex Sun |
        <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">苏ICP备2023012081号-3</a>`,
    },


    socialLinks: [
      { icon: 'github', link: 'https://github.com/Liu-Xueting' }
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
      level: [2, 3],
    },
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      }
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    search: isDev ? undefined : {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '无法找到相关结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '选择',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上一个',
              navigateDownKeyAriaLabel: '下一个',
              closeText: '关闭',
              closeKeyAriaLabel: '关闭搜索框',
            },
          },
        },
      },
    },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    headers: {
      slugify,
    },
    anchor: {
      slugify,
    },
    config(md) {
      md.use(tabsMarkdownPlugin)
        .use(footnote)
        .use(attrs)
        .use(align)
        .use(tasklist)
        .use(katex)
    },
  },
  sitemap: {
    hostname: `${HOST}${BASE}`,
    lastmodDateOnly: true,
  },
  vite: {
    plugins: [
      AutoSidebarPlugin({
        collapsed: false,
        titleFromFile: true,
        sideBarResolved: (data) => {
          return refactorSidebar(data)
        },
      }),
    ],
    optimizeDeps: {
      include: [
        'mermaid',
      ],
    },
    css: {
      preprocessorOptions: {
        scss: { api: 'modern-compiler' },
      },
    },
  },
  ignoreDeadLinks: 'localhostLinks',
})
