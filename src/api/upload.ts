import request from '../utils/request'

// 申请上传密钥
export const getStsToken = (data: any) => request.post('/front/get_sts_token', data)