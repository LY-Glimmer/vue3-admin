/**
 * @name: 封装一些方法
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.24
 **/
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from '@/i18n'

/**
 * 封装消息提示
 * @param message 提示内容
 * @param messageType 1成功｜2警告｜3错误
 */
export const showMessage = (message, messageType) => {
  switch (messageType) {
    case 1:
      ElMessage({
        message: message,
        type: 'success'
      })
      break
    case 2:
      ElMessage({
        message: message,
        type: 'warning'
      })
      break
    case 3:
      ElMessage({
        message: message,
        type: 'error'
      })
      break
    default:
      ElMessage({
        message: message,
        type: 'success'
      })
      break
  }
}

/**
 * 盒子提示封装
 * @param message 提示内容
 * @param iconText icon右侧文字
 * @param type 提示类型
 * @param center 位置 默认居中
 * @returns {Promise} 返回promise对象
 */
function messageBox (message, iconText, type, center) {
  return ElMessageBox.confirm(
    message,
    iconText,
    {
      confirmButtonText: i18n.global.t('msg.universal.confirm'),
      cancelButtonText: i18n.global.t('msg.universal.cancel'),
      type,
      center: center || true
    }
  )
}

/**
 * 封装可确认盒子提示
 * @param message 提示内容
 * @param messageType 1成功｜2警告｜3错误
 */
export const showMessageBox = (message, messageType) => {
  switch (messageType) {
    case 1:
      return messageBox(message, i18n.global.t('msg.universal.success'), 'success')
    case 2:
      return messageBox(message, i18n.global.t('msg.universal.warning'), 'warning')
    case 3:
      return messageBox(message, i18n.global.t('msg.universal.error'), 'error')
    default:
      return messageBox(message, i18n.global.t('msg.universal.success'), 'success')
  }
}

/**
 * 判断一个只是不是空值
 * @param data 要判断的值
 * @returns {boolean} 返回真为空值
 */
export const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify() === '{}') return true
  return JSON.stringify() === '[]'
}
