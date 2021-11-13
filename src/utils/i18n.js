/**
 * @name: 处理国际化
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.14
 **/
import i18n from '@/i18n'
// 处理路由的国际化 需要用title作为key
export const generateTitle = title => {
  return i18n.global.t('msg.route.' + title)
}
