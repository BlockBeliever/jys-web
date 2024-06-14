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
import { Lazyload, showToast } from 'vant';
// import * as filters from './filters/index'
const app = createApp(App)
app.use(Lazyload, {
  lazyComponent: true,
});
// app.use(showToast)
  
// app.config.globalProperties.$filters = {};
// Object.keys(filters).forEach((key: string) => {
//   app.config.globalProperties.$filters[key] = (filters as Record<string, Function>)[key];
// });


app.config.globalProperties.$t = i18n.global.t;
app.use(i18n)
import vConsole from 'vconsole'
const vconsole = new vConsole()
setupVant(app)
setupStore(app)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})