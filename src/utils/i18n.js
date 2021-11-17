/**
 * @name: 处理国际化
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.14
 **/
import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'
// 处理路由的国际化 需要用title作为key
export const generateTitle = title => {
  return i18n.global.t('msg.route.' + title)
}

// 监听语言变化执行回调
export const watchSwitchLang = (...callbacks) => {
  watch(() => store.getters.language, () => {
    callbacks.forEach(callback => {
      callback(store.getters.language)
    })
  })
}
