import { runCallback, createObject, getData } from './mock'
import axios from 'axios';
jest.mock('axios')

// 1、捕获函数的调用和返回结果，以及this和调用顺序
// 2、它可以让我们自由的设置返回结果
// 3、改变函数的内部实现

test('测试 runCallback', () => {
  // const func = () => {}
  const func = jest.fn(); 
   // mock函数，捕获函数的调用 用jest帮我们生成一个函数，mock
   // 1、捕获函数的调用和返回结果，以及this和调用顺序

  // const func = () => {}
  // func.mockImplementation(() => {
  //   return 'Benson'
  // })
  // func.mockImplementationOnce(() => {
  //   return 'Benson'
  // })

  func.mockReturnValueOnce('Benson')  // 模拟mock返回一次的结果
  func.mockReturnValueOnce('ABC')  // 模拟mock返回一次的结果
  func.mockReturnValue('Li')  // 2.它可以让我们自由的返回值
  // const func = jest.fn(() => {
  //   return '456'
  // }); 
  runCallback(func); // 如果函数被执行过了，那么runCallback就执行了
  runCallback(func);
  // expect(func).toBeCalled()  // toBeCalled 是否代表被调用过

  expect(func.mock.calls.length).toBe(2)
  // expect(func.mock.calls[0]).toEqual(['abc'])
  // expect(func).toBeCalledWith('Benson')

  expect(func.mock.results[0].value).toBe('Benson')
  console.log(func.mock)
})

test('测试 createObject ', () => {
  const func = jest.fn();
  createObject(func);  // func.mock.instances 指向的构建函数是 mockConstructor
  console.log(func.mock)
})

test('测试 getData', async () => {
  // 第三个用处是改变函数的内部实现
  axios.get.mockResolvedValueOnce({data: 'hello'})
  axios.get.mockResolvedValue({data: 'world'})  // 3.mock将异步获取的真实数据变成自己准备的同步数据
  await getData().then((data) => {
    expect(data).toBe('hello')
  })
  await getData().then((data) => {
    expect(data).toBe('world')
  })
})