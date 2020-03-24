import addDivToBody from './dom'
import $ from 'jquery'

test('测试 addDivToBody ', () => {
  addDivToBody()
  addDivToBody()
  expect($('body').find('div').length).toBe(2)
  console.log($('body').find('div').length)
})

// node不具备 dom
// jest 在 node 环境下自己模拟了 dom 的 api, jsDom