<template>
  <router-view />
</template>

<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()
// 根据之前选择的主题颜色生成颜色
generateNewStyle(store.getters.mainColor)
  .then((newStyle) => {
    writeNewStyle(newStyle)
  })

</script>

<style></style>
