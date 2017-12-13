<template>
  <div class="home">Axios</div>
</template>

<script>
import axios from 'axios'

/*
var HTTP = axios.create({
  baseURL: ' https://easy-mock.com/mock/5a309f57a7b8a1251272f96e/example',
  timeout: 1000,
  responseType: 'json',
  headers: {  // 请求头
    'custome-header': 'kyani'
  },
  params: {  // 查询字符串
    book: '123'
  }
})
*/

var HTTP = axios.create({
  baseURL: ' https://easy-mock.com/mock/5a309f57a7b8a1251272f96e/example',
  timeout: 1000,
  responseType: 'json',
  headers: {  // 请求头
    'custome-header': 'kyani'
  },
  params: {  // 查询字符串
    book: '123'
  }
})

export default {
  name: 'Home',
  created () {
    HTTP.get('/user')
      .then((response) => {
        console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }
}
</script>
