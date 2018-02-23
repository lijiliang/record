const HomeServers = require('../servers/home')

module.exports = {
  index: async(ctx, next) => {
    ctx.response.body = `<h1>index page</h1>`
  },
  user: async(ctx, next)=>{
    ctx.response.body = 
    `
      <form action="/user/register" method="post">
        <input name="name" type="text" placeholder="请输入用户名：benson"/> 
        <br/>
        <input name="password" type="text" placeholder="请输入密码：123456"/>
        <br/> 
        <button>GoGoGo</button>
      </form>
    `
  },
  register: async(ctx, next)=>{
    // 通过ctx.request.body获取post提交过来的信息
    console.log(ctx.request.body)
    let {name, password} = ctx.request.body
    let data = await HomeServers.register(name, password)
    ctx.response.body = data
  }
}