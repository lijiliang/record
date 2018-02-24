/**
 * 解析JSON的中间件 
 */
module.exports = () => {
  function render(json) {
    this.set('Content-Type', 'application/json')
    this.body = JSON.stringify(json)
  }
  return async (ctx, next) => {
    ctx.sendjson = render.bind(ctx)
    await next()
  }
}