/**
 * @name: login组件表单的自定义校验
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/

export const validatePassWorld = () => {
  return (rule, value, callback) => {
    if (value.length < 6) {
      return callback(new Error('密码不能少于6位'))
    } else {
      return callback()
    }
  }
}
