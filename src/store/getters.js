/**
 * @name: 封装Vuex快捷访问
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'

const getters = {
  // 登录令牌
  token: state => state.user.token,
  // 如果这个值为 true 则用户信息存在
  hasUserInfo: state => JSON.stringify(state.user.userInfo) !== '{}',
  // 用户信息
  userInfo: state => state.user.userInfo,
  // 动态样式 主题
  cssVar: state => ({
    ...state.theme.variables,
    ...generateColors(getItem(MAIN_COLOR))
  }),
  // 控制 sidebar 显示隐藏
  sidebarOpened: state => state.app.sidebarOpened,
  // 国际化
  language: state => state.app.language,
  // 主要色调
  mainColor: state => state.theme.mainColor,
  // tags数据源
  tagsViewList: state => state.app.tagsViewList
}
export default getters
