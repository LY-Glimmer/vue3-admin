/**
 * @name: 用户模块封装
 * @description: Vuex登录模块封装
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import { login, getUserInfo } from '@/api/system'
import md5 from 'md5'
import { getItem, removeAllItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,
  state: () => ({
    // 令牌
    token: getItem(TOKEN) || '',
    // 用户信息
    userInfo: {}
  }),
  mutations: {
    // 设置Token
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    // 设置用户信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录请求动作
    login (context, userInfo) {
      const {
        username,
        password
      } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        }).then(data => {
          // 登录成功 保存token
          this.commit('user/setToken', data.token)
          // 保存登录时间
          setTimeStamp()
          // 跳转到Layout页
          router.push('/')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    async getUserInfo (context, userInfo) {
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res)
      return res
    },
    // 退出登录
    logout () {
      // 清理Token
      this.commit('user/setToken', '')
      // 清理用户信息
      this.commit('user/setUserInfo', {})
      // 清理缓存数据
      removeAllItem()
      // 跳转到登录页
      router.push('/login')
      // todo 清理权限
    }
  }
}
