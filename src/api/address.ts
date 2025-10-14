import request from '../utils/request'

// add address 
export const addAddress = (data: any) => request.post('/front/address/add', data)

// address list 
export const addressList = (data: any) => request.post('/front/address/list', data)

// address detail 
export const addressDetail = (data: any) => request.post('/front/address/detail', data)

// update address 
export const updateAddress = (data: any) => request.post('/front/address/update', data)

// delete address 
export const deleteAddress = (data: any) => request.post('/front/address/delete', data)