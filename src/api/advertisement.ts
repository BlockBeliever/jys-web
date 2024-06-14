import request from '../utils/request'

// 我的广告
export const myAdvertisement = (data: any) => request.post('/front/me/goods', data)

// 删除广告 
export const deleteAdvertisement = (data: any) => request.post('/front/goods/delete', data)

// 编辑广告
export const editAdvertisement = (data: any) => request.post('/front/goods/edit', data)

// 首页广告列表 
export const advertisementList = (data: any) => request.post('front/goods/list', data)

// 获取广告详情
export const advertisementDetail = (data: any) => request.post('front/goods/detail', data)

// 新增广告 
export const addAdvertisement = (data: any) => request.post('/front/goods/add', data)