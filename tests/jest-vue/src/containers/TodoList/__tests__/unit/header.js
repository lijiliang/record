import { shallowMount } from '@vue/test-utils'
import Header from '../../components/Header.vue'

it("Header 包含 input 框", () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('[data-test="input"]')  // 找到页面上的input框
  expect(input.exists()).toBe(true)
})

it("Header 包含 input 框初始内容为空", () => {
  const wrapper = shallowMount(Header)
  const input = wrapper.find('[data-test="input"]')  // 找到页面上的input框
  expect(input.exists()).toBe(true)
})
