import { mount } from '@vue/test-utils'
import TodoList from '../../TodoList'
import { findTestWrapper } from '../../../../utils/testUtils'

it(`
  1.用户会在header输入框输入内容
  2.用户会点击回车按钮
  3.列表项应该增加用户输入内容的列表项
`, () => {
  const wrapper = mount(TodoList)
  const inputElem = findTestWrapper(wrapper, 'header-input').at(0)
  const content = 'Benson'
  inputElem.setValue(content)
  inputElem.trigger('change') // 改变事件
  inputElem.trigger('keyup.enter') // 回车事件
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toBe(1)  // 在页面能显示一项内容
  // console.log(listItemsP.at(0).text())
  expect(listItems.at(0).text()).toContain(content)
})
