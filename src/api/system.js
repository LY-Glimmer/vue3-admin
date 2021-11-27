/**
 * @name: 系统模块
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.19
 **/
import request from '@/utils/request'

// 登录
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: 'sys/profile',
    method: 'GET'
  })
}
