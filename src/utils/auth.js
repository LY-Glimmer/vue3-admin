/**
 * @name: 处理用户被动退出
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.12
 **/

import { getItem, setItem } from '@/utils/storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

// 获取时间戳
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

// 设置时间戳
export const setTimeStamp = () => {
  return setItem(TIME_STAMP, Date.now())
}

// 是否超时
export const isCheckTimeout = () => {
  // 当前时间
  const currentTime = Date.now()
  // 缓存时间
  const TimeStamp = getTimeStamp()
  // 当前时间 - 缓存时间 是不是大于2个小时
  return currentTime - TimeStamp > TOKEN_TIMEOUT_VALUE
}
