/**
 * @name: 封装Vuex快捷访问
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.11
 **/

const getters = {
  token: state => state.user.token
}

export default getters
