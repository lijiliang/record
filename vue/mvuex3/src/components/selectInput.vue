<template>
    <div class="clearFix">
      <input
        readonly='readonly'
        class="keyWord"
        @click="showListHandle"
        :value="title"
      />
      <input type="button" value="GO">
      <span></span>
    </div>
</template>

<script>
export default {
  props: ['isShow'],
  computed: {  // 计算属性
    initShow () {
      return this.isShow
    },
    title () {
      return this.$store.state.selectModule.title
    }
  },
  methods: {
    showListHandle () {
      // update:isShow  这里的update是vue内部的更新方法，即代表更新父组件 isShow属性的值
      this.$emit('update:isShow', !this.initShow)  // 通过自定义事件改变父级的data `is-show`  父级的写法-》 :is-show.sync="listShow"
    }
  }
}
</script>
