/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'

// 按需导出
export const request = axios.create({
  // 在页面模板中有设置基准路径，后面跟api
  baseURL: 'https://conduit.productionready.io'
})

// 插件导出函数只能用一个成员，且是默认成员
// 通过插件机制获取到上下文对象(query,params,req,res,app,store...)
export default ({ store }) => {
  // // 请求拦截器
  //   // 任何请求都要经过拦截器，可以在请求拦截器中做一些公共的业务处理，例如统一设置 token
    request.interceptors.request.use(function (config) {
      // 请求会经过这里
      // 这里拿到的config是请求中的所有数据，先拿到请求头，然后写文档中要求的字段Authorization
      const { user } = store.state
      if (user && user.token) {
        config.headers.Authorization = `Token ${user.token}`
      }

      // 返回 config 请求配置对象
      return config;
    }, function (error) {
      // 如果请求失败(此时请求还没有发出去)就会进入这里
      // Do something with request error
      return Promise.reject(error);
    });
  // // 相应拦截器
}
