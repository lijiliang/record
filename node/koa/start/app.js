const Koa = require('koa')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const router = require('./router')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

// 处理静态资源目录
app.use(staticFiles(path.resolve(__dirname, './public')))

// 模板中间件
app.use(nunjucks({
  ext: 'html',
  path: path.join(__dirname, 'views'), // 指定视图目录
  nunjucksConfig: {
    trimBlocks: true  // 开启转义 防Xss
  }
}))

// 添加bodyParser中间件，让koa支持通过ctx.request.body获取post提交过来的数据
app.use(bodyParser())

router(app)



app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
})