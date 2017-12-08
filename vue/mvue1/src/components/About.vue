<template>
  <div>
    about
    <hr>
    <ul class="nav">
      <!-- <router-link to="/about" exact tag="li">
        <a>study</a>
      </router-link>
      <router-link to="/about/work" tag="li">work</router-link>
      <router-link to="/about/hobby" tag="li">hobby</router-link> -->
      <router-link :to="{name: 'About'}" exact tag="li">
        <a>study</a>
      </router-link>
      <router-link :to="{name: 'Work'}" tag="li">
        <a>work</a>
      </router-link>
      <router-link :to="{name: 'Hobby'}" tag="li">hobby</router-link>
    </ul>
    <hr>
    测试数据：{{test}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: '改变前'
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('组件级路由钩子函数beforeRouteEnter')
    // console.log(this)   注意：这里的this值是undefined  这是因为组件还没有创建完成
    next((vm) => {  // 通过回调函数接收一个参数， 这个参数其实就this值
      vm.test = '改变了'
    })
  },
  // 更新的路由钩子函数
  beforeRouteUpdate (to, from, next) {
    console.log('beforeRouteUpdate')
    next()
  },
  // 离开路由的钩子函数
  beforeRouteLeave (to, from, next) {
    next()
  },
  beforeCreate () { 
    console.log('创建组件前beforeCreate')
  }
}
</script>
