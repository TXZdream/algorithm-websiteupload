var Router = require('koa-router')

var DBOperation = require('../model/index')

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
  var ret = await DBOperation.addUrl(body.id, body.url)
  if (ret) {
    ctx.body = {status: true}
    return
  }
  ctx.body = {status: false}
  console.log(ctx.body)
})

module.exports = router
