import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver(),
      ]
    }),
    vueDevTools(),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    port: 3006,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000', // 后端地址
        changeOrigin: true,
        secure: false
      },
    },
  },
  optimizeDeps: {
    include: ['pinia','axios'],
    esbuildOptions: {
      // 传递给 esbuild 的选项
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx'
      }
        }
      },
      build: {
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            }
          },
          external: [],
        },
        terserOptions: {
          compress: {
            drop_console: true, // 删除 console.log
            unused: true, // 删除没有用到的代码
          },
        },
        chunkSizeWarningLimit: 500,
      },
      worker: {
        format: 'es', // 确保 worker 支持 ES 模块
  },
})
