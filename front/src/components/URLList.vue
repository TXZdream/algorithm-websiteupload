<template>
  <div>
    <h1 class='title'>博客列表</h1>
    <div v-for='item in items' :key='item.id'>
      <Card :title='item.id' class='urllist-item' dis-hover>
        <p slot='title'>{{item.name}}</p>
        <p slot='extra'>{{item.time}}</p>
        <a :href='item.url' target='_blank'>{{item.url}}</a>
      </Card>
    </div>
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
      this.$http.get('/list').then(response => {
        if (response.body.status) {
          self.$Loading.finish()
          this.items = response.body.data
        } else {
          self.$Loading.error()
        }
      }, response => {
        self.$Loading.error()
      })
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
</style>
