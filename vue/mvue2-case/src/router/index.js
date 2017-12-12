import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import Login from '@/components/login'
// import Layout from '@/views/layout'
// import Project from '@/views/backend/project'
// import Workbench from '@/views/backend/workbench'
// import Doc from '@/views/backend/doc'

let Layout = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/views/layout'))
  })
}
let Project = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/views/backend/project'))
  })
}

// 代码分割，按功能 下面两个打包成一个js文件
let Workbench = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/views/backend/workbench'))
  }, 'abc')
}
let Doc = (resolve) => {
  return require.ensure([], () => {
    resolve(require('@/views/backend/doc'))
  }, 'abc')
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/managment',
      name: 'Management',
      component: Layout,
      children: [
        {
          path: '/project',
          name: 'Project',
          component: Project,
          meta: {
            login: true
          }
        },
        {
          path: '/workbench',
          name: 'Workbench',
          component: Workbench,
          meta: {
            login: true
          }
        },
        {
          path: '/doc',
          name: 'Doc',
          component: Doc,
          meta: {
            login: false
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'    // 不存在的路径，重定向到根目录
    }
  ]
})
