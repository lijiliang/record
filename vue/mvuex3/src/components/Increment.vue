<template>
  <div>
    <h2>简易加法计算器</h2>
    <div>
      <input type="button" value="-" @click="deHandle({de:5})" />
      <span>{{num}}</span>
      <input type="button" value="+" @click="addHandle()" />
      <p>{{num2}}</p>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    num () {
      return this.$store.state.count
    },
    num2 () {
      return this.$store.getters.filterCount
    }
  },
  methods: {
    addHandle () {
      // 同步方式  改变状态，提交 mutation  addIncrement
      // this.$store.commit('addIncrement', {
      //   n: 5
      // })

      // 触发一个action 异步
      this.$store.dispatch('addAction')
    },
    deHandle () {
      // this.$store.commit('deIncrement')
      this.$store.commit({ // 第二种提交方式
        type: 'deIncrement',
        de: 5
      })
    }
  }
}
</script>

<style>

</style>
