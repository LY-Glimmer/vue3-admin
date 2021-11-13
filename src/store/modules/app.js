/**
 * @name: 控制
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.12
 **/
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    // 控制sidebar显示隐藏
    sidebarOpened: true,
    language: getItem(LANG) || 'zh'
  }),
  mutations: {
    // 修改sidebar显示隐藏
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    // 设置语言
    setLanguage (state, lang) {
      setItem(LANG, lang)
      state.language = lang
    }
  }
}
