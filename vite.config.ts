import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
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
    include: ['pinia'],
    esbuildOptions: {
      // 传递给 esbuild 的选项
      loader: {
        '.ts': 'ts',
        '.tsx': 'tsx'
      }
    }
  }
})
