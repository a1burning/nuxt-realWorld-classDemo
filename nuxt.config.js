/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    base: '/nuxt-realworld-classdemo',
    // 自定义高亮类名，默认nuxt-link-active
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除 Nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
       // 然后添加自己的路由对象
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',// 注册和登录一个组件，这里单独配置一个路由
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username',// 要和人家规定的一样
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings',
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug', // 动态路由，slug是链接
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        }
      ])
    }
   },

   // host默认是localhost，这个只提供本机服务，如果要提供外部访问，这里要设置成0.0.0.0，他就会监听所有的网卡地址。如果是本地就是整个局域网都可以访问到。
   server: {
    host: '0.0.0.0',
    port: 80
   },

   // 注册插件,前面要加~，从根路径出发的意思
   plugins: [
     '~/plugins/request.js',
     '~/plugins/dayjs.js'
   ]
 }