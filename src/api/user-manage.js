/**
 * @name: 用户管理
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.19
 **/
import request from '@/utils/request'
// 获取用户列表
export const getUserManageList = params => {
  return request({
    url: '/user-manage/list',
    method: 'GET',
    params
  })
}
// 上传Excel导入的用户数据
export const userBatchImport = data => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}
// 删除用户
export const deleteUser = id => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}
// 获取所有用户列表
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}
// 获取用户详情
export const userDetail = id => {
  return request({
    url: `/user-manage/detail/${id}`,
    method: 'GET'
  })
}
