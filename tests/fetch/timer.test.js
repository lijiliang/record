import {timer, timer1 }  from './timer'

// jest.useFakeTimers();

beforeEach(() => {
  jest.useFakeTimers();
})


// test('测试 timer 定时器', (done) => {
//   timer(() => {
//     expect(1).toBe(1);
//     done()
//   })
// })

test('测试 timer 定时器', () => {
  const fn = jest.fn()
  timer(fn)
  jest.runAllTimers()  // 让timer马上执行
  expect(fn).toHaveBeenCalledTimes(1)  // fn有没有被调用一次
})

test('测试 timer1 定时器', () => {
  const fn = jest.fn()
  timer1(fn)
  // jest.runAllTimers()  // 让timer马上执行
  // jest.runOnlyPendingTimers()  // 只运行处于队列中的timer
  jest.advanceTimersByTime(3000) // 让时间快进3秒
  expect(fn).toHaveBeenCalledTimes(1)  // fn有没有被调用一次
  jest.advanceTimersByTime(3000) // 让时间快进3秒
  expect(fn).toHaveBeenCalledTimes(2)  // fn有没有被调用一次
})