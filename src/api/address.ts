import request from '../utils/request'

// add address 
export const addAddress = (data: any) => request.post('/front/address/add', data)

// address list 
export const addressList = (data: any) => request.post('/front/address/list', data)

// delete address 
export const deleteAddress = (data: any) => request.post('/front/address/delete', data)