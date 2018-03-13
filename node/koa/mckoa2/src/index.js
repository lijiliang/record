// import fs from 'fs'

// import { promisify } from 'util'
// import { resolve as r } from 'path'
// import { readFile, writeFileSync as wfs } from 'fs'
// import * as qs from 'querystring'

// promisify(readFile)(r(__dirname, '../package.json'))
//   .then(data => {
//     data = JSON.parse(data)

//     console.log(data.name) 

//     wfs(r(__dirname, './name'), String(data.name), 'utf8')
//   })



// import { name } from './ex'
// import { getName } from './ex'

import { name, getName } from './ex'
import age from './ex'

// 批量导入并重命名
import {
  name2 as name3,
  getName2 as getName3,
  age2 as age3
} from './ex'  

console.log(name, getName(), age)
console.log(name3, getName3(), age3)
