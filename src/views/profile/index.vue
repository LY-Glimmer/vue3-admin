<!--个人中心-->
<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <!--项目介绍-->
        <project-card class="project-card" :features="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card class="project-card">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="Feature">
              <!--功能-->
              <feature :features="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')">
              <!--章节-->
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')">
              <!--作者-->
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from '@/views/profile/components/ProjectCard'
import Feature from '@/views/profile/components/Feature'
import Chapter from '@/views/profile/components/Chapter'
import Author from '@/views/profile/components/Author'
import { getFeature } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
// 激活的 Tab
const activeName = ref('Feature')
// 特色数据
const featureData = ref([])
const getFeatureData = async () => {
  // noinspection JSValidateTypes
  featureData.value = await getFeature()
}
getFeatureData()
// 当语言切换的时候 重新获取数据
watchSwitchLang(getFeatureData)
</script>

<style lang="scss" scoped>

</style>
