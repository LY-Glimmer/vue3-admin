<!--菜单项处理-->
<template>
  <!--有子级-->
  <el-submenu v-if="route?.children?.length > 0" :index="route.path">
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
    </template>
    <!--递归渲染-->
    <sidebar-item v-for="item in route.children" :key="item.path" :route="item">
    </sidebar-item>
  </el-submenu>
  <!--无子级-->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon"></menu-item>
  </el-menu-item>
</template>

<script setup>
import { defineProps } from 'vue'
import MenuItem from '@/layout/components/Sidebar/menuItem'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss" scoped>
</style>
