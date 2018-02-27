/**
 * 日志信息
 * @param {Object} ctx koa上下文 
 * @param {String} message  日志信息
 * @param {Object} commonInfo 项目的一些基本配置
 */
module.exports = (ctx, message, commonInfo) => {
  const { 
    method,  // 请求方法 get post 或其它
    url,  // 请求链接
    host, // 发送请求的客户端的host
    headers // 请求中的headers
  } = ctx.request
  // ctx.set('Cache-Control', 'no-cache')
  // console.log(ctx.response.get('Cache-Control'))
  // console.log(ctx.request)
  const client = {
    method,
    url,
    host,
    message,
    referer: headers['referer'],  // 请求的源地址
    userAgent: headers['user-agent']  // 客户端信息 设备及浏览器信息
  }
  // 取出 ctx 对象中请求相关信息及客户端 userAgent 等信息并转为字符串
  return JSON.stringify(Object.assign(client, commonInfo))
}