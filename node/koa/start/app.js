const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')

// 添加bodyParser中间件，让koa支持通过ctx.request.body获取post提交过来的数据
app.use(bodyParser())

router(app)

app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
})