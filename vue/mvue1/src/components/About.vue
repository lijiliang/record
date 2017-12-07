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
    <router-view></router-view>
  </div>
</template>
