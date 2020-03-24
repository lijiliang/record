import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const root = document.createElement('div')
//     root.className = 'root'
//     document.body.appendChild(root)
//     new Vue({
//       render: h => h(HelloWorld, {
//         props: {
//           msg: 'Benson Li'
//         }
//       })
//     }).$mount('.root')
//     expect(document.getElementsByClassName('hello').length).toBe(1)
//     console.log(document.body.innerHTML)
//   })
// })


describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    console.log(wrapper.props('msg'))
    expect(wrapper.props('msg')).toEqual(msg)
    expect(wrapper.text()).toMatch(msg)
  })
})


describe(' HelloWorld.vue', () => {
  it('组件快照', () => {
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg : 'Benson Li'}
    })
    expect(wrapper).toMatchSnapshot();
  })
})
