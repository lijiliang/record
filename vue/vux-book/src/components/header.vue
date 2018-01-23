<template>
  <header class="nav-bar">
       <a href="javascript:history.go(-1);" class="top-back"></a>
       <h1 class="bar-title" v-text="title"></h1>
  </header>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="css">
</style>
