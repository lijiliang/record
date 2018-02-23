// 处理各种数据 

module.exports = {
  register: async(name, pwd) => {
    let data 
    if (name === 'benson' && pwd === '123456'){
      data = `Hello, ${name}!`
    }else {
      data = '帐号密码错误'
    }
    return data
  }
}