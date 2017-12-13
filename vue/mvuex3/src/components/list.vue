<template>
    <ul class="list">
      <li v-for="item in data" @click="getTitleHandle(item.title)">{{item.title}}</li>
    </ul>
</template>

<script>
export default {
  computed: {
    data () {
      return this.$store.state.list
    }
  },
  created () {
    // 获取数据
    this.$store.dispatch('getListAction')
  },
  methods: {
    getTitleHandle (title) {
      // this.$emit('changeTitle', title)
      // 改变vuex中状态
      this.$store.commit('changeTitle', {title})
    }
  }
}
</script>
