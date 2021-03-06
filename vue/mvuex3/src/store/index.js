import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// 拆成模块
let selectModule = {
  state: {
    title: '默认的文字',
    list: []
  },
  mutations: {
    changeTitle (state, playload) {
      state.title = playload.title
    },
    changeList (state, list) {
      state.list = list
    }
  },
  actions: {
    getListAction ({commit}) {
      // 发送请求
      axios.get('https://easy-mock.com/mock/5a30a110a7b8a12512730301/list/list')
        .then((data) => {
          console.log(data.data)
          commit('changeList', data.data)  // 拿到数据后，提交mutations，改变状态
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

// this.$store.state.title
// this.$store.state.selectModule.title  //找到子模块的状态

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
    addIncrement (state, playload) {   // 在页面调用的方法: this.$store.commit('mutations', {n:10})
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
    textAction (context, obj) {   // 在页面上调用: this.$store.dispatch(textAction, {})
      console.log('我被触发了', obj)
    }
  },
  modules: {
    selectModule
  }
})

export default store
