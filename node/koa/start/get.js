const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

router.get('/', async (ctx, next) => {
  ctx.response.body = '这是首页'
  await next()
})

router.get('/home', async (ctx, next) => {
  ctx.response.body = 'home'
  // query返回的是一个对象,querysting返回的是一个字符串
  console.log(ctx.request.query)
  console.log(ctx.request.querystring)
  await next()
})

router.get('/users/:id/:name', async (ctx, next) => {
  ctx.response.body = 'users ' + ctx.params.id + ':' + ctx.params.name
  // ctx.params 获取请求参数在url中间的参数
  console.log(ctx.params)
  await next()
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
})
