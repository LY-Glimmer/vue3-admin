/**
 * @name: 封装请求模块
 * @description: 封装Axios请求
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import axios from 'axios'
import { showMessage } from '@/utils/utils'
import store from '@/store'
import { isCheckTimeout } from '@/utils/auth'
// 默认配置对象
const defaultConfig = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}

const service = axios.create(defaultConfig)
// 请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // Token超时退出登录
      store.dispatch('user/logout')
      return Promise.reject(new Error('Token失效了'))
    }
    // 如果token存在说明用户已经登录 之后的请求应注入 Authorization
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 配置接口国际化
  config.headers['Accept-Language'] = store.getters.language
  // ICode
  config.headers.icode = 'BA14A16B5C879BA9'
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么
  const { success, message, data } = response.data
  if (success) {
    return data
  } else {
    showMessage(message, 3)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  // 对响应错误做点什么
  if (error?.response?.data?.code === 401) {
    // 401表示Token到期了 退出登录
    store.dispatch('user/logout')
  }
  showMessage(error, 3)
  return Promise.reject(error)
})

export default service
