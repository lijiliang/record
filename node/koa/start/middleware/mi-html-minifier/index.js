/**
 * 压缩html中间件
 */
const minif = require('html-minifier').minify

module.exports = () => {
  return async(ctx, next) => {
    await next()

    // 如果请求类型不是html，直接返回
    if(!ctx.response.is('html')) return

    let body = ctx.body
    if(!body || body.pipe) return
    if(Buffer.isBuffer(body)){
      body = body.toString()
    }
    ctx.body = minif(body, {
      collapseWhitespace: true,  // 去除所有空格
      minifyCSS: true,
      minifyJS: true
    })
  }
}