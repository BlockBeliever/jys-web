// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vconsole from 'vconsole'
import * as filters from './filters'
import './api/index'
import loadcode from './utils/loadcode.js'
import JsBridge from "./utils/JsBridge"
import { Icon ,Toast, Loading, DropdownItem, DropdownMenu ,Tab, Tabs, Form, Col,List, Row, NavBar, Field, Button, Divider, Calendar, PasswordInput, NumberKeyboard, RadioGroup, Radio, Checkbox, CheckboxGroup, Rate, Slider, Switch, Uploader, ShareSheet, SwipeCell, Card, CountDown, Grid, GridItem, Swipe, SwipeItem, Popup, Picker, Area, Cell, CellGroup, ActionSheet, Dialog } from 'vant'
import { Locale } from 'vant';
import zhCN from 'vant/es/locale/lang/zh-CN';
import i18n from "./utils/i18n.js";

Locale.use('zh-CN', zhCN);
// 设置 js中可以访问 $cdn
// import { $cdn } from '@/config'
// Vue.prototype.$cdn = $cdn

// 引入vconsole控制台
// const vConsole = new Vconsole()
// Vue.use(vConsole)
Vue.use(Tab)
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
// Vue.use(Form).use(Field).use(Calendar)
// Vue.use(Loading)
Vue.use(Icon )
Vue.use(Icon )
Vue.use(Tabs)
// Vue.use(Form)
// Vue.use(Col)
// Vue.use(Row)
Vue.use(NavBar)
// Vue.use(Field)
Vue.use(Button)
// Vue.use(Divider)
// Vue.use(Calendar)
// Vue.use(PasswordInput)
// Vue.use(NumberKeyboard)
Vue.use(Radio)
Vue.use(RadioGroup)
// Vue.use(Checkbox)
// Vue.use(CheckboxGroup)
// Vue.use(Rate)
// Vue.use(Slider)
// Vue.use(Switch)
// Vue.use(Uploader)
// Vue.use(ShareSheet)
// Vue.use(SwipeCell)
// Vue.use(Card)
// Vue.use(CountDown)
// Vue.use(Grid)
// Vue.use(GridItem)
// Vue.use(Swipe)
// Vue.use(SwipeItem)
Vue.use(Popup)
Vue.use(Picker)
// Vue.use(Area)
// Vue.use(Cell)
// Vue.use(CellGroup)
// Vue.use(ActionSheet)
Vue.use(Dialog)
Vue.use(List)


// Vue.use(loadcode)
// 全局引入按需引入UI库 vant
import '@/plugins/vant'

// 引入全局样式
import '@/assets/css/global.css'

// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'
Vue.config.productionTip = false
Vue.prototype.$jsbridge = JsBridge;
// Vue.prototype.$APIURL = process.env.VUE_APP_BASE_API;
// Vue.prototype.$IMGURL = process.env.VUE_APP_IMGURL;
// 过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
