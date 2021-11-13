<!--内容区-->
<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import {} from 'vue'
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  min-height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
  padding: 61px 20px 20px;
  box-sizing: border-box;
}
</style>
