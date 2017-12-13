import Vue from 'vue'
import router from './router'
import App from './App'

import '@/assets/css/app.css'

// 全局钩子函数
// 进入路由之前钩子函数
router.beforeEach((to, from, next) => {
  console.log('beforeEach')
  if (to.meta.login) {
    next('/about')  // 如果没登录，则重定向
  } else {
    next()
  }
})

// 进入路由之后钩子函数
router.afterEach((to, from) => {
  if (to.meta.title) {
    window.document.title = to.meta.title
  } else {
    window.document.title = 'Benson'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
