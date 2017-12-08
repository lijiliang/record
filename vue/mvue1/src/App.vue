<template>
  <div id="app">

    <div class="nav-box">
      <ul class="nav">
        <router-link :to="index" exact tag="li" event="mouseover">
          <i class="fa fa-home"></i>
          <span>home</span>
        </router-link>
        <li>
          <router-link :to="{path: '/document'}" active-class="activeClass">document</router-link>
        </li>
        <li><router-link to="/about">about</router-link></li>
        <li><router-link to="/user">user</router-link></li>
      </ul>
    </div>
    <input type="button" value="后退" @click="backHandle()">
    <input type="button" value="前进" @click="forwardHandle()">
    <input type="button" value="控制前进后退的步娄" @click="goHandle()">
    <input type="button" value="控制指定的导航push" @click="pushHandle()">
    <input type="button" value="控制指定的导航replace" @click="replaceHandle()">
    <!-- {{$route.meta.index}} -->
    <!-- <router-view name="slider" class="center"/> -->
    <!-- <router-view class="center"/> -->
    <transition :name="names">
      <router-view class="center"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      index: '/',
      names: 'left'
    }
  },
  watch: {
    $route (to, from) {
      console.log(to.meta.index)  // 目标导航的下标
      console.log(from.meta.index)  // 离开导航的下标
      if (to.meta.index < from.meta.index) {
        this.names = 'right'
      } else {
        this.names = 'left'
      }
    }
  },
  methods: {
    backHandle () {
      this.$router.back()
    },
    forwardHandle () {
      this.$router.forward()
    },
    goHandle () {
      this.$router.go(-1)
    },
    pushHandle () {
      // this.$router.push('/user')
      this.$router.push({path: '/user'})
    },
    replaceHandle () {
      this.$router.replace({path: '/user'})
    }
  }
}
</script>
<style>
/* 进入 */
.v-enter {
  opacity: 0;
}
.v-enter-to{
  opacity: 1;
}
.v-enter-active{
  transition: .5s;
}

/* 离开 */
.v-leave{
  opacity: 1;
}
.v-leave-to{
  opacity: 0;
}
.v-leave-active{
  transition: .5s;
}

/* 向左 */
.left-enter {
  transform: translateX(100%);
}
/* .left-enter-to {
  transform: translateX(0);
} */
.left-enter-active, .left-leave-active{
  transition: .2s;
}
/* .left-leave{
  transform: translateX(0)
} */
.left-leave-to{
  transform: translateX(-100%)
}

/* 向左 */
.left-enter {
  transform: translateX(100%);
}
/* .left-enter-to {
  transform: translateX(0);
} */
.left-enter-active, .left-leave-active{
  transition: .2s;
}
/* .left-leave{
  transform: translateX(0)
} */
.left-leave-to{
  transform: translateX(-100%)
}

/* 向右 */
.right-enter {
  transform: translateX(-100%);
}
.left-enter-to {
  transform: translateX(-100%);
}
.right-enter-active, .right-leave-active{
  transition: .5s;
}
/* .left-leave{
  transform: translateX(0)
} */
.right-leave-to{
  transform: translateX(100%)
}
</style>
