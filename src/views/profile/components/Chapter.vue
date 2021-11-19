<!--章节-->
<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterDta"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top">
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import { ref } from 'vue'
import { getChapter } from '@/api/user'
import { watchSwitchLang } from '@/utils/i18n'
// 获取数据
const chapterDta = ref([])
const getChapterData = async () => {
  chapterDta.value = await getChapter()
}
getChapterData()
// 语言变化重新获取数据
watchSwitchLang(() => {
  getChapterData()
})
</script>

<style lang="scss" scoped>
</style>
