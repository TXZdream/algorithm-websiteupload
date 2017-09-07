<template>
  <Card class='card'>
    <h1 slot='title' class='title'>博客网址提交系统</h1>
    <Form :rules='validateRule' ref='formValue' :model='formValue'>
      <FormItem label='学号' prop='id'>
        <Input v-model='formValue.id' placeholder="请输入8位学号"></Input>
      </FormItem>
      <FormItem label='博客网址' prop='url'>
        <Input v-model='formValue.url' type="textarea" placeholder="只允许输入一个网址" :autosize="{minRows: 7, maxRows: 9}"></Input>
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
      var self = this
      ev.preventDefault()
      this.$refs['formValue'].validate((valid) => {
        if (!valid) {
          self.$Message.error('表单验证失败')
        } else {
          this.$Loading.start()
          this.$http.post('/', {
            id: self.formValue.id,
            url: self.formValue.url
          }).then(response => {
            console.log(response.body)
            if (response.body.status) {
              self.$Loading.finish()
              console.log('Success')
              self.$Notice.success({
                title: '提交成功',
                desc: '您的博客网址已成功提交'
              })
            } else {
              self.$Loading.error()
              console.log('Failed-IncorrectData')
              self.$Notice.error({
                title: '提交失败',
                desc: '您的内容格式可能错误，或您已经提交过该博客地址'
              })
            }
          }, response => {
            self.$Loading.error()
            console.log('Failed-NetworkPronlem')
            self.$Notice.warning({
              title: '提交失败',
              desc: '与后台服务器连接失败，请联系管理员协助解决问题'
            })
          })
        }
      })
    }
  },
  data () {
    var validateID = function (rule, value, callback) {
      var re = /^(1)(4|5)([0-9]){6}/
      if (value === '' || value.length !== 8 || !re.test(value)) {
        callback(new Error('请输入8位有效学号'))
      } else {
        callback()
      }
    }
    var validateURL = function (rule, value, callback) {
      var re = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/
      if (value === '' || !re.test(value)) {
        callback('网址格式错误，注意检查是否加入http://或https://前缀')
        return
      } else {
        callback()
      }
    }
    return {
      formValue: {
        id: '',
        url: ''
      },
      validateRule: {
        id: [
          {
            validator: validateID,
            trigger: 'blur'
          }
        ],
        url: [
          {
            validator: validateURL,
            trigger: 'blur'
          }
        ]
      }
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
