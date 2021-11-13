/**
 * @name: 处理路由守卫
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import router from '@/router'
import store from '@/store'

// 路由白名单 用户不登录也可以进入
const whiteList = ['/login']

// 前置守卫
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 用户已经登录
    if (to.path === '/login') {
      // 想去登录页 导航到Layout
      next('/')
    } else {
      // 去别的页面
      // 用户已经登录 判断用户信息是否存在
      if (!store.getters.hasUserInfo) {
        // 用户信息不存在
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 用户未登录
    if (whiteList.includes(to.path)) {
      // 属于白名单
      next()
    } else {
      // 不属于白名单
      next('/login')
    }
  }
})
