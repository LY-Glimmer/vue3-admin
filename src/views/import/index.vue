<!--Excel导入页面-->
<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel/index'
import { userBatchImport } from '@/api/user-manage'
import { showMessage } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { generateData } from './utils'

const i18n = useI18n()
const router = useRouter()
// 数据解析成功的回调函数
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await userBatchImport(updateData)
  showMessage(`${results.length}${i18n.t('msg.excel.importSuccess')}`)
  await router.push('/user/manage')
}
</script>

<style lang="scss" scoped></style>
