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
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
