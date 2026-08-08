import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        // 💡 代理配置：拦截以 /api 开头的请求，转发到你的远程接口服务
        proxy: {
            '/api': {
                target: 'http://api.order.riyadh-massagevip.com', // 👈 代理到你在 .env 中定义的域名
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})