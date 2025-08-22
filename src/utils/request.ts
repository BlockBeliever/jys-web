import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import qs from 'qs'
import { showToast } from 'vant'
import { getToken } from "@/utils/auth";
import { error, log } from 'console';

const baseURL = import.meta.env.VITE_BASE_API
const defaultConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  // 'https://api.flct.site',
  timeout: 10000,
  // 数组格式参数序列化
  paramsSerializer: (params: any) => qs.stringify(params, { indices: false })
}
const instance: AxiosInstance = axios.create({
  ...defaultConfig
})

// 请求拦截器
instance.interceptors.request.use(
  (config: any) => {
    config.headers['Accept-Language'] = `${localStorage.getItem('lang')}-${localStorage.getItem('country_code')}`
    if (config.url === '/api/user/auth/code_to_token') {
    } else {
      const token = getToken()
      if (token) {
        if (config?.headers) {
          config.headers['Authorization'] = `Bearer ${token}`
          config.headers['Content-Type'] = 'application/json'
        }
      }
    }
    return config
  },
  (error: any) => Promise.reject(error)
)

// 响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    let { config, data } = response
    return new Promise((resolve, reject) => {
      if (response.data.message === 'USER_BAN_ERROR') {
       showToast(response.data.error)
       reject(data)
       return
      }
      if (response.data.code !== 0) {
       showToast(response.data.error)
       reject(data)
       return
      }
      resolve(data)
    })
  },
  (error: any) => {
    if (error && error.response) {
      let status = error.response.status
      if (status === 400) {
        showToast('服务异常')
      }
      if (status === 404) {
        showToast('页面请求地址错误')
      }
      if (status === 500) {
        showToast('服务异常')
      }
      if (status === 'canceled') {
        showToast('服务异常')
      }
    }

    // 对响应错误做点什么
    if (error.message.includes('timeout')) { // Check if timeout
      showToast('请求超时')
    }
    return Promise.reject(error)
  }
)

export default instance
