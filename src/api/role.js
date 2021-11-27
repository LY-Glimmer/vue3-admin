/**
 * @name: 角色相关
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.27
 **/
import request from '@/utils/request'

/**
 * 获取所有角色
 */
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = roleId => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = data => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
