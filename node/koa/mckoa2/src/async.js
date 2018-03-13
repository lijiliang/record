const fs = require('fs')
const util = require('util')

// 第一阶段   回调函数
// function readFile(cb) {
//   fs.readFile('./package.json', (err, data) => {
//     if (err) return cb(err)
//     cb && cb(null, data)
//   })
// }

// readFile((err, data) => {
//   if(!err){
//     data = JSON.parse(data)
//     console.log(data.name)
//   }
// })

// 第二阶段 Promise
// function readFileAync (path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//       if (err) reject(err)
//       else resolve(data)
//     })
//   })
// }

// readFileAync('./package.json')
//   .then(data => {
//     data = JSON.parse(data)
//     console.log(data.name)
//   })
//   .catch(err => {
//     console.log(err)
//   })

 
// 第三阶段  利用co库 + Generator Function + Promise
// const co = require('co')

// co(function *(){
//   let data = yield util.promisify(fs.readFile)('./package.json')

//   data = JSON.parse(data)
//   console.log(data.name)
// })

// 第四阶段 Async 统一世界
const readAync = util.promisify(fs.readFile)

async function init () {
  let data = await readAync('./package.json')

  data = JSON.parse(data)
  console.log(data.name)
}
init()