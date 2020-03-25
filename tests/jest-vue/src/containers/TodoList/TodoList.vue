<template>
  <div>
    <Header @add="addUndoItem"/>
    <UndoList :list="undoList" @delete="handleItemDelete"/>
  </div>
</template>

<script>
import Header from './components/Header'
import UndoList from './components/UndoList'
export default {
  name: 'TodoList',
  props: {
  },
  components: {
    Header,
    UndoList
  },
  data () {
    return {
      undoList: []
    }
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push(inputValue)
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
