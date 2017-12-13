<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  created () {
    /*
    axios({
      method: 'get',
      url: 'https://easy-mock.com/mock/5a30a110a7b8a12512730301/list/emdata'
    }).then((response) => {
      console.log(response.data)
    }).catch((error) => {
      console.log(error)
    })
    */

    /*
    axios.get('https://easy-mock.com/mock/5a30a110a7b8a12512730301/list/emdata', {
      params: {
        abc: '123'
      }
    }).then((data) => {
      console.log(data)
    })

    axios.post('https://easy-mock.com/mock/5a309f57a7b8a1251272f96e/example/upload', {
      ma: '123'
    }).then((data) => {
      console.log(data)
    })
    */
  }
}
</script>


