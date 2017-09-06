var Router = require('koa-router')

var DBOperation = require('../model/index')

var router = new Router()

router.get('/', (ctx, next) => {
  ctx.render('index')
})

router.post('/', async (ctx, next) => {
  var body = ctx.request.body
  var ret = await DBOperation.addUrl(body.id, body.url)
  if (ret) {
    ctx.body = {status: 'OK'}
    return
  }
  ctx.body = {status: 'Fail'}
})

module.exports = router
