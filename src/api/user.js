/**
 * @name: 用户模块
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.19
 **/
import request from '@/utils/request'

// 获取项目功能
export const getFeature = () => {
  return request({
    url: '/user/feature',
    method: 'GET'
  })
}

// 获取项目章节
export const getChapter = () => {
  return request({
    url: '/user/chapter',
    method: 'GET'
  })
}
