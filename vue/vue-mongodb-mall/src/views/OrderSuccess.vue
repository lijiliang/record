<template>
    <div>
      <nav-header></nav-header>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>{{$t('message.checkOut')}}</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>{{$t('message.Confirm')}}</span> {{$t('message.Address')}} </li>
            <li class="cur"><span>{{$t('message.ViewYour')}}</span>{{$t('message.Order')}} </li>
            <li class="cur"><span>{{$t('message.Make')}}</span> {{$t('message.payment')}} </li>
            <li class="cur"><span>{{$t('message.Order')}}</span> {{$t('message.confirmation')}}</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>{{$t('message.Congratulations')}}! <br>{{$t('message.UnderProcessing')}}!</h3>
            <p>
              <span>{{$t('message.OrderID')}}：{{orderId}}</span>
              <span>{{$t('message.OrderTotal')}}：{{orderTotal|currency('￥')}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">{{$t('message.CartList')}}</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">{{$t('message.GoodsList')}}</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/NavBread'
import Modal from '@/components/Modal'
import axios from 'axios'
    export default{
        data(){
            return{
              orderId: '',
              orderTotal: 0
            }
        },
        components: {
          NavHeader,
          NavFooter,
          NavBread,
          Modal
        },
        mounted(){
          let orderId = this.$route.query.orderId || ''
          if(!orderId){
            return;
          }
          this.orderId = orderId
          axios.get('/users/orderDetail', {
            params: {
              orderId: orderId
            }
          }).then((response) => {
            let res = response.data
            if(res.status = '0'){
              this.orderTotal = res.result.orderTotal
            }else{
              this.orderTotal = 0
            }
          })
        }
    }
</script>
