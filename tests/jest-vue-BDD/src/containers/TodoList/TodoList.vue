<template>
  <div>
    <Header @add="addUndoItem"/>
    <UndoList
      :list="undoList"
      @delete="handleItemDelete"
      @status="changeStatus"
      @reset="resetStatus"
      @change="changeItemValue"
    />
  </div>
</template>

<script>
import Header from './components/Header'
import UndoList from './components/UndoList'
import axios from 'axios'
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
  mounted() {
    /*
    {
      success: true,
      data: [{
        status: 'div',
        value: 'benson'
      }]
    }
    */
    // axios.get('/getUndoList.json').then((res) => {
    //   this.undoList = res.data
    // }).catch(e => {
    //   console.log(e)
    // })
    setTimeout(() => {
      axios.get('/getUndoList.json').then((res) => {
        this.undoList = res.data
      }).catch(e => {
        console.log(e)
      })
    }, 4000)

  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({
        status: 'div',
        value: inputValue
      })
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          newList.push({ status: 'input', value: item.value })
        } else {
          newList.push({ status: 'div', value: item.value })
        }
      })
      this.undoList = newList
    },
    resetStatus () {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        newList.push({ status: 'div', value: item.value })
      })
      this.undoList = newList
    },
    changeItemValue (obj) {
      this.undoList[obj.index].value = obj.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
