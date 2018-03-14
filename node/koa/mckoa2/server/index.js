const Koa = require("koa")
const logger = require('koa-logger')
const session = require('koa-session')
const app = new Koa()
// app.use(async (ctx, next) => {
//   console.log(ctx)
//   ctx.type = 'text/html; charset=utf-8'
//   ctx.body = 'hi Benson'
// })
app.keys = ['Hi Benben']
app.use(logger())
app.use(session(app))

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});

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