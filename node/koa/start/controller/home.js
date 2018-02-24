const HomeServers = require('../servers/home')

module.exports = {
  json: async(ctx, next) => {
    ctx.sendjson({
      status: '200', 
      data: {
        aa: 'aa',
        bb: [1,2,3,4,5]
      }
    })
  },
  index: async(ctx, next) => {
    await ctx.render('home/index', {
      title: '首页'
    })
  },
  user: async(ctx, next)=>{
    await ctx.render('home/login', {
      title: '登录页',
      btnName: 'GOGOGO'
    })
  },
  register: async(ctx, next)=>{
    // 通过ctx.request.body获取post提交过来的信息
    // console.log(ctx.request.body)
    let {name, password} = ctx.request.body
    let res = await HomeServers.register(name, password)
    if(res.status == "-1"){
      await ctx.render("home/login", res.data)
    }else{
      ctx.state.title = "个人中心"
      await ctx.render("home/success", res.data)
    }
  }
}