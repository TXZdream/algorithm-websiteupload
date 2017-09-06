var Koa = require('koa')
var http = require('http')
var logger = require('koa-logger')
var koaBody = require('koa-body')
var koaErr = require('koa-err')
var render = require('koa-ejs')
var path = require('path')

var index = require('./router/index')
var app = new Koa()

var server = http.createServer(app.callback())
var port = process.env.PORT || 3000

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: 'html'
})

app.use(logger())
app.use(koaBody())
app.use(koaErr())
app.use(require('koa-static')(path.join(__dirname, 'public')))

app.use(index.routes(), index.allowedMethods())

server.listen(port, () => {
  console.log('Server listening on %d', port)
})
