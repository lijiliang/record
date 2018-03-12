const fs = require('fs')

// fs.readFile('./package.json', (err, data) => {
//   if (err) return console.log(err)

//   data = JSON.parse(data)
//   console.log(data.scripts)
// })

// promise
function readFileAync (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

// readFileAync('./packages.json').then(data => {
//   data = JSON.parse(data)
//   console.log(data.scripts)
// }).catch(err => {
//   console.log(err)
// })

const util = require('util')

util.promisify(fs.readFile)('./package.json')
  .then(JSON.parse)
  .then(data => {
    console.log(data.name)
  })
  .catch(err => {
    console.log(err)
  })