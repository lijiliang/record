<template>
 <header>
    <section>
      <form action="javascript:postaction()" id="form">
        <label for="title">ToDoList</label>
        <input type="text" id="title" name="title" placeholder="添加ToDo" required="required" autocomplete="off" data-test="header-input" :value="inputValue" @input="e => changeInputValue(e.target.value)" @keyup.enter="addTodoItem"/>
      </form>
    </section>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      // inputValue: ''
    }
  },
  computed: {
    ...mapState({
      inputValue: state => state.inputValue
    })
  },
  methods: {
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.changeInputValue('')
        // this.inputValue = ''
      }
    },
    ...mapMutations({
      changeInputValue: 'changeInputValue'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
