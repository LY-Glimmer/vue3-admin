<!--Excel导入功能页面-->
<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <!--点击上传-->
      <el-button :loading="loading" type="primary" @click="handleUpload">{{ $t('msg.uploadExcel.upload') }}</el-button>
    </div>
    <input
      @change="handleChange"
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx,.xls">
    <!--拖拽上传-->
    <div
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragOver"
      @dragenter.stop.prevent="handleDragOver"
      class="drop">
      <svg-icon icon="upload" class="upload-icon"></svg-icon>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from '@/components/UploadExcel/utils'
import { showMessage } from '@/utils/utils'

const props = defineProps({
  // 上传Excel之前的回调
  beforeUpload: Function,
  // 上传成功的回调
  onSuccess: Function
})
// 按钮的loading效果
const loading = ref(false)
// 上传表单
const excelUploadInput = ref(null)
// 点击上传按钮
const handleUpload = () => {
  excelUploadInput.value.click()
}
// 选中了文件
const handleChange = e => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}
// 拖拽文件并释放 拖拽上传功能实现
const handleDrop = e => {
  // 如果当前文件在上传中
  if (loading.value) return
  // 拿到文件列表
  const files = e.dataTransfer.files
  // 如果选择的不是一个文件
  if (files.length !== 1) {
    return showMessage('必须选中一个文件', 3)
  }
  // 拿到第一个文件
  const file = files[0]
  // 判断是不是Excel类型的文件
  if (!isExcel(file)) {
    return showMessage('文件必须为xlsx, xls, csv的文件', 3)
  }
  // 上传
  upload(file)
}
// 拖拽到目标区域触发
const handleDragOver = e => {
  // 拖拽视觉反馈
  e.dataTransfer.dropEffect = 'copy'
}
// 上传方法
const upload = file => {
  excelUploadInput.value.value = null
  // 如果没有指定上传时回调函数 那么直接上传
  if (!props.beforeUpload) {
    return readerData(file)
  }
  // 如果指定了上传前的回调函数 那么返回值为true上传
  const before = props.beforeUpload(file)
  if (before) {
    readerData(file)
  }
}
// 读取数据 解析Excel
const readerData = file => {
  loading.value = true
  return new Promise((resolve, reject) => {
    // FileReader 读取文件
    const reader = new FileReader()
    // 当前已经读取完毕
    reader.onload = e => {
      // 1.获取到解析后的数据
      const data = e.target.result
      // 2.利用XLSX对数据进行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3.获取第一张表格
      const firstSheetName = workbook.SheetNames[0]
      // 4.读取第一张表格
      const workSheet = workbook.Sheets[firstSheetName]
      // 5.解析数据表头
      const header = getHeaderRow(workSheet)
      // 6.解析数据体
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7.传入解析之后的数据
      generatorData({ header, results })
      // 8.处理loading
      loading.value = false
      // 9.成功回调
      resolve('成功解析')
    }
    // 读取数据
    reader.readAsArrayBuffer(file)
  })
}
// 根据导入内容生成数据
const generatorData = excelData => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }

  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #bbb;

    .upload-icon {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
