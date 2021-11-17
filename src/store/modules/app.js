/**
 * @name: 控制
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.12
 **/
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export default {
  namespaced: true,
  state: () => ({
    // 控制sidebar显示隐藏
    sidebarOpened: true,
    // 语言
    language: getItem(LANG) || 'zh',
    // 标签数据
    tagsViewList: getItem(TAGS_VIEW) || []
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
    },
    // 添加 tags
    addTagsViewList (state, tag) {
      const isFind = state.tagsViewList.find(item => item.path === tag.path)
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 为指定的tag修改title
    changeTagsView (state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 删除tag
     * @param state
     * @param payload {type: other || right || index}
     */
    removeTagsView (state, payload) {
      if (payload.type === 'index') {
        // 删除当前
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        // 删除其他
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        // 删除右侧
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1)
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }
  }
}
