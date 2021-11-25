<!--导出Excel弹出层-->
<template>
  <el-dialog
    @close="closed"
    width="30%"
    :title="$t('msg.excel.title')"
    :model-value="dialogVisible">
    <el-input v-model="excelName" :placeholder="$t('msg.excel.placeholder')"></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button @click="onConfirm" type="primary" :loading="loading">{{ $t('msg.excel.confirm') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { watchSwitchLang } from '@/utils/i18n'
import { getUserManageAllList } from '@/api/user-manage'
import { formatJson } from './utils/ExportExcelConstants'
defineProps({
  dialogVisible: {
    type: Boolean,
    required: true
  }
})
// 默认的Excel文件名称
const i18n = useI18n()
// 国际化默认文件名
let exportDefaultExcelName = i18n.t('msg.excel.defaultName')
// 真实文件名
const excelName = ref(exportDefaultExcelName)
const emits = defineEmits(['update:dialogVisible'])
// dialog 关闭事件
const closed = () => {
  emits('update:dialogVisible', false)
}
// 点击确认
const loading = ref(false)
const onConfirm = async () => {
  loading.value = true
  const allUser = (await getUserManageAllList()).list
  // 导入工具包
  const excelUtil = await import('@/utils/ExportExcel')
  // 处理数据
  const data = await formatJson(allUser)
  excelUtil.export_json_to_excel({
    header: ['姓名', '联系方式', '角色', '开通时间'],
    data,
    filename: excelName.value || exportDefaultExcelName
  })
  loading.value = false
  closed()
}
// 监听语言切换
watchSwitchLang(() => {
  exportDefaultExcelName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultExcelName
})
</script>

<style lang="scss" scoped>
</style>
