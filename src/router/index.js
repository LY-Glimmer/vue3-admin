import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 通用路由表
 */
const publicRouter = [
  // 登录页
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index')
  },
  {
    name: 'Layout',
    path: '/',
    component: () => import('@/layout/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRouter
})

export default router
