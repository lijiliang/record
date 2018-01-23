import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
import Book from '@/components/book'
import List from '@/components/List'
import Dir from '@/components/Dir'
import Show from '@/components/show'
import Search from '@/components/search'
import Test from '@/components/Test'
import InputNumber from '@/components/inputNumber'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Book',
      component: Book
    },
    {
      path: '/list/:catalogid/:listid',
      name: 'List',
      component: List
    },
    {
      path: '/dir/:sid/:listid',
      name: 'Dir',
      component: Dir
    },
    {
      path: '/show/:id/:sid/:aid',
      name: 'Show',
      component: Show
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/inputnumber',
      name: 'InputNumber',
      component: InputNumber
    }
  ]
})
