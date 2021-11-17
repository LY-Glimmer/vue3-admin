<!--内容区-->
<template>
  <div class="app-main">
    <!--带有切换动画并有组件缓存的路由-->
    <router-view v-slot="{Component,route}">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <Component :is="Component" :key="route.path"></Component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { isTag } from '@/utils/tags'
import { useStore } from 'vuex'
import { generateTitle, watchSwitchLang } from '@/utils/i18n'

const route = useRoute()
const store = useStore()

const getTitle = route => {
  let title = ''
  if (!route.meta) {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}

// 监听路由变化
watch(route, (to, from) => {
  if (isTag(to.path)) return
  const { fullPath, meta, name, params, path, query } = to
  store.commit('app/addTagsViewList', { fullPath, meta, name, params, path, query, title: getTitle(to) })
}, {
  immediate: true
})

// 监听到语言变化
watchSwitchLang(() => {
  store.getters.tagsViewList.forEach((route, index) => {
    store.commit('app/changeTagsView', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  overflow: hidden;
  padding: 104px 20px 20px;
  box-sizing: border-box;
}
</style>
