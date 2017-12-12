<template>
  <div>
    <h2>简易加法计算器</h2>
    <div>
      <input type="button" value="-" @click="deHandle({de:5})" />
      <span>{{count}}</span>
      <input type="button" value="+" @click="addHandle" />
      <p>{{num2}}</p>
    </div>
  </div>
</template>

<style>

</style>
