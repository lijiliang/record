# vuex
  - vuex是什么
    . 专门为vue.js应用程序开发的 `状态管理模式`
    . 采用集中式存储管理应用的所有组件的状态
    . 以相应的规则保证状态以一种可 测的方式发生变化

  - 状态
    . 组件内部状态：仅在一个组件内使用的状态（data字段）
    . 应用级别状态：多个组件共用的状态

  - 什么情况下使用vuex
    . 多个视窗依赖于同一状态
    . 来自不同视图的行为需要变更同一状态

## 使用Vuex
  - 安装vuex模块
  ```
  npm install vuex --save
  ```

  - 作为插件使用
  ```
  Vue.use(Vuex)
  ```

  - 定义容器
  ```
  new Vuex.Store()
  ```

  - 注入根实例
  ```
  {
    store
  }
  ```

## Vuex核心概念
  - store: 类似容器，包含应用的大部分状态
    ```
    一个页面只能有一个store
    状态存储是响应式的
    不能直接改变store中的状态，唯一的途径显式地提交mutations
    ```
  - state:包含所有应用级别状态的对象
  - Getters:在组件内部获取store中状态的函数
  - Mutations: 唯一修改状态的事件回调函数
  - Actions: 包含异步操作、提交mutations改变状态
  - Moudules: 将store分割成不同的模块

## mutation 提交方式
```js
  this.$store.commit('deIncrement' {de: 5}) // 第一种提交方式

  this.$store.commit({ // 第二种提交方式
    type: 'deIncrement',
    de: 5
  })
```

## vuex辅助函数
 - mapState
 - mapGetters
 - mapMutations
 - mapActions