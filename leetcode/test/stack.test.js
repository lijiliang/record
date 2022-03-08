import { isValid, maxSlidingWindow } from '../code/stack'

test('典型真题快速上手-“有效括号”问题', () => {
  expect(isValid('[{}]')).toBe(true)
  expect(isValid('[]]')).toBe(false)
  expect(isValid('[]{}()')).toBe(true)
  expect(isValid('([{}])')).toBe(true)
})

test('maxSlidingWindow', () => {
  expect(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)).toEqual(expect.arrayContaining([3,3,5,5,6,7]))
})