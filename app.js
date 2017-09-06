var Koa = require('koa')
var http = require('http')
var logger = require('koa-logger')
var Pug = require('koa-pug')
var koaBody = require('koa-body')
var koaErr = require('koa-err')

var index = require('./router/index')
var app = new Koa()
var pug = new Pug({
  viewPath: './views',
  pretty: false,
  debug: false,
  locals: {
    title: '博客地址提交系统'
  }
})

var server = http.createServer(app.callback())
var port = process.env.PORT || 3000

app.use(logger())
app.use(koaBody())
app.use(koaErr())
app.use(require('koa-static')('static/'))
pug.use(app)

app.use(index.routes(), index.allowedMethods())

server.listen(port, () => {
  console.log('Server listening on %d', port)
})
