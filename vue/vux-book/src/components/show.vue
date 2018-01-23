<template>
  <div class="m-show">
    <v-header :title="title"></v-header>
    <section class="container">
        <div class="m-show">
            <div class="show-cnt">
                <p v-for="item in list">{{item}}</p>
            </div>
        </div>
        <div class="show-page">
            
            <router-link v-if="other.sid != other.previd" :to="`/show/${other.id}/${other.sid}/${other.previd}`">上一章</router-link>
            
            <router-link :to="`/dir/${other.id}/${other.sid}`" class="show-dir">目录</router-link>
            
            <router-link v-if="other.sid != other.nextid" :to="`/show/${other.id}/${other.sid}/${other.nextid}`">下一章</router-link>
            
        </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
import VHeader from '@/components/header'
import Loading from '@/components/loading/loading'
export default {
  data () {
    return {
      title: '',
      isLoading: true,
      content: '',
      other: {},
      list: []
    }
  },
  created () {
    this._getShow()
  },
  methods: {
    _getShow () {
      let _id = this.$route.params.id
      let _sid = this.$route.params.sid
      let _aid = this.$route.params.aid
      const url = `/bookzw/show/${_id}/${_sid}/${_aid}`
      axios.get(url)
        .then((res) => {
          let _data = res.data
          this.title = _data.data.title
          this.content = _data.data.content
          this.other = _data.data.other
          this.list = _data.data.content.split(/\s{4}/g)
        })
    }
  },
  components: {
    VHeader,
    Loading
  }
}
</script>

