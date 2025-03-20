import fs from 'node:fs'
import path from 'node:path'
import { exit } from 'node:process'
import type { DefaultTheme } from 'vitepress'

/**
 * 重新生成目录
 * @param data 目录数据
 * @returns
 */
export function refactorSidebar(data: DefaultTheme.SidebarMulti): DefaultTheme.SidebarMulti {
  function itemHandler(item: DefaultTheme.SidebarItem, parent?: DefaultTheme.SidebarItem) {
    if (item.link && item.link.endsWith('/index.html')) {
      if (parent) {
        parent.link = item.link
        return null
      }
    }
    if (item.items) {
      item.items = item.items.filter((subItem) => itemHandler(subItem, item))
    }
    return item
  }

  for (const sidebar of Object.values(data)) {
    const items = Array.isArray(sidebar) ? sidebar : sidebar.items
    for (const item of items) {
      itemHandler(item)
    }
  }

  // 生成 catalog.md
  fs.writeFileSync(
    path.join(import.meta.dirname, '../../catalog.md'),
    generateMarkdown(data),
    {
      encoding: 'utf-8',
      flag: 'w',
    }
  )

  if (process.env.npm_lifecycle_event === 'gen') {
    console.log('Generate sidebar.json & catalog.md successfully!')
    exit(0)
  }
  return data
}

/**
 * 生成目录 markdown
 * @param sidebar
 * @returns
 */
function generateMarkdown(sidebar: DefaultTheme.Sidebar): string {
  let markdown = '# 目录\n\n'

  Object.entries(sidebar).forEach(
    ([category, sections]: [string, DefaultTheme.SidebarItem[]]) => {
      if (!sections[0]?.items?.length && category !== '/') {
        return
      }
      if (category === '' || category === '/test/' || category === '/private/') {
        return
      }

      const categoryName = category.replace(/\//g, '').toUpperCase() || 'HOME'
      markdown += `## ${categoryName}\n\n`

      sections.forEach((section) => {
        section.items?.forEach((item) => {
          if (item.text && item.link) {
            const linkPath = item.link
              .replace(/\.html$/, '.md')
              .replace(/\/index\.md$/, '/')
            markdown += `- [${item.text}](.${linkPath})\n`
          }
        })
      })
      markdown += '\n'
    }
  )

  return markdown.replace(/\n+$/, '\n')
}
