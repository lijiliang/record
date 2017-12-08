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
        <li><router-link to="about">about</router-link></li>
        <li><router-link to="user">user</router-link></li>
      </ul>
    </div>
    <router-view name="slider" class="center"/>
    <router-view class="center"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      index: '/'
    }
  }
}
</script>