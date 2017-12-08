<template>
  <div>user
    <div class="user-list">
      <router-link style="padding: 0px 20px" :to="'/user/' + item.id" v-for="item in userList" key="index">{{item.userName}}</router-link>
    </div>
  </div>
</template>
<script>
let data = [
  {
    id: 1,
    userName: 'li',
    sex: '女',
    hobby: 'js'
  },
  {
    id: 2,
    userName: 'liang',
    sex: '男',
    hobby: 'css'
  },
  {
    id: 3,
    userName: 'Benson',
    sex: '男',
    hobby: '读书'
  }
]

export default {
  data () {
    return {
      userList: data,
      userId: ''
    }
  },
  created () {
    console.log(this.$route)
    this.userId = this.$route.params.userId
  }
}
</script>
