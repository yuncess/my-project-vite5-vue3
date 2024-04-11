import { createI18n } from 'vue-i18n'
import storage from '@/utils/storage'

import zh_CN from './locales/zh-CN'
import zh_TW from './locales/zh-TW'
import en_US from './locales/en'

const messages = {
  zh_CN, // 中文简体
  zh_TW, // 中文繁体
  en_US // 英文
}
const localeKeys = Object.keys(messages)

let locale = window.localStorage.getItem(storage.LOCALE) || ''

//初始化localStorage中的语言
if (!locale || !localeKeys.includes(locale)) {
  locale = localeKeys[0]
  window.localStorage.setItem(storage.LOCALE, locale)
}

const i18n = createI18n({
  locale,
  fallbackLocale: localeKeys[0],
  messages
})

type myI18n = { t: Function } & typeof i18n
;(i18n as myI18n).t = i18n.global.t.bind(i18n)

export default i18n as myI18n
export { locale }
