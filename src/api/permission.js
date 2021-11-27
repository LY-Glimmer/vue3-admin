/**
 * @name: 权限相关
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.27
 **/
import request from '@/utils/request'

// 获取权限列表
export const permissionList = () => {
  return request({
    url: '/permission/list',
    method: 'GET'
  })
}
