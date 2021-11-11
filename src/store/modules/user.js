/**
 * @name: 用户模块封装
 * @description: Vuex登录模块封装
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import { login } from '@/api/system'
import md5 from 'md5'
import { getItem, setItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken (state, token) {
      state.token = token
      setItem(TOKEN, token)
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
          // 跳转到Layout页
          router.push('/')
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
