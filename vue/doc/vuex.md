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