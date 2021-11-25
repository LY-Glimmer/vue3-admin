/**
 * @name: 过滤器
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.23
 **/
import dayjs from 'dayjs'
// 时间过滤器
export const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs(val).format(format)
}
// 给全局添加一个过滤器对象
export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
