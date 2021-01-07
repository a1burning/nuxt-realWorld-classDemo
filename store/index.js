// 在服务端渲染期间运行的都是同一个实例

import { request } from "../plugins/request"
const cookieparser = process.server ? require('cookieparser') : undefined

// 为了防止数据冲突，务必把state定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxt中特殊的action方法
  // 这个 action 方法会在服务端渲染期间自动调用，且仅在服务端调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    // 如果请求头中有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 json 对象
      const parsed = cookieparser.parse(req.headers.cookie)
      // 如果存的不是json字符串，避免报错
      try{
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
        // 失败不用做处理，还是null
      }
    }

    // 提交mutation修改state状态
    commit('setUser', user)
  }
}