<template>
  <section>
    <h2 onclick="save()">正在进行 <span id="todocount" data-test="count">{{list.length}}</span></h2>
    <ol id="todolist" class="demo-box">
      <li
        v-for="(item, index) in list"
        :key="index" data-test="list-item"
        @click="() => changeStatus(index)"
      >
        <input
          v-if="item.status === 'input'"
           data-test="input"
           :value="item.value"
           @blur="handleInputBlur"
           @change="(e) => handleInputChange(e.target.value, index)"
          >
        <p v-else data-test="list-item-p">{{item.value}}</p>
        <a href="javascript:remove(1)" data-test="delete-button" @click="() => {handleClick(index)}">-</a>
      </li>
    </ol>
    <h2>已经完成 <span id="donecount"></span></h2>
    <ul id="donelist">
    </ul>
  </section>
  <!-- <div>
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
  </div> -->
</template>

<script>
export default {
  name: 'UndoList',
  props: ['list'],
  methods: {
    handleClick (index) {
      this.$emit('delete', index)
    },
    changeStatus (index) {
      this.$emit('status', index)
    },
    handleInputBlur () {
      this.$emit('reset')
    },
    handleInputChange (vlaue, index) {
      this.$emit('change', {
        vlaue,
        index
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
