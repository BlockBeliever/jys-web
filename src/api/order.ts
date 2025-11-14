import request from '../utils/request'

// 创建订单 
export const createOrder = (data: any) => request.post('/front/order/create', data)

// 获取订单详情 
export const orderDetail = (data: any) => request.post('/front/order/detail', data)

// 获取订单列表 
export const orderList = (data: any) => request.post('/front/me/orders', data)

// 确认订单 
export const confirmOrder = (data: any) => request.post('/front/order/confirm', data)

// 主动刷新订单状态 
export const refreshOrder = (data: any) => request.post('/front/order/refresh_order_status', data)

// 取消订单 
export const cancelOrder = (data: any) => request.post('/front/order/cancel', data)

// 订单申诉 
export const appealOrder = (data: any) => request.post('/front/order/dispute', data)

// 取消申诉 
export const appealCancel = (data: any) => request.post('/front/order/dispute_cancel', data)

// is_notification update
export const orderNotificationUpdate = (data: any) => request.post('/front/order/notification_update', data)