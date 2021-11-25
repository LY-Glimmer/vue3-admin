/**
 * @name: 转换后台数据
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.25
 **/
import { dateFilter } from '@/filters'
// 对照表
const USER_RELATIONS = {
  姓名: 'username',
  联系方式: 'mobile',
  角色: 'role',
  开通时间: 'openTime'
}
// 处理数据 处理成二维数组
export const formatJson = (rows) => {
  return rows.map(item => {
    return Object.keys(USER_RELATIONS).map(key => {
      // 角色需要特殊处理
      if (USER_RELATIONS[key] === 'role') {
        const roles = item[USER_RELATIONS[key]]
        return JSON.stringify(roles.map(role => role.title))
      }
      if (USER_RELATIONS[key] === 'openTime') {
        return dateFilter(item[USER_RELATIONS[key]])
      }
      return item[USER_RELATIONS[key]]
    })
  })
}
