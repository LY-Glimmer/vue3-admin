/**
 * @name: 角色相关
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.27
 **/
import request from '@/utils/request'

// 获取角色列表
export const roleList = () => {
  return request({
    url: '/role/list',
    method: 'GET'
  })
}
