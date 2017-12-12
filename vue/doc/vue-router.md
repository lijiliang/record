# vue-router
作用：通过管理url，实现url和组件的对应和通过url进行组件之间的切换

## 单页应用
单页应用(SPA)，加载单个html页面，并在用户与应用程序交互动态更新该页面

## 开始使用vue-router
  - 使用步骤
  ```js
  //安装模块
  npm install vue-router --save

  //引入模块
  import VueRouter from 'vue-router'
  // 作为vue的插件
  Vue.use(VueRouter)
  //创建路由的实例对象
  new VueRouter({
    ...配置参数
  })
  //注入Vue选项参数
  new Vue({
    router
  })
  // 告诉路由常平的位置
  ```

## 动态路径
  匹配到的所有路由，全都映射到同一个组件

  路径：/user/:userId userId为动态路径参数

  获取参数：路由信息对象的params

## 对组件注入
通过在Vue根实例的route配置传入route实例

  - $router route实例对象
  - $route当前激活的路由信息对象，每个组件实例都会有
  - beforeRouteEnter() 进入组件前钩子函数
  - beforeRouteLeave() 离开组件前钩子函数

## 路由信息对象
一个路由信息对象表示当前激活的路由的状态信息，每次成功的导航后都会产生一个新的对象

 - path 字符串，对应当前路由的路径
 - params 对象，包含动态路由参数
 - query 对象，URL查询参数
 - hash 字符串，当前路由的hash值
 - fullPath字符串，URL包含查询参数和hash的完整路径
 - matched数组，包含当前路由的所有嵌套路径片段的路由记录
 — name字符串，当前路由的名称

## 过渡动效
  - 提供了transition的封装组件，添加过渡动画
  - 添加删除css类名

## 过渡的css类名
  - v-enter: 定义进入过渡的开始状态
  - v-enter-active: 定义进入活动的状态
  - v-enter-to: 定义进入结束的状态
  - v-leave: 定义离开过渡的开始状态
  - v-leave-active: 定义离开活动的状态
  - v-leave-to: 定义离开结束的状态

## 过渡模式
  - in-out: 新元素进行过渡，完成之后当前元素过渡离开
  - out-in:当前元素先进行过渡，完成之后新元素过渡进入

## 路由元信息
在路由配置中meta可以配置一些数据，用在路由信息对象中

访问meta中的数据：`$route.meta`

## 编程式导航
借助于`route`的实例方法，通过编写代码来实现导航的切换
  - back 回退一步
  - forward 前进一步
  - go 指定前进回退步数
  - push 导航到不同url,向history添加一个新的记录
  - replae导航到不同url,替换history中当前记录

## 导航钩子函数
导航发生变化时，导航钩子主要用来拦截导航，让它完成跳转或取消

### 执行钩子函数位置
  - router全局
  - 单个路由
  - 组件内

### 钩子函数
  - routr实例上： beforeEach、afterEach
  - 单个路由中： beforeEnter
  - 组件内的钩子： beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

### 钩子函数接收的参数
  - to: 要进入的目标路由对象，到哪里去
  - from: 正要离开的目标路由对象，从哪里来
  - next: 用来决定跳转取消导航

## 懒加载
把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载组件

  - Vue 异步组件
  ```js
  {
    componenbts: {
      custom: (resolve, reject) => {}
    }
  }

  // 例如
  headerNav: (resolve) => {   // 组件延迟加载
    setTimeout(() => {
      resolve(require('@/components/header'))
    }, 2000)
  }
  ```

  - webpack代码分割功能
  ```
  require.ensure代码分块
    require.ensure(依赖，回调函数，[chunk名字])
  
  import 函数
  ```
  ```js
  let Workbench = (resolve) => {
    return require.ensure([], () => {
      resolve(require('@/views/backend/workbench'))
    }, 'abc')   // abc可不写
  }
  ```

## 服务器配置
 - Nginx配置
 ```
 location / {
   root /home/我的应用跟目录
   try_files $uri $uri/ /index.html = 404
 }
 ```