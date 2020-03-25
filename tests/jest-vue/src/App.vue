<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from './containers/TodoList/TodoList'

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style lang="stylus">
</style>
