import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// 导入全局样式表
import '@/styles/index.scss'
// 导入SvgIcon
import installSvgIcon from '@/icons/index'
// 导入路由守卫
import './permission'

const app = createApp(App)
// 全局注册elementPlus
installElementPlus(app)
// 全局注册SvgIcon
installSvgIcon(app)
app.use(store)
  .use(router)
  .mount('#app')
