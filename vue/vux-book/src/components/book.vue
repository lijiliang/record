<template>
  <div class="app-book">
   <v-header title="分类列表"></v-header>
    <section class="container">
        <div class="search">
            <input autocomplete="off" class="s-value" v-model="searchValue" @keyup.enter="searchBtn">
            <div class="search-btn" @click="searchBtn">搜索</div>
        </div>
        <!-- <v-search :list="ImgList"></v-search> -->
        <loading v-if="isLoading"></loading>
        <ul class="m-catalog" v-if="!isLoading">
            <li class="list-item" v-for="item in catalogList">
              <router-link :to="`/list/${item.id}/1`">{{item.text}}</router-link>
            </li>
        </ul>
    </section>
    </div>
</template>

<script>
import axios from 'axios'
import VHeader from '@/components/header'
import VSearch from '@/components/search'
import Loading from '@/components/loading/loading'
const list = [
  {
    img: 'http://dev.kyani.cn:7200/static/img/products-item1-e00d0a77.jpg',
    title: 'search',
    id: '1'
  },
  {
    img: 'https://kyaniyoupaiyun.b0.upaiyun.com/1488422579954.jpg',
    title: '2xxx',
    id: '2'
  }
]
export default {
  data () {
    return {
      ImgList: list,
      catalogList: [],
      isLoading: true,
      searchValue: ''
    }
  },
  created () {
    var _this = this
    _this.isLoading = true
    axios.get('/bookzw/catalog')
      .then(function (res) {  // success
        _this.isLoading = false
        const _data = res.data
        if (_data.code === 0) {
          _this.catalogList = _data.data
        }
      })
  },
  // el挂载到实例上后调用，第一个业务逻辑写在这里
  mounted () {
    console.log(this.$el)
  },
  methods: {
    searchBtn () {
      console.log(this.searchValue)
      if (this.searchValue) {
        this.$router.push({name: 'Search', query: {q: this.searchValue}})
      } else {
        alert('请输入您要搜索的内容！')
      }
    }
  },
  // created () {
  //   // axios.get('http://localhost:8080/bookzw/catalog')
  //   axios.get('/bookzw/catalog')
  //     .then((res) => {
  //       console.log(res)
  //       const data = res.data
  //       if (data.code === 0) {
  //         this.catalogList = data.data
  //       }
  //     })
  // },
  components: {
    VHeader,
    VSearch,
    Loading
  }
}
</script>
<style lang="less">

</style>
