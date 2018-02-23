const router = require('koa-router')()
const HomeController = require('./controller/home')

module.exports = (app) => {
  router.get('/', HomeController.index)
  
  router.get('/user', HomeController.user)
  
  // 增加响应表单请求的路由
  router.post('/user/register', HomeController.register)

  app.use(router.routes())
    .use(router.allowedMethods())
}