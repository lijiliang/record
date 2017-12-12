<template>
    <section class="warp">
      <div class="searchIpt clearFix">
        <select-input :is-show.sync="listShow" :title="title"></select-input>
        <list v-show="listShow" :data="listData" @changeTitle="titleHandle"></list>
      </div>
    </section>
</template>

<script>
import selectInput from '@/components/selectInput'
import list from '@/components/list'

let listData = [
  {
    title: 'javascript'
  },
  {
    title: 'html+css'
  },
  {
    title: 'jquery'
  },
  {
    title: 'vue'
  }
]

export default {
  data () {
    return {
      listShow: false,
      listData: listData,
      title: ''
    }
  },
  methods: {
    titleHandle (title) {
      this.title = title
    }
  },
  components: {
    selectInput,
    list
  }
}
</script>
