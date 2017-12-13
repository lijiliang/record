<template>
  <div>user
    <div class="user-list">
      <!-- <router-link style="padding: 0px 20px" :to="'/user/'+ item.tip + '/' + item.id" v-for="item in userList" key="index">{{item.userName}}</router-link> -->
      <router-link style="padding: 0px 20px" :to="{path: '/user/'+ item.tip + '/' + item.id, query: {info:'follow'}}" v-for="item in userList" key="index">{{item.userName}}</router-link>
    </div>
    <div class="user-info" style="font-size: 20px" v-if="userInfo.userName">
      <p>姓名：{{userInfo.userName}}</p>
      <p>姓别：{{userInfo.sex}}</p>
      <p>爱好：{{userInfo.hobby}}</p>
    </div>
    <hr>
    <div v-if="userInfo.userName" class="info-list" style="font-size: 20px">
      <!-- <router-link exact to="?info=follow">他的关注</router-link>
      <router-link exact to="?info=share">他的分享</router-link> -->
      <router-link exact :to="{path: '',query:{info: 'follow'}}">他的关注</router-link>
      <router-link exact :to="{path: '',query:{info: 'share'}}">他的分享</router-link>
      <div>
        {{$route.query}}
      </div>
    </div>
  </div>
</template>
<script>
let data = [
  {
    id: 1,
    tip: 'vip',
    userName: 'li',
    sex: '女',
    hobby: 'js'
  },
  {
    id: 2,
    tip: 'vip',
    userName: 'liang',
    sex: '男',
    hobby: 'css'
  },
  {
    id: 3,
    tip: 'common',
    userName: 'Benson',
    sex: '男',
    hobby: '读书'
  }
]

export default {
  data () {
    return {
      userList: data,
      userInfo: {},
      userId: ''
    }
  },
  created () {
    // 组件第一次调用这个生命周期
    // 地址一旦发生变化，$route会重新生成一个路由信息对象
    console.log(this.$route)

    this.getData()
  },
  watch: {
    $route () {
      // 路径发生变化，$route会重新赋值，监控了这个属性，会执行这个函数
      console.log('监控$route')
      this.getData()
    }
  },
  methods: {
    getData () {
      let id = this.$route.params.userId
      if (id) {
        this.userInfo = this.userList.filter((item) => {
          return item.id === Number(id)
        })[0]
      } else {
        this.userInfo = {}
      }
    }
  }
}
</script>
