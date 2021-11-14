<!--颜色选择器-->
<template>
  <el-dialog
    width="22%"
    @close="closed"
    :model-value="flag"
    :title="$t('msg.universal.title')">
    <div class="content">
      <p class="title">{{ $t('msg.theme.themeColorChange') }}</p>
      <el-color-picker v-model="mColor" :predefine="predefineColors"></el-color-picker>
    </div>
    <template #footer>
      <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{ $t('msg.universal.confirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

defineProps({
  flag: {
    type: Boolean,
    required: true
  }
})
// 拿到仓库
const store = useStore()
// 默认色值
const mColor = ref(store.getters.mainColor)
// 定义更新
const emits = defineEmits(['update:flag'])
// 关闭弹出层
const closed = () => emits('update:flag', false)

// 点击确定按钮
const confirm = async () => {
  // 生成主题色
  const newStyle = await generateNewStyle(mColor.value)
  // 写入到head
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', mColor.value)
  emits('update:flag', false)
}
// 预定义色值
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
]
</script>

<style lang="scss" scoped>
.content {
  text-align: center;

  .title {
    margin-bottom: 12px;
  }
}
</style>
