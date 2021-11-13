/**
 * @name: 国际化处理
 * @description:
 * @author: LY_Glimmer
 * @time: 2021.11.13
 **/

import { createI18n } from 'vue-i18n'
import store from '@/store'
import zh from './zh'
import en from './en'

const messages = {
  zh: {
    msg: {
      ...zh
    }
  },
  en: {
    msg: {
      ...en
    }
  }
}

const getLanguage = () => store?.getters?.language

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLanguage(),
  messages
})

export default i18n
