/**
 * @name: 控制
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.12
 **/

export default {
  namespaced: true,
  state: () => ({
    // 控制sidebar显示隐藏
    sidebarOpened: true
  }),
  mutations: {
    // 修改sidebar显示隐藏
    triggerSidebarOpened (state) {
      state.sidebarOpened = !state.sidebarOpened
    }
  }
}
