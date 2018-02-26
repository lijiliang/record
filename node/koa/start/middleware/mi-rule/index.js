/**
 * 规则中件间 根据 require 加载指定目录文件
 * 作用: 约定代码结构规范， 免去重复加载 require 文件
 * const controller1 = require('...')  -> controller1.fn1()
 * 
 * 引入这个中间件后 app.controller.home.fn1 
 * app.controller.home.fn1 其实就是 cotroller/home.js 中的 fn1 函数
 */
const fs = require('fs')
const Path = require('path')
module.exports = (opts) => {
  let { app, rules = []} = opts

  //如果参数缺少实例 app, 则抛出错误
  if(!app){
    throw new Error('the app params is necessary!')
  }

  // 提取出 app 实例对象中的属性名
  const appKeys = Object.keys(app)
  rules.forEach((item) => {
    let { path, name } = item
    // 如果 app 实例中已经存在了传入过来的属性名，则抛出错误
    if(appKeys.includes(name)){
      throw new Error(`the name of ${nane} already exists!`)
    }

    let content = {}
    // 读取指定文件夹下(dir)的所有文件并遍历
    fs.readdirSync(path).forEach(filename => {
      // 取出文件的后缀
      let extname = Path.extname(filename)
      // 只处理.js文件
      if (extname === '.js'){
        // 将文件名中去掉后缀
        let name = Path.basename(filename, extname)
        // 读取文件中的内容并赋值绑定
        content[name] = require(Path.join(path, filename))
      }
    })
    app[name] = content
  })
}