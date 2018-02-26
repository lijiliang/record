// 中间件集合
const path = require('path')
const ip = require('ip')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')
const miRule = require('./mi-rule')

module.exports = (app) => {
  // 请求错误中间件
  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../errorPage')  //自定义错误文件目录
  }))

  // 处理静态资源目录
  app.use(staticFiles(path.resolve(__dirname, '../public')))

  // 模板中间件
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'), // 指定视图目录
    nunjucksConfig: {
      trimBlocks: true  // 开启转义 防Xss
    }
  }))

  // 日志中间件 将配置中间件的参数在注册中间件时作为参数传入
  app.use(miLog({
    env: app.env,  // koa 提供的环境变量
    projectName: 'koa2-start',
    appLogLevel: 'info',
    dir: 'logs',
    serverIp: ip.address()
  }))

  // 添加bodyParser中间件，让koa支持通过ctx.request.body获取post提交过来的数据
  app.use(bodyParser())

  app.use(miSend())

  /**
   * 规则中件间
   * 指定 controller 文件夹下的 js 文件，挂载在 app.controller 属性
   * 指定 service 文件夹下的 js 文件，挂载在 app.service 属性
   */ 
  miRule({
    app,
    rules: [
      {
        path: path.join(__dirname, '../controller'),
        name: 'controller'
      },
      {
        path: path.join(__dirname, '../service'),
        name: 'service'
      }
    ]
  })

  // 增加错误的监听处理
  app.on('error', (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500){
      ctx.status = 500
    }
    if(ctx && ctx.log && ctx.log.error){
      if(!ctx.state.logged){
        ctx.log.error(err.stack)
      }
    }
  })

}