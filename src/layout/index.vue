<!--Layout组件-->
<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!--左侧 menu菜单-->
    <sidebar class="sidebar-container" :style="{backgroundColor:variables.menuBg}"></sidebar>
    <div class="main-container">
      <!--顶部 NavBar-->
      <div class="fixed-header">
        <navbar></navbar>
      </div>
      <!--内容区-->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/layout/components/Navbar'
import AppMain from '@/layout/components/AppMain'
import Sidebar from '@/layout/components/Sidebar/index'
import variables from '@/styles/variables.scss'

import {} from 'vue'
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width #{$sideBarDuration};
  }
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}

</style>
