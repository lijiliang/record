import Vue from 'vue'
import router from './router'
import App from './App'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import '@/assets/css/app.css'

Vue.use(VueAxios, Axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
