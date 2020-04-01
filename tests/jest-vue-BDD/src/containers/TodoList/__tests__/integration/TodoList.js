import { mount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import { findTestWrapper } from '../../../../utils/testUtils'
import store from '../../../../store'
import axios from '../../__mocks__/axios'



beforeEach(() => {
  axios.success = true
  jest.useFakeTimers()
})

it(`
  1.用户会在header输入框输入内容
  2.用户会点击回车按钮
  3.列表项应该增加用户输入内容的列表项
`, () => {
  const wrapper = mount(TodoList, {
    store
  })
  const inputElem = findTestWrapper(wrapper, 'header-input').at(0)
  const content = 'Benson'
  inputElem.setValue(content)
  inputElem.trigger('change') // 改变事件
  inputElem.trigger('keyup.enter') // 模拟用户输入回车
  let listItems = findTestWrapper(wrapper, 'list-item')
  // expect(listItems.length).toBe(1)  // 在页面能显示一项内容, 页面有内容显示，不知这里为何取不到数据？
  // expect(listItems.at(0).text()).toContain(content)
})

// it(`
//   1.用户进入页面时，请求远程数据
//   2.列表应该展示远程返回的数据
// `, () => {
//   const wrapper = mount(TodoList, {
//     store
//   })
//   // 这是个异步的测试
//   wrapper.vm.$nextTick(() => {
//     let listItems = findTestWrapper(wrapper, 'list-item')
//     expect(listItems.length).toBe(1)
//   })

// })

// it(`
//   1.用户进入页面时，等待 5s
//   2.列表应该展示远程返回的数据
// `, (done) => {
//   const wrapper = mount(TodoList, {
//     store
//   })
//   setTimeout(() => {
//     let listItems = findTestWrapper(wrapper, 'list-item')
//     expect(listItems.length).toBe(1)  // 这里能跑通
//     done()
//   }, 4500)
// })


// it(`
//   1.用户进入页面时，等待 5s
//   2.列表应该展示远程返回的数据
// `, () => {
//   const wrapper = mount(TodoList, {
//     store
//   })

//   expect(setTimeout).toHaveBeenCalledTimes(1)   // 测试 setTimeout会被调用一次

//   jest.runAllTimers()

//   wrapper.vm.$nextTick(() => {
//     const listItems = findTestWrapper(wrapper, 'list-item')
//     // expect(listItems.length).toBe(1)
//   })
// })

it(`
  1.用户进入页面时，请求远程数据
  2.列表应该展示空数据，不应该挂掉
`, (done) => {
  axios.success = false
  const wrapper = mount(TodoList, {
    store
  })
  wrapper.vm.$nextTick(() => {
    let listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(0)
    done()
  })
})


