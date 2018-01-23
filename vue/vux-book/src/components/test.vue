<template>
  <div class="m-dir">
    <p>{{date}}</p>
    <p>{{date | formatDate}}</p>
    {{number / 10 }}
    {{ text.split(',').reverse().join(',') }}  {{reversedText}}
    <!-- <p><a v-bind:href="url">百度</a></p> -->
    <p><a :href="url">百度</a></p>
    <p v-if="show">这是一段文本</p>
    <!-- <button type="button" name="button" v-on:click="show = false">点击隐藏</button> -->
    <button type="button" name="button" @click="show = false">点击隐藏</button>
    <div :class="{'active' : isActive}">class</div>
    <div :class="classes">计算属性 class</div>
    <div :class="[activeCls, errorCls]">多个 class</div>
    <div class="messag" v-cloak>
      {{message}}
    </div>
    <p v-if="status === 1">当status为1是显示该行</p>
    <p v-else-if="status === 2">当status为2是显示该行</p>
    <p v-else>否则显示该行</p>
    <p><span v-for="n in 10">{{n}}</span></p>
    <a href="http://www.apple.com" @click="handleClick('禁止打开', $event)">打开链接</a>
    <br/>
    <div id="divt" v-if="showDiv">这是一段文本</div>
    <button @click="getText">获取div内容</button>
  </div>
</template>

<script>
// 自动补0
var padDate = function (value) {
  return value < 10 ? '0' + value : value
}
export default {
  data () {
    return {
      date: new Date(),
      number: 100,
      text: '123,456',
      url: 'http://www.baidu.com',
      show: true,
      isActive: true,
      error: null,
      activeCls: 'active',
      errorCls: 'error',
      message: '这是一段文本',
      status: 1,
      showDiv: true
    }
  },
  // 过滤器
  filters: {
    formatDate: function (value) {
      var date = new Date(value)
      var year = date.getFullYear()
      var month = padDate(date.getMonth() + 1)
      var day = padDate(date.getDate())
      var hours = padDate(date.getHours())
      var minutes = padDate(date.getMinutes())
      var seconds = padDate(date.getSeconds())
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  // 定义方法
  methods: {
    handleClick (message, event) {
      event.preventDefault()
      console.log(event)
      window.alert(message)
    },
    getText () {
      this.showDiv = true
      // var text = document.getElementById('divt').innerHTML
      this.$nextTick(() => {
        var text = document.getElementById('divt').innerHTML
        console.log(text)
      })
    }
  },
  // 计算属性
  // 计算属性可以完成各种运算，函数调用，只要最终返回一个结果
  computed: {
    reversedText () {
      // 这里的this指向的是当前的vue实例
      return this.text.split(',').reverse().join(',')
    },
    classes () {
      return {
        active: this.isActive && !this.error,
        'text-fail': this.error && this.error.type === 'fail'
      }
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)   // 在vue实例销毁前，清除定时器
    }
  }
}
</script>

<style lang="css">
</style>
