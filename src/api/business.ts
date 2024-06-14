import request from '../utils/request'

// 申请成为商家
export const applyBusiness = (data: any) => request.post('/front/shop/apply', data)

// 查询商家信息
export const businessInfo = (data: any) => request.post('/front/me/shop', data)

// 我的商铺信息 
export const myShop = (data: any) => request.post('/front/me/shop', data)