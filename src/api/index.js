import Vue from 'vue'
import { http } from './http.js'


Vue.prototype.$api = {
  // 首页
  homeList: params => { return http.post(`/api/user/advertising/list`,  params ) },
  // 商品详情
  GoodsInfo: params => { return http.post(`/api/user/advertising/info`,   params) },
// 提交
  submitOrder: params => { return http.post(`/api/user/advertising/buy`,  params ) },
  // 订单详情
  submitOrder: params => { return http.post(`/api/user/advertising/buy`,  params ) },
}
