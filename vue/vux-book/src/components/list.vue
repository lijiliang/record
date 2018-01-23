<template>
  <div class="list">
    <v-header :title="title"></v-header>
    <section class="container">
      <ul class="m-list" v-if="!isLoading">
        <li class="list-item" v-for="item in list">
            <router-link :to="`/dir/${item.sid}/${item.listId}`">{{item.name}}<span class="author">/{{item.author}}</span></router-link>
        </li>
      </ul>
      <div class="m-page" v-if="!isLoading">
            <div class="page">
              <router-link :to="`/list/${this.catalogid}/1`" v-if="this.curpage != 1">首页</router-link>
              <router-link :to="`/list/${this.catalogid}/${Number(this.curpage) - 1}`" v-if="this.curpage != 1">上页</router-link>
              <router-link :to="`/list/${this.catalogid}/${Number(this.curpage) + 1}`" v-if="this.curpage != this.total">下页</router-link>
              <router-link :to="`/list/${this.catalogid}/${this.total}`" v-if="this.curpage != this.total">尾页</router-link>
            </div>
            <div class="page-info">(第{{this.curpage}}/{{this.total}}页)当前{{this.pageSize}}条/页</div>
        </div>
        <loading title="列表正在加载中..." v-if="isLoading" class="loading-top"></loading>
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
      list: [],
      curpage: '',
      pageSize: '',
      total: '',
      catalogid: '',
      isLoading: true
    }
  },
  created () {
    const _catalogid = this.$route.params.catalogid
    const _listid = this.$route.params.listid
    this._getCatalogList(_catalogid, _listid)
  },
  watch: {
    '$route' (to, from) {
      this._getCatalogList(to.params.catalogid, to.params.listid)
    }
  },
  methods: {
    _getCatalogList (_catalogid, _listid) {
      const _this = this
      _this.isLoading = true
      const url = `/bookzw/list/${_catalogid}/${_listid}`
      // http://localhost:8080/bookzw/list/1/1
      this.catalogid = _catalogid
      axios.get(url)
        .then(function (res) {
          const _data = res.data
          let _list = []
          _this.isLoading = false
          if (_data.code === 0) {
            _list = _data.data
            _this.title = _list[0].type
            _this.list = _list
            _this.curpage = _data.curpage
            _this.pageSize = _data.pageSize
            _this.total = _data.total
          }
        })
    }
  },
  computed: {
    // this._getCatalogList()
  },
  components: {
    VHeader,
    Loading
  }
}
</script>

<style lang="css">
.list{

}
.loading-top{
  padding-top: 20px;
}
</style>
