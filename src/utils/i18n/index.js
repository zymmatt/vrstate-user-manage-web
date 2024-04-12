// src/utils下创建i18n/index.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'
//引入UI框架语言配置---elementui
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

// 引入各个语言配置文件
import tw from './tw'
import zh from './zh'
import en from './en'
ElementLocale.i18n((key, value) => i18n.t(key, value))
Vue.use(VueI18n)


const messages = {
    en,
    zh,
    tw,
}
/*
export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'en'
}
*/


// 创建vue-i18n实例i18n
const i18n = new VueI18n({
    // 设置默认语言
    locale: localStorage.getItem('lang')||'tw', // 语言标识
    // 添加多语言（每一个语言标示对应一个语言文件）
    messages,
    silentTranslationWarn: true, //解决vue-i18n黄色警告"value of key 'xxx' is not a string"和"cannot translate the value of keypath 'xxx'.use the value of keypath as default",可忽略
    globalInjection: true, // 全局注入
    fallbackLocale: 'tw', // 指定的locale没有找到对应的资源或当前语种不存在时，默认设置当前语种为中文

})
// 暴露i18n



export default i18n