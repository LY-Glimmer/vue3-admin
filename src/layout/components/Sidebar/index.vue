<!--sidebar容器-->
<template>
  <div class="sidebar">
    <div class="logo-container">
      <el-avatar
        :size="44"
        shape="square"
        src="/images/avatar.jpg">
      </el-avatar>
      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">LY_Glimmer</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {} from 'vue'
import SidebarMenu from '@/layout/components/Sidebar/SidebarMenu'
</script>

<style lang="scss" scoped>
.sidebar {
  .logo-container {
    display: flex;
    height: 40px;
    padding: 10px 0 22px 0;
    align-items: center;
    justify-content: center;
  }

  .logo-title {
    margin-left: 10px;
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    line-height: 50px;
    white-space: nowrap;
    text-shadow: 1px 1px 2px #000;
  }
}
</style>
