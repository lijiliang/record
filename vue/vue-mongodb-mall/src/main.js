// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from  'vue-infinite-scroll'
import VueI18n from 'vue-i18n'
import en from './locale/en'
import zh from './locale/zh'
import {currency} from './util/currency'

import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

Vue.use(infiniteScroll);
Vue.use(Vuex);
Vue.use(VueLazyload, {
  loading: 'static/loading-svg/loading-bars.svg',
  try: 3 // default 1
})
Vue.use(VueI18n)
const messages = {
  en: {
    message: {
      hello: 'hello world',
      ...en
    }
  },
  zh: {
    message: {
      hello: '欢迎',
      ...zh
    }
  }
}
const i18n = new VueI18n({
  locale: 'en',
  messages
})

Vue.filter("currency",currency);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    cartCount: 0,
    nickName: ''
  },
  mutations: {
    updateUserInfo(state, nickName){
      state.nickName = nickName
    },
    updateCartCount(state, cartCount){
      state.cartCount += cartCount
    },
    initCartCount(state, cartCount){
      state.cartCount = cartCount
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  mounted(){
    // this.checkLogin();
    // this.getCartCount();
  },
  methods:{
    checkLogin(){
      axios.get("users/checkLogin").then(res=> {
        var res = res.data;
        if (res.status == "0") {
          this.$store.commit("updateUserInfo", res.result);
        }else{
          if(this.$route.path!="/goods"){
            this.$router.push("/goods");
          }
        }
      });
    },
    getCartCount(){
      axios.get("users/getCartCount").then(res=>{
        var res = res.data;
        if(res.status=="0"){
          this.$store.commit("updateCartCount",res.result);
        }
      });
    }
  },
  // render: h => h(App),
  template: '<App/>',
  components: { App },
  i18n
});//.$mount('#app')
