import { shallowMount } from '@vue/test-utils'
import ToDoList from '../../ToDoList.vue'
import Header from '../../components/Header.vue'
import UndoList from '../../components/UndoList.vue'

it('ToDoList 初始化时，undoList 应该为空', () => {
  const wrapper = shallowMount(ToDoList)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([])
})

// it('ToDoList 执行 addItem 的时候，会增加一个内容', () => {
//   const wrapper = shallowMount(ToDoList)
//   wrapper.vm.addUndoItem('Benson')
//   const undoList = wrapper.vm.$data.undoList
//   expect(undoList).toEqual(['Benson'])
// })

// 这里相当于集成测试了，这里应该写成单元测试
// it('ToDoList 监听到 Header 的 add 事件时，会增加一个内容', () => {
//   const content = 'Benson'
//   const wrapper = shallowMount(ToDoList)
//   const header = wrapper.find(Header)
//   header.vm.$emit('add', content)
//   const undoList = wrapper.vm.$data.undoList
//   expect(undoList).toEqual([content]) // 希望add事件触发时 undoList 多出一个内容
// })

it('ToDoList 中 addUndoItem 被执行后，内容会加一项', () => {
  const wrapper = shallowMount(ToDoList)
  wrapper.setData({
    undoList: [1,2,3]
  })
  wrapper.vm.addUndoItem(4)
  expect(wrapper.vm.$data.undoList).toEqual([1, 2, 3, 4])
})

it('ToDoList 调用 UndoList，应该传递 list 参数', () => {
  const wrapper = shallowMount(ToDoList)
  const undoList = wrapper.find(UndoList)
  undoList.props('list')
  const list = undoList.props('list')
  expect(list).toBeTruthy() // 希望传递过去的list属性应该是存在的
})

it('ToDoList 中 handleItemDelete方法被调用， UndoList列表内容会减少一个', () => {
  const wrapper = shallowMount(ToDoList)
  wrapper.setData({
    undoList: [1,2,3]
  })
  wrapper.vm.handleItemDelete(1)
  expect(wrapper.vm.$data.undoList).toEqual([1, 3])
})
