## 1. Vuex 简介

声明：在此仅介绍Vuex精华知识，更详尽的知识请参考[Vuex中文官网](https://vuex.vuejs.org/zh-cn/intro.html)

### 1.1 初识Vuex

> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

Vuex 解决了`多个视图依赖于同一状态`和`来自不同视图的行为需要变更同一状态`的问题，将开发者的精力聚焦于数据的更新而不是数据在组件之间的传递上

### 1.2 Vuex各个模块

（1）`state`：用于数据的存储，是store中的**唯一数据源**
```javascript
// 定义
new Vuex.Store({
    state: {
        allProducts: []
    }
    //...
})
// 组件中获取
this.$store.state.allProducts
```

（2）`getters`：如vue中的计算属性一样，**基于state数据的二次包装**，常用于数据的筛选和多个数据的相关性计算
```javascript
// 定义
getters: {
    cartProducts(state, getters, rootState) 
        => (getters.allProducts.filter(p => p.quantity))
}
// 组件中获取
this.$store.getters.cartProducts
```

（3）`mutations`：类似函数，**改变state数据的唯一途径，且不能用于处理异步事件（重点！！！）**
```javascript
// 定义
mutations: {
    setProducts (state, products) {
        state.allProducts = products
    }
}

// 组件中使用
this.$store.commit('setProducts', {//..options})
```

（4）`actions`：类似于mutation，**用于提交mutation来改变状态，而不直接变更状态，可以包含任意异步操作**
```javascript
// 定义（shop为api）
actions: {
    getAllProducts ({ commit }, payload) {
        shop.getProducts((res) => {
            commit('setProducts', res)
        })
    }
}

// 组件中使用
this.$store.dispatch('getAllProducts', {//..payload})
```

（5）`modules`：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护
```javascript
// 定义
const moduleA = {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
}

const moduleB = {
    state: { ... },
    mutations: { ... },
    actions: { ... }
}

const store = new Vuex.Store({
    modules: {
        a: moduleA,
        b: moduleB
    }
})

// 组件中使用
store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```
注意：**默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应，仅有state是局部作用。**因此，常用getters将state包装后输出，这样可以直接通过`this.$store.getters.`的方式拿到数据，而不用去访问某个模块下的state

### 1.3 辅助函数

在组件中使用store中的数据或方法时，按照上面的说法，每次都要`this.$store.`的方式去获取，有没有简单一点的方式呢？辅助函数就是为了解决这个问题
```javascript
// 组件中注册
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    computed: {
        // 数组形式，当映射的计算属性的名称与 state 的子节点名称相同时使用
        ...mapState(['allProducts'])
        // 对象形式，可重命名 state 子节点名称
        ...mapState({
            products: state => state.allProducts
        })
        // 下面为了简便，均以数组形式使用
        ...mapGetters(['cartProducts'])
    },
    methods: {
        ...mapMutations(['setProducts']),
        ...mapActions(['getAllProducts'])
    }
}

// 组件中使用
// 变量
this.allProducts
this.products
// 方法
this.setProducts()
this.getAllProducts()
```
由于上面提到，常用的做法是将state中数据使用getter包装后输出，因此，mapState在项目中较少遇到，其他三个倒是经常使用，另外，有两个注意项和两个最佳实践：

**注意**：
1. **Mutation 需遵守 Vue 的响应规则**，[见Vuex官网Mutation部分](https://vuex.vuejs.org/zh-cn/mutations.html)
2. **表单处理时引发的直接修改state中数据**问题，[见Vuex官网表单处理部分](https://vuex.vuejs.org/zh-cn/forms.html)

**最佳实践**（后面的demo中会引导使用）：
1. **使用常量替代 Mutation 事件类型**，这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
2. store 结构使用如下方式
```shell
store
    ├── index.js             # 导出 store 的地方
    ├── state.js             # 根级别的 state
    ├── getters.js           # 二次包装state数据
    ├── actions.js           # 根级别的 action
    ├── mutations.js         # 根级别的 mutation
    ├── mutation-types.js    # 所有 mutation 的常量映射表
    └── modules              # 如果有.
        ├── ...
```

## 2. Vuex 安装

（1）在项目中安装`Vuex`：
```
npm install vuex --save
```

（2）在src目录下新建`store/index.js`，其中代码如下：
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 修改state时在console打印，便于调试
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {}
const getters = {}
const mutataions = {}
const actions = {}

export default new Vuex.Store({
    state,
    getters,
    mutataions,
    actions,
    // 严格模式，非法修改state时报错
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
```
（3）在入口文件`main.js`中添加：
```javascript
// ...
import router from './router'
import store from './store'

new Vue({
    el: '#app',
    router,
    store,
    // ...
})
```
可以对比vue-router和vuex的安装方式：它们**均为vue插件，并在实例化组件时引入，在该实例下的所有组件均可由`this.$router`和`this.$store`的方式查询到对应的插件实例**
