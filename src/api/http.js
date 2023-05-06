import axios from 'axios'
import session from '@/utils/session' // 引入sessiontorage组件
import { Toast } from 'vant'

// 设置接口路径
const url = 'http://192.168.124.15:8082'  // 测试
console.log(process.env,778)
let http = axios.create({
    baseURL: url,
    // baseURL:process.env.VUE_APP_BASE_API,
    timeout: 10000, // 请求延时时间
})

// 添加请求拦截器
http.interceptors.request.use(
    config => {
      let token = localStorage.getItem('token')
      if (token) {
        // config.headers.Authorization = token // 将token设置成请求头
        config.headers["Authorization"] = token?token:1;
        config.headers['Content-Type'] = 'application/json' // 将token设置成请求头
      }
      return Promise.resolve(config)
    },
    error => {
      return Promise.reject(error)
    }
)

// 添加响应拦截器
http.interceptors.response.use(
    res => {
        let data = res.data
        return Promise.resolve(data)

    },
    error => {
        console.log(error,66666)
        if (error && error.response) {
            let { status } = error.response.data
            if (status === 400) {
                Toast('服务异常')
            }
            if (status === 404) {
                Toast('页面请求地址错误')
            }
            if (status === 500) {
                Toast('服务异常')
            }
            if (status === 'canceled') {
                Toast('服务异常')
            }
        }

        // 对响应错误做点什么
        if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
            this.$toast.error('请求超时')
        }
        return Promise.reject(error)
    }
)

export {
    http
}