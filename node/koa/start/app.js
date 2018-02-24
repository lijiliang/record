const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware/index')

middleware(app)
router(app)

app.listen(3000, () => {
  console.log('server is runing at http://localhost:3000')
})