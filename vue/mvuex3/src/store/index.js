import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 定义容器
let store = new Vuex.Store({
  state: {
    count: 100
  },
  // getters 类似于组件里面的计算属性
  // getters 就是对state进行进一步处理
  getters: {
    filterCount (state) {
      return state.count >= 120 ? 120 : state.count
    }
  },
  // 通过 mutation 改变状态 同步的
  mutations: {
    addIncrement (state, playload) {
      state.count += playload.n
    },
    deIncrement (state) {
      state.count -= 1
    }
  },
  // 异步的 提交mutation改变状态
  actions: {
    // addAction (context) {
    //   console.log(context)
    //   setTimeout(() => {
    //     // 改变状态， 提交mutation
    //     context.commit('addIncrement', {n: 5})
    //     context.dispatch('textAction', {test: '测试'})
    //   }, 1000)
    // },
    // 上面的可以写成这样，利用es6 的解构赋值
    addAction ({commit, dispatch}) {
      setTimeout(() => {
        commit('addIncrement', {n: 5})
        dispatch('textAction', {test: '测试'})
      })
    },
    textAction (context, obj) {
      console.log('我被触发了', obj)
    }
  }
})

export default store
