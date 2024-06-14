import request from '../utils/request'

// 获取货币信息 1 为交易币 2为支付币 
export const coinGet = (data: any) => request.post('/front/coin/get', data)