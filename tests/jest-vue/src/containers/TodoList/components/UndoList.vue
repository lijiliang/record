<template>
  <!-- <section>
    <h2 onclick="save()">正在进行 <span id="todocount" data-test="count">{{list.length}}</span></h2>
    <ol id="todolist" class="demo-box">
      <li v-for="item in list" :key="item" data-test="item"><input type="checkbox"><p id="p-1" onclick="edit(1)">{{item}}</p><a href="javascript:remove(1)" data-test="delete-button">-</a></li>
    </ol>
    <h2>已经完成 <span id="donecount"></span></h2>
    <ul id="donelist">
    </ul>
  </section> -->
  <div>
    <div data-test="count">{{list.length}}</div>
    <ul>
      <li
        v-for="(item, index) in list" :key="index"
        data-test="item"
      >
        {{item}}
        <span data-test="delete-button" @click="() => {handleClick(index)}">-</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: ['list'],
  methods: {
    handleClick (index) {
      this.$emit('delete', index)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
