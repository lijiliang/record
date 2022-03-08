/*
 * @Descripttion:
 * @Author: Benson
 * @Date: 2021-08-31 22:23:34
 * @LastEditors: Benson
 * @LastEditTime: 2021-08-31 22:31:57
 */
import { twoSum, merge } from '../code/array'

test('两数求和，并找出对应下标', () => {
  expect(twoSum([2,7,11,15], 9)).toStrictEqual([0, 1]);
  expect(twoSum([2,7,11,15], 13)).toStrictEqual([0, 2])
});

test('合并两个有序数组', () => {
  expect(merge([1,2,3,0,0,0], 3, [2,5,6], 3)).toStrictEqual([1,2,2,3,5,6])
  expect(merge([1,2,3,0,0,0], 3, [2,5,6], 3)).toEqual(expect.arrayContaining([1,2,2,3,5,6]))
});



