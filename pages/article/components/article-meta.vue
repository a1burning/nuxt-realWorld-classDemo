<template> 
  <div class="article-meta">
    <!-- 作者头像 -->
    <nuxt-link 
      :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        <img :src="article.author.image" />
    </nuxt-link>
    <!-- 名称、日期 -->
    <div class="info">
      <nuxt-link 
        :to="{
          name: 'profile',
          params: {
            username: article.author.username
          }
        }" 
        class="author"
      >
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <!-- 关注 -->
    <button 
      class="btn btn-sm btn-outline-secondary"
      :class="{
        active: article.author.following
      }"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons
    </button>
    &nbsp;&nbsp;
    <!-- 点赞 -->
    <button 
      class="btn btn-sm btn-outline-primary"
      :class="{
        active: article.favorited
      }"
    >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>   
<script> 
export default { 
    name: 'ArticleMeta',
    components: {}, 
    props: {
      article: {
        type: Object,
        require: true
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
}
</script> 

<style> </style>