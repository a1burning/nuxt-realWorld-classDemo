<template> 
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <!-- 展示大标题 -->
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <!-- 跳转登录/注册 -->
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- 先将errors对象进行遍历，massages是数组，也进行遍历，将key在前，value在后 -->
            <template 
              v-for="(messages, field) in errors">
              <li 
                v-for="(message, index) in messages" 
                :key="index"
              >
              {{ field }} {{ massage }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <!-- name这一栏在注册页面才有 -->
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <!-- email -->
            <fieldset class="form-group">
              <input 
                v-model="user.email"
                class="form-control form-control-lg" 
                type="email"
                placeholder="Email"
                required>
            </fieldset>
            <!-- password -->
            <fieldset class="form-group">
              <input
                v-model="user.password"
                class="form-control form-control-lg"
                type="password" 
                placeholder="Password"
                required
                minlength="8">
            </fieldset>
            <!-- 底部button区别文案 -->
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template> 
<script> 
import { login, register } from '@/api/user'
// 仅在客户端加载 js-cookie 包
// process只在nuxt中特殊提供的数据，true是客户端，false是服务端
const Cookie = process.client ? require('js-cookie') : undefined
export default { 
  middleware: 'noauthenticated',
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息,格式是key：value[]
    }
  },
  computed: {
    isLogin () {
      // 用name比path更合适，因为名字是自己起的
      return this.$route.name === 'login'
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      try {
        // 提交表单请求登录或者注册
        const { data } = this.isLogin 
          ? await login({
            user: this.user
          })
          : await register({
            user: this.user
          })

        console.log(data)
        // 保存用户的登录状态
        // 1. 将程序运行期间的状态先存在内存中
        this.$store.commit('setUser', data.user)
        // 2. 为了防止刷新页面数据丢失，将状态持久化，放入cookie里，这个方法会将数据进行编码转成字符串放在cookie里
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
      }
      
    }
  }
}
</script> 

<style> </style>