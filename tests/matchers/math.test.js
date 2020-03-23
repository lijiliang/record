// const math = require('./math.js');
// const { add, minus, multi } = math;
import { add, minus, multi } from './math.js'


test('测试加法 3 + 7', () =>{
  expect(add(3,7)).toBe(10)
})

test('测试减法 3 - 3', () => {
  expect(minus(3,3)).toBe(0)
})

test('测试 3 * 3', () => {
  expect(multi(3,3)).toBe(9)
})

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

// npm run jest
// jest (babel-jest)
// babel-core
// 取 .babeler 配置
// 在运行测试之前，结合babel,先把你的代码做一次转化
// 运行转化过的测试用例代码