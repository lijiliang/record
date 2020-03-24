import { fetchData } from './mock1'
import Axios from 'axios'
jest.mock('axios')

test('fetchData 测试', () => {
  // return fetchData().then(data => {
  //   expect(eval(data)).toEqual('123')
  // })
  Axios.get.mockResolvedValue({
    data: "(function() { return '123'})()"
  })
})