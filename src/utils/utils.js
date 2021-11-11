/**
 * @name: 封装一些方法
 * @description:
 * @author: LY_Glimmer
 * @time:
 **/
import { ElMessage } from 'element-plus'

// 封装消息提示
export const showMessage = (msg, toastType) => {
  switch (toastType) {
    case 1:
      ElMessage({
        message: msg,
        type: 'success'
      })
      break
    case 2:
      ElMessage({
        message: msg,
        type: 'warning'
      })
      break
    case 3:
      ElMessage({
        message: msg,
        type: 'error'
      })
      break
    default:
      ElMessage({
        message: msg,
        type: 'success'
      })
      break
  }
}
