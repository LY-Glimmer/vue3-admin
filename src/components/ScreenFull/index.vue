<!--全屏组件-->
<template>
  <div>
    <svg-icon id="guide-full" @click="onToggle" :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenFull from 'screenfull'
// 控制当前全屏状态
const isFullScreen = ref(false)
// 点击切换全屏
const onToggle = () => {
  screenFull.toggle()
}
// 改变isFullScreen值
const change = () => {
  isFullScreen.value = !isFullScreen.value
}
// 监听screenFull变化改变isFullScreen的值
onMounted(() => {
  screenFull.on('change', change)
})
// 取消监听
onUnmounted(() => {
  screenFull.off('change', change)
})
</script>

<style lang="scss" scoped>
</style>
