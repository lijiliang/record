import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Document from '@/components/Document'
import User from '@/components/User'
import NoFound from '@/components/404'
import Study from '@/views/study'
import Work from '@/views/work'
import Hobby from '@/views/hobby'
import Slider from '@/views/slider'

Vue.use(Router)

export default new Router({
  mode: 'history',   // 设置为history模式
  linkActiveClass: 'is-active',  // 设置激活名字class名
  /**
   * 滚动行为  点击浏览器前进后退或者切换导航触发
   * @param {*} to 要进入的目标路由对象  要去向哪里
   * @param {*} from  离开的路由对象  从哪里来
   * @param {*} savePosition 记录滚动条的坐标 点击前进后退时记录
   */
  scrollBehavior (to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      return {x: 0, y: 0}
    }

    // 跳到hash的定位
    // if (to.hash) {
    //   return {
    //     selector: to.hash
    //   }
    // }
  },
  routes: [
    {
      path: '/',
      component: Home,
      meta: {   // meta设置元信息，这里的index是自定义的导航下标
        index: 0,
        title: 'home'
      }
    },
    {
      path: '/user/:tip?/:userId?',   // ? 问号，即是可以出现一次，也可以出现多次，不加？号，访问/user是访问不到的  /user /user/tip/2 /user/3
      name: 'User',
      component: User,
      meta: {
        index: 3,
        title: 'user',
        login: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      alias: '/index'  // 路由别名
    },
    {
      path: '/about',
      component: About,
      children: [  // 设置子路由
        {
          path: '',  // 默认的子路由  /about
          name: 'About',
          component: Study,
          meta: {
            index: 2,
            title: 'about'
          }
        },
        {
          path: '/work',   // /work
          name: 'Work',
          component: Work
        },
        {
          path: '/hobby',
          name: 'Hobby',
          component: Hobby
        }
      ]
    },
    {
      path: '/document',
      name: 'Document',
      components: {   // 命名视图，一个页面多个视图
        default: Document,
        slider: Slider
      },
      meta: {
        index: 1
      },
      // 单个路由钩子函数
      beforeEnter (to, from, next) {
        console.log('Document beforeEnter')
        next()
      }
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
