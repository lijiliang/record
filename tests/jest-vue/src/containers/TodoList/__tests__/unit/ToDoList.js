import { shallowMount } from '@vue/test-utils'
import ToDoList from '../../ToDoList.vue'

describe('ToDoList.vue', () => {
  it("组件正常", () => {
    const wrapper = shallowMount(ToDoList)
  })
})
