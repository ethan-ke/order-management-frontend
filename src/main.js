import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import { Tabbar, TabbarItem } from 'vant';
import './assets/common.css' // import common styles
import '@/permission' // permission control

const app = createApp(App)
app.config.productionTip = false
app.use(Tabbar);
app.use(TabbarItem);
app.use(router)
  .use(store)
app.mount('#app')
