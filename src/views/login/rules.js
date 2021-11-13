/**
 * @name: login组件表单的自定义校验
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/
import i18n from '@/i18n'

export const validatePassWorld = () => {
  return (rule, value, callback) => {
    if (!value) {
      return callback(new Error(i18n.global.t('msg.login.passwordRuleOne')))
    } else if (value.length < 6) {
      return callback(new Error(i18n.global.t('msg.login.passwordRuleTwo')))
    } else {
      return callback()
    }
  }
}
