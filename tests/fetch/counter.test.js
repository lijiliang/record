/*
  jest 钩子函数
*/

import Counter from './counter'
let counter = null;

// 测试之前，统一做一些处理
beforeAll(() => {
  console.log('BeforeAll')
})

// 每一个测试用例子执行前
beforeEach(() => {
  console.log('BeforeEach')
  counter = new Counter()
})

afterEach(() => {
  console.log('AfterEach')
})

// 所有测试用例执行完后afterall才执行
afterAll(() => {
  console.log('AfterAll')
})

// describe jest 分组方法
describe('测试增加相关的代码', () => {

  // 在内层的describe也可以添加钩子函数
  beforeEach(() => {
    console.log('beforeEach test add')
  })

  test('测试 Counter 中的 addOne 方法', () => {
    console.log('测试 Counter 中的 addOne 方法')
    counter.addOne()
    expect(counter.number).toBe(1)
  })
  test('测试 Counter 中的 addTwo 方法', () => {
    console.log('测试 Counter 中的 addTwo 方法')
    counter.addTwo()
    expect(counter.number).toBe(2)
  })
})

describe('测试减少相关的代码', () => {
  test('测试 Counter 中的 minusOne 方法', () => {
    console.log('测试 Counter 中的 minusOne 方法')
    counter.minusOne();
    expect(counter.number).toBe(-1)
  })

  test('测试 Counter 中的 minusTwo 方法', () => {
    console.log('测试 Counter 中的 minusTwo 方法')
    counter.minusTwo();
    expect(counter.number).toBe(-2)
  })

})