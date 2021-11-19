<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

const store = useStore()
// 根据之前选择的主题颜色生成颜色
generateNewStyle(store.getters.mainColor)
  .then((newStyle) => {
    writeNewStyle(newStyle)
  })
// 当语言发生变化 重新获取用户数据
watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style></style>
