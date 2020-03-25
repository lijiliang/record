<template>
  <div>
    <Header />
    <h1>TodoList</h1>
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>
