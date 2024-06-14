import request from '../utils/request'

// 携带code验证，获取token
export const codeToToken = (data: any) => request.post('/api/user/auth/code_to_token', data)

// 用户信息 
export const userInfo = (data: any) => request.post('/front/me/info', data)

// 获取客服 
export const getCustomerService = (data: any) => request.post('/front/get_customer_service', data)