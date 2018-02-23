const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

// app.use(async (ctx, next) => {
//   if(ctx.request.path === '/'){
//     ctx.response.body = '<h1>index Page</h1>'
//   }else{
//     await next()
//   }
// })

// app.use(async (ctx, next) => {
//   if(ctx.request.path === '/user'){
//     ctx.response.body = '<h1>user Page</h1>'
//   }else{
//     await next()
//   }
// })

// 添加路由
router.get('/', async (ctx, next) => {
  ctx.response.body = '<h1>index Page</h1>'
})
router.get('/abc', async (ctx, next) => {
  ctx.response.body = '<h1>abc Page</h1>'
})

// 命名路由
router.get('user', '/user/:id', async (ctx, next) => {
  ctx.response.body = '<h1>user Page</h1>'
})

// 生成路由/user/3
const userUrl = router.url('user', 3)
console.log('userUrl', userUrl)

const userUrl2 = router.url('user', {id: 4})
console.log('userUrl2', userUrl2)

router.get('/users/:id',
  async (ctx, next) => {
    ctx.response.body = '<h1>users</h1>'
    // 通过ctx.params访问路由参数
    ctx.user = {id: ctx.params.id, name: 'xiaoming'}
    await next()
  }, 
  async (ctx) => {
    console.log(ctx.user)
  })

router.all('/*', async (ctx, next) => {
  ctx.response.status = 404
  ctx.response.body = '<h1>Not Found</h1>'
})

// 调用中间件 
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
})