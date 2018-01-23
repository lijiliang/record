<template>
 <div>
   <input-number v-model="value" :max="10" :min="0" :step="step"></input-number>
   <input type="text" v-focus>
   <div v-test="{msg: 'hello', name: 'Aresn'}"></div>

   <div class="cloak">
     <div class="main" v-clickoutside.esc="handleClose">
       <button @click="show = !show">点击显示下拉菜单</button>
       <div class="dropdown" v-show="show">
         <p>下拉框内容，点击外面区域可以关闭</p>
       </div>
     </div>
   </div>

   <div class="m-time">
     <div v-time="timeNow"></div>
     <div v-time="timeBefore"></div>
   </div>
 </div>
</template>
<script>
import InputNumber from '@/components/inputNumber/input'

var Time = {
  // 获取当前时间
  getUnix: function () {
    var date = new Date()
    return date.getTime()
  },
  // 获取今天0点0分0秒的时间
  getTodayUnix: function () {
    var date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取今年1月1日0点0分的时间
  getYearUnix: function () {
    var date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  // 获取标准年月日
  getLastDate: function (time) {
    var date = new Date(time)
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  },
  getFormatTime: function (timestamp) {
    var now = this.getUnix()  // 当前时间
    var today = this.getTodayUnix() // 今天0点时间
    // var year = this.getYearUnix()   // 今年0点时间
    var timer = (now - timestamp) / 1000   // 转换为秒级时间
    var tip = ''

    if (timer <= 0) {
      tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}
export default {
  data () {
    return {
      value: 10,
      step: 5,
      show: false,
      timeNow: (new Date()).getTime(),
      timeBefore: 1499990695721
    }
  },
  // 自定义指令
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    },
    test: {
      bind: function (el, binding, vnode) {
        console.log(binding.value.msg)
        console.log(binding.value.name)
      }
    },
    clickoutside: {
      bind: function (el, binding, vnode) {
        // console.log(el, binding, vnode)
        function documentHandler (e) {
          console.log(e)
          if (el.contains(e.target)) {
            return false
          }
          if (binding.expression) {
            binding.value(e)  // 用来执行上下文methods中指定的函数的
          }
        }

        el.__vueClickOutside__ = documentHandler
        document.addEventListener('click', documentHandler)
      },
      unbind: function (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
      }
    },
    time: {
      bind: function (el, binding) {
        console.log(el, binding)
        el.innerHTML = Time.getFormatTime(binding.value)
        el.__timeout__ = setTimeout(function () {
          el.innerHTML = Time.getFormatTime(binding.value)
        }, 60000)
      },
      unbind: function (el) {
        clearInterval(el.__timeout__)
        delete el.__timeout__
      }
    }
  },
  methods: {
    handleClose: function () {
      this.show = false
    }
  },
  components: {
    InputNumber
  }
}
</script>
<style scoped>
.main{
  width : 125px ;
  margin: 30px auto;
}
.main button{
display: block;
width:10;
color: #fff;
background-color: #f9f;
border: 0;
padding : 6px ;              
text-align:center; 
font-size : 12px; 
border-radius : 4px; 
cursor: pointer; 
outline: none ; 
position: relative ;
}
.main button:active{
  top: lpx;
  left: lpx;
}
.dropdown{ 
  width: 10;  
  height: 150px;
  margin: 5px 0;
  font-size: 12px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2)
}
.dropdown p{
  display: inline-block;
  padding: 6px;
}
</style>


