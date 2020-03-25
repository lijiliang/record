<template>
  <div>
    <Header @add="addUndoItem"/>
    <ul>
      <li v-for="item in undoList" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'TodoList',
  props: {
  },
  components: {
    Header
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push(inputValue)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
