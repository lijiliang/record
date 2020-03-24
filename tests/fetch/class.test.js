jest.mock('./util')
// const Util = jest.fn()
// Util.a = jest.fn()
// Util.b = jest.fn()
// jest.mock 发现 util 是一个类，会自动把类的构造函数和方法变成  jest.fn()

import Util from './util'
import domeFunction from './class'

test('测试 domeFunction 类', () => {
  // 测试类只需要知道里面的类执行过就好了
  domeFunction()
  expect(Util).toHaveBeenCalled()
  expect(Util.mock.instances[0].a).toHaveBeenCalled()  // 测试是否执行过a方法
  expect(Util.mock.instances[0].b).toHaveBeenCalled()
  console.log(Util.mock, Util.mock.instances[0])
})