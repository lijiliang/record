<template>
  <div class="main-search">
    <v-header :title="title"></v-header>
    <section class="container">
      <div class="m-search" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
        <div v-for="(item, index) in list" key="index" @click="goDir(item.url)" href="/book/dir/3/3469" class="info-item clearfix">
        <div class="info-thumb">
          <img :src="item.image">
          </div>
          <div class="info-text">
            <strong>{{item.name}}</strong>
            <ul>
              <li>作者：{{item.author_name}}</li>
              <li>分类：{{item.genre}}</li>
              <li>状态：{{item.updateStatus}}</li>
              <li>最新：{{item.newestChapter_headline}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="!isLoading" class="nocenter">暂无内容！</div>
      <loading v-if="isLoading && busy" class="loading-padding"></loading>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import VHeader from '@/components/header'
import Loading from '@/components/loading/loading'
import infiniteScroll from 'vue-infinite-scroll'
export default {
  data () {
    return {
      list: [],
      busy: false,
      page: 0,
      totalNum: 0,
      isLoading: false
    }
  },
  directives: {
    infiniteScroll
  },
  created () {
    this._getSearchList(0)
  },
  methods: {
    _getSearchList (page) {
      var _search = encodeURI(this.$route.query.q)
      let url = `http://s.youmeixun.com/book/sapi?q=${_search}&page=${page}`
      axios.get(url)
        .then((res) => {
          const _data = res.data
          this.totalNum = Math.ceil(_data.totalNum / 10)
          if (page === 0) {
            this.list = _data.results
            // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
            this.pusy = false
          } else {
            this.list = this.list.concat(_data.results)
            // 结束滚动加载的条件
            if (_data.results.length === 0) {
              this.busy = true
              this.isLoading = false
            } else {
              this.busy = false
            }
          }
        }).catch((error) => {
          console.log(error)
          // 如果接口请求错误，重新发起请求
          this.busy = true
          this._getSearchList(this.page)
        })
    },
    // 跳转目录页
    goDir (url) {
      var _match = url.match(/\d+/g)
      this.$router.push({name: 'Dir', params: {sid: _match[1], listid: _match[2]}})
    },
    // 加载更多
    loadMore () {
      this.busy = true
      this.isLoading = true
      setTimeout(() => {
        this.page ++
        this._getSearchList(this.page)
      }, 1000)
    }
  },
  computed: {
    title () {
      return this.$route.query.q + ' - 搜索结果'
    }
  },
  // watch: {
  //   title: this.$route.query.q
  // },
  components: {
    VHeader,
    Loading
  }
}
// https://segmentfault.com/a/1190000011693433  使用vue-infinite-scroll在vue中实现下拉加载数据，瀑布流，详细操作
</script>

<style lang="less" scoped>
.info-text{
  strong{
    line-height: 2;
    font-size: .32rem;
    font-weight: 700;
  }
}
.loading-padding{
  padding: 10px 0;
}
.nocenter{
  padding: 15px 0;
  text-align: center;
  color: #888;
  font-size: 14px;
}
</style>
