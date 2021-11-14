/**
 * @name: 切换主题
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.15
 **/
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
import variables from '@/styles/variables.scss'

export default {
  namespaced: true,
  state: () => ({
    // 主色调
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables
  }),
  mutations: {
    setMainColor: (state, newColor) => {
      state.mainColor = newColor
      state.variables.menuBg = newColor
      setItem(MAIN_COLOR, newColor)
    }
  }
}
