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
  props: ['isShow', 'title'],
  computed: {  // 计算属性
    initShow () {
      return this.isShow
    }
  },
  methods: {
    showListHandle () {
      this.$emit('update:isShow', !this.initShow)  // 通过自定义事件改变父级的data `is-show`  父级的写法-》 :is-show.sync="listShow"
    }
  }
}
</script>
