import { shallowMount } from '@vue/test-utils'
import ToDoList from '../../ToDoList.vue'
import Header from '../../components/Header.vue'

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

it('ToDoList 监听到 Header 的 add 事件时，会增加一个内容', () => {
  const content = 'Benson'
  const wrapper = shallowMount(ToDoList)
  const header = wrapper.find(Header)
  header.vm.$emit('add', content)
  const undoList = wrapper.vm.$data.undoList
  expect(undoList).toEqual([content]) // 希望add事件触发时 undoList 多出一个内容
})
