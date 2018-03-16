const Koa = require("koa")
const logger = require('koa-logger')
const session = require('koa-session')
const app = new Koa()
// app.use(async (ctx, next) => {
//   console.log(ctx)
//   ctx.type = 'text/html; charset=utf-8'
//   ctx.body = 'hi Benson'
// })
app.keys = ['Hi Benson']
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

class Point2D{
  constructor(x, y){
    this.x = x
    this.y = y
  }
  toString() {
    return `(${this.x}, ${this.y})`
  }
}

// 继承
class Point3D extends Point2D{
  constructor(x, y, z){
    super(x, y)
    this.z = z
  }
  toString() {
    return `${this.x}, ${this.y}, ${this.z}`
  }
}

let point2d = new Point2D(10,2)
console.log(point2d.toString())

let point3d = new Point3D(10,2,8)
console.log(point3d.toString())