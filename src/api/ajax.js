// 封装axios,设置请求拦截器和响应拦截器
// 引入axios
import axios from 'axios'
// 引入nprogress插件包及样式
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { Toast } from 'vant'
// 1. 配置一个通用的基础路径和请求超时时间
const ajax = axios.create({
  // 注意大小写
  baseURL: '/api', // 前缀路径
  timeOut: 20000 // 连接请求超时时间
})
// 请求拦截器
ajax.interceptors.request.use((config) => {
  // 2.请求的时候显示进度条
  Nprogress.start() // 此时是显示进度条(响应成功了或者失败的时候需要隐藏进度条)
  const { accessToken } =
    JSON.parse(window.localStorage.getItem('accessToken')) || ''
  if (accessToken) {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    config.headers.Authorization = accessToken
  }
  return config
})
// 响应拦截器
ajax.interceptors.response.use(
  (response) => {
    Nprogress.done() // 隐藏进度条
    // 3. 响应成功后返回的是数据response.data,不是response
    return response.data
  },
  (error) => {
    Nprogress.done() // 隐藏进度条
    // 4.统一处理请求错误,具体的请求可以选择处理或不处理
    Toast.fail(error.response.data.msg)
    return Promise.reject(error) // 返回失败的Promise,具体的请求可以再处理
  }
)
// 向外暴露ajax
export default ajax
