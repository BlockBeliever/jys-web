import Vue from 'vue'
import { http } from './http.js'


Vue.prototype.$api = {
  // 首页
  homeList: params => { return http.post(`/api/user/advertising/list`,  params ) },
  // 币列表
  coinList: params => { return http.post(`/api/user/coins`,  params ) },
  // 商品详情
  GoodsInfo: params => { return http.post(`/api/user/advertising/info`,   params) },
// 提交
  submitOrder: params => { return http.post(`/api/user/advertising/buy`,  params ) },
  // 订单详情
  submitOrder: params => { return http.post(`/api/user/advertising/buy`,  params ) },
   // 发布买入
   submitBuy: params => { return http.post(`/api/user/merchant/advertising/create`,  params ) },
    // 发布买入
    myInfo: params => { return http.post(`/api/user/account`,  params ) },
    // 广告列表
    adList: params => { return http.post(`/api/user/merchant/advertising/list`,  params ) },
    // 删除广告
    delAd: params => { return http.post(`/api/user/merchant/advertising/delete`,  params ) },
    // 上架
    upAd: params => { return http.post(`/api/user/merchant/advertising/update_status`,  params ) },
    // 发布卖出
   submitSell: params => { return http.post(`/api/user/merchant/advertising/create`,  params ) },
    // 获取信息
    merchantInfo: params => { return http.post(`/api/user/merchant/info`,  params ) },
    // 获取信息
    sumbmitMerchan : params => { return http.post(`/api/user/merchant/apply`,  params ) },
    // 获取信息
    sumbmitReplyMerchan : params => { return http.post(`/api/user/merchant/reapply`,  params ) },
    // 订单列表
  orderList: params => { return http.post(`/api/user/advertising/order/list`, { params }) },

  // 订单详情
  orderDetail: id => { return http.post(`/api/user/advertising/order/detail`, { id }) },

  // 完成订单
  orderEnd: id => { return http.post(`/api/user/advertising/order/end`, { id }) },
   // 获取TOKEN
   getAuther: id => { return http.post(`/api/user/auth/code_to_token`, { id }) }
}
