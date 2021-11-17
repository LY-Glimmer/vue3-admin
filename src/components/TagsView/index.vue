<!--路由标签组件-->
<template>
  <div class="tags-view-container">
    <router-link
      :to="{path:tag.fullPath}"
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      v-for="(tag,index) in $store.getters.tagsViewList"
      :style="{
        backgroundColor: isActive(tag) ? $store.getters.cssVar.menuBg : '',
        borderColor: isActive(tag) ? $store.getters.cssVar.menuBg : ''
      }"
      @contextmenu.prevent="openMenu($event,index)"
      :key="tag.fullPath">
      {{ tag.title }}
      <svg-icon v-show="!isActive(tag)"
                class="close"
                :icon="isActive(tag) ? '' : 'push'"
                @click.prevent.stop="onClose(index)">
      </svg-icon>
    </router-link>
    <!--右键菜单-->
    <context-menu v-show="visible" :index="selectIndex" :style="menuStyle"></context-menu>
  </div>
</template>

<script setup>
import ContextMenu from '@/components/TagsView/ContextMenu'
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const route = useRoute()
// tag是否是激活状态
const isActive = tag => {
  return tag.path === route.path
}
// 控制显示隐藏
const visible = ref(false)
// 菜单位置
const menuStyle = reactive({
  left: 0,
  top: 0
})
// 当前选中的index
const selectIndex = ref(0)
// 鼠标右键点击tag
const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}
// 关闭tag
const store = useStore()
const onClose = (index) => {
  store.commit('app/removeTagsView', {
    type: 'index',
    index: index
  })
}
// 处理右键菜单的关闭
const closeMenu = () => {
  visible.value = false
}
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      color: #fff;

      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }

    // close 按钮
    .close {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      vertical-align: -3px;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }

  }
}
</style>
