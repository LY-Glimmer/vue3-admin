/**
 * @name: tags相关
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.16
 **/
// 不需要被保存的路由
const noSaveRoutes = ['/login', '/404', '/401']
/**
 * 是否保存Tag
 * @param path 路由
 * @returns {boolean}
 */
export const isTag = (path) => {
  return noSaveRoutes.includes(path)
}
