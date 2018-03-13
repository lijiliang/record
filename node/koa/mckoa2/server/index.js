const Koa = require("koa")
const logger = require('koa-logger')
const app = new Koa()
// app.use(async (ctx, next) => {
//   console.log(ctx)
//   ctx.type = 'text/html; charset=utf-8'
//   ctx.body = 'hi Benson'
// })



const mid1 = async(ctx, next) => {
  ctx.body = 'hi'
  await next()
  ctx.body = ctx.body + ' there'
}

const mid2 = async(ctx, next) => {
  ctx.type = 'html'
  await next()
}

const mid3 = async(ctx, next) => {
  ctx.body = ctx.body + ' benson'
  await next()
}

app.use(logger())
app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(3998)


function pure(x){
  return x + 1
}

// function tail(i){
//   if(i>3) return
//   console.log('修改前', i)
//   tail(i + 1)
//   console.log('修改后', i)
// }

function tail(i){
  if (i>3) return i
  console.log('修改前', i) 
  return tail(i + 1)
}
// { request:
//   { method: 'GET',
//     url: '/',
//     header:
//      { host: 'localhost:3998',
//        connection: 'keep-alive',
//        'cache-control': 'max-age=0',
//        'upgrade-insecure-requests': '1',
//        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
//        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//        'accept-encoding': 'gzip, deflate, br',
//        'accept-language': 'zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7',
//        cookie: 'locale=zh-CN; _ga=GA1.1.604528760.1511497279; io=IpcK8HB4Vxuo_zLwAAAQ' } },
//  response: { status: 404, message: 'Not Found', header: {} },
//  app: { subdomainOffset: 2, proxy: false, env: 'development' },
//  originalUrl: '/',
//  req: '<original node req>',
//  res: '<original node res>',
//  socket: '<original node socket>' }