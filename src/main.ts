import { createApp } from 'vue'
import 'amfe-flexible'
import './assets/css/index.scss'
import 'virtual:svg-icons-register'
import { i18n } from './plugins/i18n'
import { setupStore } from './store'
import { setupVant } from './plugins/vant'
import router from './router'
import App from './App.vue'
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import vConsole from 'vconsole'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(Lazyload, {
  lazyComponent: true,
});

app.config.globalProperties.$t = i18n.global.t;
app.use(i18n)
if (import.meta.env.MODE) {
  // const vconsole = new vConsole()
}
setupVant(app)
setupStore(app)
app.use(router)
app.use(ElementPlus)
router.isReady().then(() => {
  app.mount('#app')
})