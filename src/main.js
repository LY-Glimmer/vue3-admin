import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 国际化处理
import i18n from '@/i18n'
import installElementPlus from './plugins/element'
// 导入全局样式表
import '@/styles/index.scss'
// 导入SvgIcon
import installSvgIcon from '@/icons/index'
// 导入路由守卫
import './permission'
// 全局属性 过滤器
import installFilter from '@/filters/index'

const app = createApp(App)
// 全局注册elementPlus
installElementPlus(app)
// 全局注册SvgIcon
installSvgIcon(app)
// 注册过滤器
installFilter(app)
app.use(store).use(router).use(i18n).mount('#app')
