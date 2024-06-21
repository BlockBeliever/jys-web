import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { Locale } from 'vant'
import { getConfig } from '@/config'
import enLocale from 'vant/es/locale/lang/en-US'
import zhLocale from 'vant/es/locale/lang/zh-CN'
import zhCN from '../config/locales/zh-CN'
import enUS from '../config/locales/en-US'

export const i18nKey = 'responsive-locale'

const messages = {
  zh: zhCN,
  en: enUS
}

export const i18n = createI18n({
  legacy: false,
  locale: getConfig().locale,
  fallbackLocale: 'en',
  messages
})
export function useI18n(app: App) {
  app.use(i18n)
}

export const t = (key: string) => i18n.global.t(key)

/**
 * 设置语言
 * @param key string | undefined
 */
export function changeLocale() {
  const key = localStorage.getItem('lang')
  switch (key) {
    case 'en':
      Locale.use('en-US', enLocale)
      break;
    case 'zh':
      if (localStorage.getItem("country_code") === 'TW') {
        // Locale.use('zh-TW', zhTwLocale)
      } else {
        Locale.use('zh-CN', zhLocale)
      }
      break;
    case 'th':
      // Locale.use('th-TH', thLocale)
      break;
    case 'vi':
      // Locale.use('vi-VN', viLocale)
      break;
    case 'ms':
      Locale.use('en-US', enLocale)
      break;
    case 'km':
      // Locale.use('km-KH', kmLocale)
      break;
    default:
      break;
  }
}