import { shallowMount } from '@vue/test-utils'
import UndoList from '../../components/UndoList.vue'
import { findTestWrapper } from '../../../../utils/testUtils'

it('UndoList 参数为[], count值应该为0, 且列表无内容', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: { list: [] }
  })
  // const countElem = wrapper.find('[data-test="count"]')
  const countElem = findTestWrapper(wrapper, 'count') // 找到元素
  const listItems = findTestWrapper(wrapper, 'item')
  expect(countElem.at(0).text()).toEqual('0')
  expect(listItems.length).toEqual(0)
})

it('UndoList 参数为[1,2,3], count值应该为3, 且列表有内容，且存在删除按钮', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    }
  })
  const countElem = findTestWrapper(wrapper, 'count') // 找到元素
  const listItems = findTestWrapper(wrapper, 'item')
  const deleteButtons = findTestWrapper(wrapper, 'delete-button')
  expect(countElem.at(0).text()).toEqual('3')
  expect(listItems.length).toEqual(3)
  expect(deleteButtons.length).toEqual(3)
})

it('UndoList 删除按钮被点击时，向外触发删除事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    }
  })
  const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
  deleteButton.trigger('click')
  expect(wrapper.emitted().delete).toBeTruthy()
  expect(wrapper.emitted().delete[0][0]).toBe(1) // 查看传过来的index是否为1
})

it('UndoList 列表项被触发，向外触发 status 事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'div', value: 2 },
        { status: 'div', value: 3 }
      ]
    }
  })
  const deleteButton = findTestWrapper(wrapper, 'delete-button').at(1)
  deleteButton.trigger('click')
  expect(wrapper.emitted().status).toBeTruthy()
  expect(wrapper.emitted().status[0][0]).toBe(1) // 查看传过来的index是否为1
})

it('UndoList 列表项显示一个输入框，两个正常列表内容', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ]
    }
  })
  const input = findTestWrapper(wrapper, 'input')
  expect(input.at(0).element.value).toBe('2') // 获取到input框里的值是否等于2
  expect(input.length).toBe(1)
})

it('UndoList 输入框失去焦点时，向外触发 reset 事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ]
    }
  })
  const inputElem = findTestWrapper(wrapper, 'input').at(0)
  inputElem.trigger('blur')
  expect(wrapper.emitted().reset).toBeTruthy()
})

it('UndoList 输入框变化时，向外触发 change 事件', () => {
  const wrapper = shallowMount(UndoList, {
    propsData: {
      list: [
        { status: 'div', value: 1 },
        { status: 'input', value: 2 },
        { status: 'div', value: 3 }
      ]
    }
  })
  const inputElem = findTestWrapper(wrapper, 'input').at(0)
  inputElem.trigger('change', {
    value: 123,
    index: 1
  })
  expect(wrapper.emitted().change).toBeTruthy()
  expect(wrapper.emitted().change[0][0]).toEqual({
    vlaue: '2',
    index: 1
  })
})
