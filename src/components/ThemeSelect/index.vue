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
  <div></div>
</template>

<script setup>
import {} from 'vue'

const handleSetTheme = () => {
}
</script>

<style lang="scss" scoped>
</style>
