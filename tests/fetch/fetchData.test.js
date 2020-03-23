import axios from 'axios'
import { fetchData, fetchData1 } from './fetchData'

/*
  用不同的匹配实现对异步获取到的数据进行测试
*/

// 回调类型的异步函数测试
// test('测试 fetchData 请求数据, 返回结果为{ name: "全证咨询" }', (done) => {
//   fetchData((data) => { 
//     expect(data).toEqual({
//       name: "全证咨询"
//     })
//     done()
//   })
// })


// test('测试 fetchData1 请求数据, 返回结果为{ name: "全证咨询" }', () => {
//   return fetchData1().then((response) => {
//     expect(response.data).toEqual({
//       name: "全证咨询"
//     })
//   })
// })

// test('测试 fetchData1, 返回结果为 404', () => {
//   expect.assertions(1)  // 要求expect的结果必须为真，而且必须执行一次
//   return fetchData1().catch((e) => {
//     expect(e.toString().indexOf('404') > -1).toBe(true)
//   })
// })


// test('测试 fetchData1 请求数据, 返回结果为{ name: "全证咨询" }', () => {
//   // fetchData1().then(res => {console.log(res)})

//   // 匹配器，只要包含里面的这些内容就可以了
//   return expect(fetchData1()).resolves.toMatchObject({
//     data: {
//       name: "全证咨询"
//     }
//   })
// }) 

// test('测试 fetchData1 await 请求数据, 返回结果为{ name: "全证咨询" }', async () => {
//   await expect(fetchData1()).resolves.toMatchObject({
//     data: {
//       name: "全证咨询"
//     }
//   })
// })

// test('测试 fetchData1 await 请求数据, 返回结果为{ name: "全证咨询" }', async () => {
//   const response = await fetchData1();
//   expect(response.data).toEqual({
//     name: "全证咨询"
//   })
// })

test('测试 fetchData1, 返回结果为 404', () => {
  return expect(fetchData1()).rejects.toThrow()
}) 

test('测试 fetchData1 await, 返回结果为 404', async () => {
  await expect(fetchData1()).rejects.toThrow()
}) 

test('测试 fetchData1 await, 返回结果为 404', async () => {
  expect.assertions(1)  // expect 必须执行一次
  try{
    await fetchData1();
  } catch(e) {
    // console.log(e) 
    expect(e.toString()).toEqual('Error: Request failed with status code 404')
  }
}) 