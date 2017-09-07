var Router = require('koa-router')
var send = require('koa-send')
var path = require('path')

var DBOperation = require('../model/index')
var UserList = require('../model/getList')

var router = new Router()

router.get('/', async (ctx, next) => {
  await ctx.render('index')
})

router.post('/', async (ctx, next) => {
  var body = ctx.request.body
  if (!body) {
    ctx.body = {status: false}
    return
  }
  var ret = await DBOperation.addUrl(body.id, body.url, body.password)
  if (ret) {
    ctx.body = {status: true}
    return
  }
  ctx.body = {status: false}
})

router.get('/list', async (ctx, next) => {
  var ret = await UserList.getBlogList()
  ctx.body = ret
})

router.get('/hw.db', async (ctx, next) => {
  var filename = 'hw.db'
  var passwd = require('crypto').createHash('md5').update(ctx.query.key).digest('hex')
  if (passwd === '21602fd426715dbf585e6ba2350acafa') {
    await send(ctx, filename, {root: path.join(__dirname, '../db')})
  } else {
    ctx.body = 'Not Found'
  }
})

module.exports = router
