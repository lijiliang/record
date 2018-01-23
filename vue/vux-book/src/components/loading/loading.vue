<template>
  <div class="loading">
    <img src="./loading.gif" width="24" height="24">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '加载中...'
    }
  }
}
</script>

<style scoped lang="less">
  .loading{
    width: 100%;
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: 14px;
      color: #666;
      }
    }
</style>
