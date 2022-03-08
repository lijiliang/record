/*
 * @Descripttion:
 * @Author: Benson
 * @Date: 2021-08-31 11:20:37
 * @LastEditors: Benson
 * @LastEditTime: 2021-08-31 11:31:21
 */
// const sum = require('../code/sum');
import sum from '../code/sum'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});