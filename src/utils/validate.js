/**
 * @name: 验证方法
 * @description:
 * @author: LY_Glimmer
 * @time:
 *
 * 判断是否是外部资源
 * @param {*} path
 **/

// 是否是外部资源
export const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path)
