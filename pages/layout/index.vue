<template> 
    <div>
      <!-- nav -->
      <nav class="navbar navbar-light">
        <div class="container">
          <nuxt-link 
            class="navbar-brand" 
            to="/"
            exact
          >conduit</nuxt-link>
          <ul class="nav navbar-nav pull-xs-right">
            <li class="nav-item">
              <!-- Add "active" class when you're on that page" -->
              <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
            </li>
            <template v-if="user">
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/editor"><i class="ion-compose"></i>&nbsp;New Post</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/settings">
                  <i class="ion-gear-a"></i>&nbsp;Settings
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/profile/112">
                  <img class="user-pic" :src="user.image? user.image : defaultImage">
                  {{ user.username }}
                </nuxt-link>
              </li>
            </template>
            <template v-else>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
              </li>
            </template>
          </ul>
        </div>
      </nav>
      <!-- /nav end -->

      <!-- 子路由 -->
      <nuxt-child/>
      <!-- / 子路由 -->

      <!-- footer -->
      <footer>
        <div class="container">
          <a href="/" class="logo-font">conduit</a>
          <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
      <!-- /footer end -->
    </div>
</template> 
<script> 
import { mapState } from 'vuex'
export default { 
  name: 'LayoutPage',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      defaultImage: 'https://tvax4.sinaimg.cn/crop.0.0.512.512.1024/001nd69sly8gjfgoc7b8dj60e80e8q3a02.jpg?KID=imgbed,tva&Expires=1609784063&ssig=EQg2ckyhVH'
    }
  }
} 
</script> 

<style> </style>