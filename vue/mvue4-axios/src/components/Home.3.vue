<template>
  <div class="home">Axios</div>
</template>

<script>
import axios from 'axios'
import queryString from 'querystring'

// 取消请求
var CancelToken = axios.CancelToken
var source = CancelToken.source()

var HTTP = axios.create({
  baseURL: ' https://easy-mock.com/mock/5a309f57a7b8a1251272f96e/example',
  timeout: 1000,
  responseType: 'json',
  headers: {  // 请求头
    'content-type': 'application/x-www-from-urlencoded',
    'custome-header': 'kyani'
  },
  cancelToken: source.token
})

// 拦截
HTTP.interceptors.request.use(function (config) {
  // 在发送请求之前做些事
  console.log('全局拦截')
  console.log(config)
  return config
}, function (error) {
  // 请求错误时做些事
  return Promise.reject(error)
})

// 拦截响应
HTTP.interceptors.response.use(function (data) {
  console.log('interceptors', data)
  return data
})

export default {
  name: 'Home',
  created () {
    function http1 () {
      return HTTP.get('/user')
    }

    function http2 () {
      return HTTP.post('/upload')
    }

   /*
    axios.all([http1(), http2()])
    .then((response) => {
      console.log(response)
    }).catch((error) => {
      if (axios.isCancel(error)) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    })
    */
    axios.all([http1(), http2()]).then(axios.spread((res1, res2) => {
      console.log(res1, res2)
    })).catch((error) => {
      console.log(error)
    })
  }
}
</script>
