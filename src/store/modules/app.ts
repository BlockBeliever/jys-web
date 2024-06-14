import { defineStore } from 'pinia'
import { changeLocale } from '@/plugins/i18n'
import { getConfig, setConfig } from '@/config'
import { stat } from 'fs/promises'
const config = getConfig()
type AppStateType = {
  token?: string
  title?: string
  theme?: string
  locale?: string
  code?: string,
  serviceId?: number,
  uid?: number
}
export const useAppStore = defineStore({
  id: 't-app',
  state: (): AppStateType => ({
    title: '',
    token: '',
    theme: config.theme as string,
    locale: config.locale as string,
    code: '',
    serviceId: 0,
    uid: 0
  }),
  getters: {
    getCode: state => state.code,
    getServiceId: state => state.serviceId,
    getUid: state => state.uid
  },
  actions: {
    setState(state: AppStateType) {
      const keys: any = Object.keys(state)
      keys.forEach((key: keyof AppStateType) => {
        this[key] = state[key]
      })
    },
    changeTheme(theme?: string) {
      if (theme) {
        this.theme = theme
      } else {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
      }
      setConfig({ theme: this.theme })
    },
    changeLocale(locale?: 'zh' | 'en') {
      const key = changeLocale(locale)
      this.locale = key
      setConfig({ locale: key })
    },
    setCode(state: any) {
      this.code = state
    },
    setServiceId(state: any){
      this.serviceId = state
    },
    setUid(state: any){
      this.uid = state
    }
  },
  persist: {
    // key: 'code',
    // storage: window.sessionStorage,
    // paths: ['code'],
  },
})
