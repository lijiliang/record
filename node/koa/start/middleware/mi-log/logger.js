/**
 * log 日志中间件
 */

const log4js = require('log4js')
// 日志输出信息
const access = require('./access')

// 将日志的不同级别撮为数组
const methods = ["trace", "debug", "info", "warn", "error", "fatal", "mark"]

module.exports = (options) => {
  let coontentLogger = {}
  // 提取默认公用参数对象
  const defaultInfo = {
    env: 'dev',
    dir: 'logs',
    appLogLevel: 'info',
    projectName: 'start',
    serverIp: '0.0.0.0'
  }
  // 将传入的配置项与当前配置项合并
  const opts = Object.assign({}, defaultInfo, options)
  // 需要的变量解构 方便使用
  const { env, dir, appLogLevel, serverIp, projectName } = opts
  const commonInfo = { projectName, serverIp }

  const appenders = {
    cheese: {
      type: 'dateFile', // 日志类型 
      filename: `${dir}/task`,  // 输出的文件名
      pattern: '-yyyy-MM-dd.log',  // 文件名增加后缀
      alwaysIncludePattern: true   // 是否总是有后缀名
    }
  }

  // 环境变量为dev local development 认为是开发环境
  if(env === 'dev' || env === 'local' || env === 'development') {
    appenders.out = {
      type: 'console'
    }
  }

  const config = {
    appenders: appenders,
    categories: { default: { appenders: Object.keys(appenders), level: appLogLevel } }
  }

  return async (ctx, next) => {
    const start = +new Date()
    log4js.configure(config);

    const logger = log4js.getLogger('cheese');

    // 循环methods将所有方法挂载到ctx上
    methods.forEach((method, i) => {
      coontentLogger[method] = (message) => {
        // 传入参换为函数返回的字符串
        logger[method](access(ctx, message, commonInfo))
      }
    })
    ctx.log = coontentLogger

    await next()
  
    const end = +new Date()
    const responseTime = end - start
    logger.info(access(ctx, {
      responseTime: `响应时间为${responseTime/1000}s`
    }, commonInfo))
  }
}