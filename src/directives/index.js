/**
 * @name: 指令
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.26
 **/

import print from 'vue3-print-nb'
import preprocess from '@/directives/permisssion'

export default app => {
  app.use(print)
  app.directive('preprocess', preprocess)
}
