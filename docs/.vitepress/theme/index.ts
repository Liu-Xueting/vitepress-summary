import { withBase, type Theme } from 'vitepress'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
// import init, { cut_for_search } from 'jieba-wasm'
import DefaultTheme from 'vitepress/theme'
import GitubBadge from '../components/GitubBadge.vue'
import NpmBadge from '../components/NpmBadge.vue'
import PypiBadge from '../components/PypiBadge.vue'
import CratesBadge from '../components/CratesBadge.vue'
// import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

// Global imports for all pages
import 'iconify-icon'
// import 'katex/dist/katex.min.css'
// import '@shikijs/vitepress-twoslash/style.css'

// Override the default theme of VitePress
import '../styles/base.scss'
import '../styles/index.scss'

export default <Theme>{
  extends: DefaultTheme,
  async enhanceApp({ app, router }) {
    enhanceAppWithTabs(app)
    // app.use(TwoslashFloatingVue)

    if (!import.meta.env.SSR) {
      // Load the copy-tex plugin only in the browser
      // await import('katex/dist/contrib/copy-tex.mjs')

      // // Load the jieba-wasm module only in the browser
      // await init({
      //   module_or_path: withBase('/res/jieba_rs_wasm_bg.wasm'),
      // })
      // globalThis.cut_for_search = cut_for_search

      // Router: auto scroll to the active sidebar item
      router.onAfterPageLoad = () => {
        setTimeout(() => {
          document.querySelector('.VPSidebarItem.is-active:not(.level-0) > .item')
            ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
        })
      }
    }

    // Register global components
    app.component('GitubBadge', GitubBadge)
    app.component('NpmBadge', NpmBadge)
    app.component('PypiBadge', PypiBadge)
    app.component('CratesBadge', CratesBadge)
  }
}

declare global {
  interface ImportMeta {
    env: {
      SSR: string
    }
  }
}
