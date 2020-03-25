<template>
 <header>
    <section>
      <form action="javascript:postaction()" id="form">
        <label for="title">ToDoList</label>
        <input type="text" id="title" name="title" placeholder="添加ToDo" required="required" autocomplete="off" data-test="input" v-model="inputValue" @keyup.enter="addTodoItem"/>
      </form>
    </section>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        this.inputValue = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
