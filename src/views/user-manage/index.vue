<!--用户管理页面-->
<template>
  <div class="user-manage-container">
    <!--头部-->
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick">{{ $t('msg.excel.importExcel') }}</el-button>
        <el-button type="success" @click="onExportExcelClick">{{ $t('msg.excel.exportExcel') }}</el-button>
      </div>
    </el-card>
    <!--表格-->
    <el-card>
      <el-table :data="data.tableData" border style="width: 100%;">
        <!--索引-->
        <el-table-column label="#" type="index"></el-table-column>
        <!--姓名-->
        <el-table-column :label="$t('msg.excel.name')" prop="username"></el-table-column>
        <!--手机号-->
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile"></el-table-column>
        <!--头像-->
        <el-table-column :label="$t('msg.excel.mobile')" align="center">
          <template v-slot="{row}">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <!--角色-->
        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{row}">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="mini">
                {{ $t('msg.excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!--时间-->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template v-slot="{row}">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!--操作-->
        <el-table-column :label="$t('msg.excel.action')" fixed="right" width="220">
          <template v-slot="{row}">
            <el-button type="primary" size="mini" @click="onShowClick(row._id)">{{ $t('msg.excel.show') }}</el-button>
            <el-button type="info" size="mini" @click="onShowRoleClick(row)">{{ $t('msg.excel.showRole') }}</el-button>
            <el-button type="danger" size="mini" @click="onRemoveClick(row)">{{ $t('msg.excel.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页器-->
      <el-pagination
        class="pagination"
        v-model:currentPage="data.page"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="data.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <!--导出Excel弹出层-->
    <export-excel v-model:dialogVisible="data.exportExcelVisible"></export-excel>
    <!--分配角色对话框-->
    <roles-dialog v-model="roleDialogVisible" :user-id="selectUserId" @updateRole="getListData"></roles-dialog>
  </div>
</template>
<script setup>
import { reactive, onActivated, ref, watch } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { showMessage, showMessageBox } from '@/utils/utils'
import { useI18n } from 'vue-i18n'
import ExportExcel from '@/views/user-manage/components/ExportExcel'
import RolesDialog from '@/views/user-manage/components/RolesDialog'
// 相关数据
const data = reactive({
  // 表格数据
  tableData: [],
  // 总页数
  total: 0,
  // 页数
  page: 1,
  // 每页显示多少条
  size: 2,
  // 控制导入Excel弹出层的变量
  exportExcelVisible: false
})
// 获取数据
const getListData = async () => {
  const { list, total } = await getUserManageList({
    page: data.page,
    size: data.size
  })
  data.tableData = list
  data.total = total
}
getListData()
// 语言改变 重新获取数据
watchSwitchLang(getListData)
// 每页显示多少条发生改变
const handleSizeChange = currentSize => {
  data.size = currentSize
  getListData()
}
// 当前页发生变化
const handleCurrentChange = currentPage => {
  data.page = currentPage
  getListData()
}
// 点击了查看按钮
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}
// 控制分配角色对话框的显示和隐藏
const roleDialogVisible = ref(false)
// 当前点击的用户Id
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}
// 重复点击相同角色重新发送请求
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})
// 点击删除按钮
const i18n = useI18n()
const onRemoveClick = async row => {
  const result = await showMessageBox(`${i18n.t('msg.excel.dialogTitle1')}${row.username}${i18n.t('msg.excel.dialogTitle2')}`, 2)
  if (result === 'confirm') {
    // 确认删除
    await deleteUser(row._id)
    showMessage(i18n.t('msg.excel.removeSuccess'))
    await getListData()
  }
}
const router = useRouter()
// 点击了Excel导入
const onImportExcelClick = () => {
  router.push('/user/import')
}
// 点击了导出按钮
const onExportExcelClick = () => {
  data.exportExcelVisible = true
}
// keep-alive 激活时调用 重新获取数据
onActivated(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }

  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
