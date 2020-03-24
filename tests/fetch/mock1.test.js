jest.mock('./mock1')  // 让jest模拟mock1里面的内容
// jest.unmock('./mock1') // 取消模拟mock1

import { fetchData } from './mock1'

const { getNumber } = jest.requireActual('./mock1')
// import Axios from 'axios'

test('fetchData 测试', () => {
  return fetchData().then(data => {
    expect(eval(data)).toEqual('123') 
  })
  // Axios.get.mockResolvedValue({
  //   data: "(function() { return '123'})()"
  // })
})

test('getNumber 测试', () => {
  expect(getNumber()).toEqual(123)
})