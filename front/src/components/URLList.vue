<template>
  <div>
    <h1 class='title' title='点击查看所有列表' @click="jump({})">博客列表</h1>
    <div v-for='item in items' :key='item.id'>
      <Card :title='item.id' class='urllist-item' dis-hover>
        <p slot='title' @click='jump({id:item.id})'>{{item.name}}</p>
        <p slot='extra' @click='jump({date:item.time})'>{{item.time}}</p>
        <a :href='item.url' target='_blank'>{{item.url}}</a>
      </Card>
    </div>
    <BackTop :height="100" :bottom="50">
      <div class="top">返回顶端</div>
    </BackTop>
   </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      items: []
    }
  },
  methods: {
    getBlogList: function () {
      this.$Loading.start()
      var self = this
      this.$http.get('/list', {
        params: this.$route.query
      }).then(response => {
        if (response.body.status) {
          self.$Loading.finish()
          this.items = response.body.data
        } else {
          self.$Loading.error()
        }
      }, response => {
        self.$Loading.error()
      })
    },
    jump: function (param) {
      this.$router.push({path: '/list', query: param})
      this.getBlogList()
    }
  },
  beforeMount: function () {
    this.getBlogList()
  }
}
</script>

<style>
.title {
  margin: 20px 0;
  text-align: center
}
.urllist-item {
  width: 55%;
  margin: 2px auto
}
.top{
  padding: 10px;
  background: rgba(0, 153, 229, .7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
