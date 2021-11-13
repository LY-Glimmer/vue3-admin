<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <!-- 面包屑的最后一项 -->
      <el-breadcrumb-item v-for="(item,index) in breadcrumbsData" :key="item.path">
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbsData.length - 1" class="no-redirect">
          {{ generateTitle(item.meta.title) }}
        </span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">
          {{ generateTitle(item.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
const breadcrumbsData = ref([])
// 生成面包屑数组数据
const getBreadcrumbsData = () => {
  // route.matched 当前路由的标准化路由记录
  breadcrumbsData.value = route.matched.filter(item => item.meta.title)
}

// 监听路由变化 生成面包屑导航数据
watch(route, () => {
  getBreadcrumbsData()
}, {
  immediate: true
})

// 点击可点击面包屑跳转路由
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 主题切换拿到Vuex的颜色
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      color: v-bind(linkHoverColor);
    }
  }

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
