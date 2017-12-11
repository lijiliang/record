// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Utile from './lib/utils'

import './assets/css/app.css'

Vue.config.productionTip = false

Vue.use(Utile)

// Vue.prototype.$custom = "这是自定义的属性"
/*
let obj = {
  install: function(Vue, options){
    Vue.prototype.$abc = '自定义'
    console.log(Vue)
    console.log(options)
  }
}

Vue.use(obj, {a:1})
*/

router.beforeEach((to, from, next) => {
  let bl = to.matched.some(function (item) {
    return item.meta.login
  })

  if (to.matched.some((item) => item.meta.login)) {  // 循环数据每一项，返回一个条件，只要一个为true,整个返回true
    let info = router.app.$local.fetch('miaov')  // router.app 相当于this值  注：这里取不到this值
    if (info.login) {  // 说明已经登录
      next()
    } else {
      router.push({
        path: '/login',
        query: {
          redirect: to.path.slice(1)   // 记录要登录后跳转的目标链接
        }
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
