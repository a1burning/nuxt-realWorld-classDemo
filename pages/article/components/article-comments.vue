<template>
  <div>
    <!-- 发表评论 -->
    <form class="card comment-form">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
    
    <!-- 评论卡片 -->
    <div class="card" 
      v-for="comment in comments"
      :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{ comment.body }}</p>
      </div>
      <div class="card-footer">
        <nuxt-link 
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link 
          class="comment-author"
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username
            }
          }">
          {{ comment.author.username }}
        </nuxt-link>
        <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments } from '@/api/article'
export default {
  name:'articleComments',
  data () {
    return {
      comments: [] // 文章列表
    }
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  async mounted () {
    const { data } = await getComments(this.article.slug)
    console.log(data)
    this.comments = data.comments
  }
}
</script>

<style>

</style>