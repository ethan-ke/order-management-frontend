import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'

import './assets/main.css' // 引入我们配置好的 Tailwind CSS 文件
import '@/permission' // 路由拦截权限控制

const app = createApp(App)

app.use(router)
    .use(store)

app.mount('#app')