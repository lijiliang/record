import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header.vue'
import { findTestWrapper } from '../../../../utils/testUtils'

it('Header 样式发生改变，做提示', () => {
  const wrapper = shallowMount(Header)
  expect(wrapper).toMatchSnapshot()
})

it('Header 包含 input 框', () => {
  const wrapper = shallowMount(Header)
  // const input = wrapper.find('[data-test="input"]') // 找到页面上的input框
  const input = findTestWrapper(wrapper, 'input')
  expect(input.exists()).toBe(true)
})

it('Header 包含 input 框初始内容为空', () => {
  const wrapper = shallowMount(Header)
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('')
})

it('Header 包含 input 发生变化，数据应该跟着变', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('[data-test="input"]') // 找到页面上的input框
  input.setValue('Benson')
  const inputValue = wrapper.vm.$data.inputValue
  expect(inputValue).toBe('Benson')
})

it('Header 包含 input 框输入回车，无内容时，无反应', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('[data-test="input"]') // 找到页面上的input框
  input.setValue('')
  input.trigger('keyup.enter') // 模拟用户输入回车
  expect(wrapper.emitted().add).toBeFalsy() // 没内容时，点回车时不应该向外面触发一个add事件
})

it('Header 包含 input 框输入回车，有内容时，向外触发事件，同时清空ipnutValue', () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('[data-test="input"]') // 找到页面上的input框
  input.setValue('Benson')
  input.trigger('keyup.enter') // 模拟用户输入回车
  expect(wrapper.emitted().add).toBeTruthy() // 向外面触发一个add事件
  expect(wrapper.vm.inputValue).toBe('') // 清空inputValue
})
