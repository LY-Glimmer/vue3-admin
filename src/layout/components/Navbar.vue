<!--顶部菜单-->
<template>
  <div class="navbar">
    <!--切换按钮-->
    <hamburger class="hamburger-container"></hamburger>
    <!--面包屑导航-->
    <breadcrumb id="guide-breadcrumb" class="breadcrumb-container"></breadcrumb>
    <div class="right-menu">
      <!--引导教学-->
      <guide class="right-menu-item hover-effect"></guide>
      <!--搜索-->
      <header-search class="right-menu-item hover-effect"></header-search>
      <!--全屏切换-->
      <screen-full class="right-menu-item hover-effect"></screen-full>
      <!--主题选择-->
      <theme-select class="right-menu-item hover-effect"></theme-select>
      <!--语言切换-->
      <lang-select class="right-menu-item hover-effect"></lang-select>
      <!--头像-->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!--          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>-->
          <el-avatar shape="square" :size="40" src="/images/avatar.jpg"></el-avatar>
          <svg-icon class="setting" icon="setting"></svg-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
            </router-link>
            <router-link to="/">
              <el-dropdown-item>{{ $t('msg.navBar.course') }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided @click="logout">{{ $t('msg.navBar.logout') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index'
import Breadcrumb from '@/components/Breadcrump/index'
import LangSelect from '@/components/LangSelect/index'
import ThemeSelect from '@/components/ThemeSelect/index'
import ScreenFull from '@/components/ScreenFull/index'
import HeaderSearch from '@/components/HeaderSearch/index'
import Guide from '@/components/Guide/index'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover 动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 2px;
        }

        .setting {
          font-size: 26px;
        }
      }
    }
  }
}
</style>
