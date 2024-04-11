import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import EnhanceLog from 'vite-plugin-enhance-log'

function _resolve(dir: string) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/dolphinscheduler': {
        target: 'https://hw-test-dmp-dmf.digiwincloud.com.cn',
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': _resolve('src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/styles/theme.scss' as *;@use "@/styles/element/index.scss" as *;`
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      extensions: ['vue', 'tsx', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/, /\.tsx$/],
      directives: true,
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/components/components.d.ts'
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/components/auto-imports.d.ts'
    }),
    // 如果用vue, 请确保 vuePlugin 在 log plugin 之前
    EnhanceLog({
      apply: 'serve',
      splitBy: '\n',
      preTip: '👉👉👉👉👉👉',
      enableFileName: true // or enableFileName: { enableDir: false}
    })
  ]
})
