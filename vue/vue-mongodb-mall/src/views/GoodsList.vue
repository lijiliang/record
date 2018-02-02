<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" v-bind:class="{'sort-up':sortFlag}" @click="sortGoods()">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" :class="{'cur':priceChecked == 'all'}" @click="setPriceFiler('all')">All</a></dd>
                <dd v-for="(item, index) in priceFilter">
                  <a href="javascript:void(0)" :class="{'cur':priceChecked == index}" @click="setPriceFiler(index)">{{item.startPrice}} - {{item.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item, index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'static/' + item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="view-more-normal"
                   v-infinite-scroll="loadMore"
                   infinite-scroll-disabled="busy"
                   infinite-scroll-distance="20">
                <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import axios from 'axios'
    export default{
        data(){
            return {
              goodsList: [],
              priceFilter: [
                {
                  startPrice: '0.00',
                  endPrice: '100.00'
                },
                {
                  startPrice: '100.00',
                  endPrice: '500.00'
                },
                {
                  startPrice: '500.00',
                  endPrice: '1000.00'
                },
                {
                  startPrice: '1000.00',
                  endPrice: '2000.00'
                }
              ],
              priceChecked: 'all',
              filterBy: false,
              overLayFlag: false,
              sortFlag: true,  //排序
              page: 1,
              pageSize: 4,
              busy: true,
              loading: false
            }
        },
        mounted () {
          this.getGoodsList()
        },
        methods: {
          // 获取列表数据
          getGoodsList (flag) {
            var param = {
              page: this.page,
              pageSize: this.pageSize,
              sort: this.sortFlag ? 1 : -1,
              priceLevel: this.priceChecked
            }
            this.loading = true
            axios.get('/goods/list', {
              params: param
            }).then((res) => {
              this.loading = false
              let _data = res.data
              if (_data.status === '0') {
                if(flag){
                  this.goodsList = this.goodsList.concat(_data.result.list)
                  // 如果没有值了，禁用滚动加载
                  if(_data.result.count === 0){
                    this.busy = true
                  }else{
                    this.busy = false
                  }
                }else{
                  this.goodsList = _data.result.list
                  this.busy = false
                }
              } else {
                this.goodsList = []
              }
            })
          },
          showFilterPop () {
            this.filterBy = true,
            this.overLayFlag = true
          },
          // 价格排序
          setPriceFiler (index) {
            this.priceChecked = index
            this.closePop()
            this.page = 1
            this.getGoodsList()
          },
          closePop () {
            this.filterBy = false,
            this.overLayFlag = false
          },
          // 排序
          sortGoods () {
            this.sortFlag = !this.sortFlag;
            this.page = 1;
            this.getGoodsList()
          },
          // 滚动加载
          loadMore () {
            this.busy = true
            setTimeout(() => {
              this.page++
              this.getGoodsList(true)
            }, 500)
          },
          // 加入购物车
          addCart(productId) {
            axios.post('/goods/addCart', {
              productId: productId
            }).then((res) => {
              let _res = res.data
              if(_res.status == 0){
                alert('加入成功')
              }else{
                alert('msg: ' + _res.message)
              }
            })
          }
        },
        components: {
          NavHeader,
          NavBread,
          NavFooter
        }
    }
</script>
