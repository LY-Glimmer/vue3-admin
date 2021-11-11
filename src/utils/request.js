/**
 * @name: 封装请求模块
 * @description: 封装Axios请求
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import axios from 'axios'
import { showMessage } from '@/utils/utils'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
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
  showMessage(error, 3)
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default service
