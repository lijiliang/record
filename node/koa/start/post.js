const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const app = new Koa()

// 添加bodyParser中间件，让koa支持通过ctx.request.body获取post提交过来的数据
app.use(bodyParser())

router.get('/', async(ctx, next) => {
  ctx.response.body = `<h1>index page</h1>`
})

router.get('/user', async(ctx, next)=>{
  ctx.response.body = 
  `
    <form action="/user/register" method="post">
      <input name="name" type="text" placeholder="请输入用户名：benson"/> 
      <br/>
      <input name="password" type="text" placeholder="请输入密码：123456"/>
      <br/> 
      <button>GoGoGo</button>
    </form>
  `
})

// 增加响应表单请求的路由
router.post('/user/register',async(ctx, next)=>{
  // 通过ctx.request.body获取post提交过来的信息
  console.log(ctx.request.body)
  let {name, password} = ctx.request.body
  if( name === 'benson' && password === '123456' ){
    ctx.response.body = `Hello， ${name}！`
  }else{
    ctx.response.body = '账号信息错误'
  }
})

app.use(router.routes())
app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
})