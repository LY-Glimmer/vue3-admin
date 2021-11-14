<!--选择主题色组件-->
<template>
  <el-dropdown v-bind="$attrs" trigger="click" class="theme" @command="handleSetTheme">
    <!--图标-->
    <el-tooltip :content="$t('msg.navBar.themeChange')">
      <svg-icon icon="change-theme"></svg-icon>
    </el-tooltip>
    <!--菜单-->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!--弹出层-->
  <select-color v-model:flag="selectColorVisible"></select-color>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from '@/components/ThemeSelect/components/SelectColor'
// 控制颜色选择器显示隐藏
const selectColorVisible = ref(false)

const handleSetTheme = () => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped>
</style>
