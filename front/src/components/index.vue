<template>
  <Card class='card'>
    <h1 slot='title' class='title'>博客网址提交系统</h1>
    <a slot='extra' target='_blank' href='https://github.com/TXZdream/algorithm-websiteupload.git'>
      <Icon type="social-github"></Icon>
    </a>
    <Form :rules='validateRule' ref='formValue' :model='formValue'>
      <FormItem label='学号' prop='id'>
        <Input v-model='formValue.id' placeholder="请输入8位学号"></Input>
      </FormItem>
      <FormItem label='密码' prop='password'>
        <Input type='password' v-model='formValue.password' placeholder="请输入密码，若为首次输入，则该密码将作为账户密码"></Input>
      </FormItem>
      <FormItem label='博客网址' prop='url'>
        <Input v-model='formValue.url' type="textarea" placeholder="只允许输入一个网址" :autosize="{minRows: 3, maxRows: 3}"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click='handleSubmit($event)' class='submit' long>提交</Button>
      </FormItem>
    </Form>
    <router-link to='/list'>跳转到博客列表</router-link>
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
            url: self.formValue.url,
            password: self.formValue.password
          }).then(response => {
            if (response.body.status) {
              self.$Loading.finish()
              self.$Notice.success({
                title: '提交成功',
                desc: '您的博客网址已成功提交'
              })
            } else {
              self.$Loading.error()
              self.$Notice.error({
                title: '提交失败',
                desc: '可能的原因：输入的密码有误、提交的格式不正确、重复提交'
              })
            }
          }, response => {
            self.$Loading.error()
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
      var re = /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/
      if (value === '' || !re.test(value)) {
        callback('URL格式错误，注意检查是否加入http://或https://前缀')
        return
      } else {
        callback()
      }
    }
    var validatePassword = function (rule, value, callback) {
      if (value === '') {
        callback('密码不能为空')
      } else {
        callback()
      }
    }
    return {
      formValue: {
        id: '',
        url: '',
        password: ''
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
        ],
        password: [
          {
            validator: validatePassword,
            trigger: 'blur'
          }
        ]
      }
    }
  }
}
</script>

<style>
.card {
  width: 360px;
  margin: 10% auto;
  height: 515px;
}
.title {
  text-align: center;
}
</style>
