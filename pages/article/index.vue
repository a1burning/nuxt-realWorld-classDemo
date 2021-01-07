<template> 
  <div class="article-page">
    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article"/>

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"/>
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">
          <!-- 文章评论组件 -->
          <article-comments :article="article"/>
        </div>

      </div>

    </div>

  </div>
</template> 
<script> 
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from './components/article-meta';
import ArticleComments from './components/article-comments';
export default { 
    name: 'ArticlePage',
    async asyncData({ params }) {
      const { data } = await getArticle(params.slug)
      const { article } = data
      // 在导出之前将文章内容转化为html
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      console.log(data)
      return {
        article
      }
    },
    components: {
      ArticleMeta,
      ArticleComments
    },
    // 加入这个对SEO非常有用 
    head () {
      return {
        title: `${this.article.title} - RealWorld`,
        // hid：为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，利用hid为meta配一个唯一的标识编号。
        meta: [{
          hid: 'description',
          name: 'description', 
          content: this.article.description
        }]
      }
    },
    props: {},
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