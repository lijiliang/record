<template>
  <div class="m-dir">
    <v-header :title="title"></v-header>
    <section class="container">
      <loading v-if="isLoading" class="loading-top"></loading>
      <div class="m-info clearfix"  v-if="!isLoading">
          <div class="info-thumb">
              <img :src="info.thumb">
          </div>
          <div class="info-text">
              <h1>{{title}}</h1>
              <ul>
                  <li>{{info.author}}</li>
                  <li>{{info.sorts}}</li>
                  <li>{{info.start}}</li>
                  <li>{{info.update}}</li>
                  <li>{{info.newest}}</li>
              </ul>
          </div>
      </div>
      <div class="m-intro" v-if="!isLoading">
          <div class="intro-cnt">
              {{info.introInfo}}
          </div>
        </div>
        <div class="m-dir" v-if="!isLoading">
            <div class="m-dir-tit">目录</div>
            <ul class="dir-list">
                <li v-for="item in list">
                  <router-link :to="`/show/${item.id}/${item.sid}/${item.aid}`">{{item.name}}</router-link>
                </li>
            </ul>
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
      title: '加载中...',
      isLoading: true,
      info: {},
      list: []
    }
  },
  created () {
    this._getDirData()
  },
  methods: {
    _getDirData () {
      const _sid = this.$route.params.sid
      const _listid = this.$route.params.listid
      const _this = this
      _this.isLoading = true
      const url = `/bookzw/dir/${_sid}/${_listid}`
      axios.get(url)
        .then((res) => {
          let _data = res.data
          this.isLoading = false
          this.info = _data.data.info
          this.list = _data.data.list.reverse()
          this.title = _data.data.info.name
        })
    }
  },
  components: {
    VHeader,
    Loading
  }
}
</script>

