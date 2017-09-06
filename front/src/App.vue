<template>
  <Card class='card'>
    <p slot='title' class='title'>博客网址提交系统</p>
    <Form>
      <FormItem label='学号'>
        <Input v-model='id' placeholder="请输入8位学号"></Input>
      </FormItem>
      <FormItem label='博客网址'>
        <Input v-model='url' type="textarea" placeholder="只允许输入一个网址" :rows="5"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click='handleSubmit($event)' class='submit' long>提交</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
export default {
  name: 'app',
  methods: {
    handleSubmit: function (ev) {
      ev.preventDefault()
      var self = this
      this.$http.post('/', {
        id: self.id,
        url: self.url
      }).then(response => {
        if (response.status) {
          console.log('Success')
        } else {
          console.log('Failed-IncorrectData')
        }
      }, response => {
        console.log('Failed-NetworkPronlem')
      })
    }
  },
  data () {
    return {
      id: '',
      url: ''
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.card {
  width: 360px;
  margin: 10% auto;
  height: 500px;
}
.title {
  text-align: center;
}
body {
  background: url(assets/bg.jpg) repeat;
}
</style>
