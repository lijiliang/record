import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Document from '@/components/Document'
import NoFound from '@/components/404'

Vue.use(Router)

export default new Router({
  mode: 'history',   // 设置为history模式
  linkActiveClass: 'is-active',  // 设置激活名字class名
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      alias: '/index'  // 路由别名
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/document',
      name: 'Document',
      component: Document
    },
    {
      path: '*',
      name: 'NoFound',
      // component: NoFound

      // 重定向
      // redirect: '/home'
      // redirect: {path: '/home'}
      // redirect: {name: 'Home'}  // 这里的name就是上面定义的name值

      redirect: (to) => {  // 动态设置重定向目标
        // to 其实就是目标路由对象，就是访问的路径的跌幅信息
        if (to.path === '/123') {
          return '/about'
        } else if (to.path === '/456') {
          return {path: 'document'}
        } else {
          return {name: 'Home'}
        }
        // return '/home'
      }
    }
  ]
})
