<template>
  <div>
    <h2>简易加法计算器</h2>
    <div>
      <input type="button" value="-" @click="deHandle({de:5})" />
      <span>{{count}}</span>
      <input type="button" value="+" @click="addHandle()" />
      <p>{{num2}}</p>
    </div>
  </div>
</template>
<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  /*
  computed: {
    num () {
      return this.$store.state.count
    },
    num2 () {
      return this.$store.getters.filterCount
    }
  },
  */
  /*
  computed: mapState({
    // 以下几种方式都可以获取 store里面state的值
    // num: state => state.count
    // num: 'count'  // 直接写state状态里面的key值
    num (state) {
      return state.count  // 可以进一步处理
    }
    // count: 'count'
  }),
  */
  computed: {
    abc () {
      return 123
    },
    ...mapState(['count']),  // 这种获取的方式也是可以的，名称必须和store里面state的key一样 , 要不然就用上面那几种方式
    ...mapGetters({
      num2: 'filterCount'
    })
  },
  methods: {
    /*
    addHandle () {
      // 同步方式  改变状态，提交 mutation  addIncrement
      // this.$store.commit('addIncrement', {
      //   n: 5
      // })

      // 触发一个action 异步
      this.$store.dispatch('addAction')
    },
    deHandle () {
      // this.$store.commit('deIncrement')  // 提交 mutation
      this.$store.commit({ // 第二种提交方式
        type: 'deIncrement',
        de: 5
      })
    }
    */
    ...mapActions({  // 触发一个action 异步
      addHandle: 'addAction'
    }),
    ...mapMutations({
      deHandle: 'deIncrement'  // 需要在函数调用时直接传参
    })
  }
}
</script>

<style>

</style>
