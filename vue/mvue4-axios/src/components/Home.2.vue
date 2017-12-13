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
  transformRequest: [function (data) {
    console.log(data)
    data.age = 27
    return queryString.stringify(data)    // 数据转换，将json格式转成字符串形式，  ma=liang&username=benson
  }],
  transformResponse: [function (data) {  // 响应回来的数据进行转换
    console.log('transformResponse', data)
    data.abc = 'benson'
    return data
  }],
  cancelToken: source.token
})

export default {
  name: 'Home',
  created () {
    HTTP.post('/upload', {
      ma: 'liang',    // ma=liang&username=benson
      username: 'benson'
    })
    .then((response) => {
      console.log(response.data)
    }).catch((error) => {
      if (axios.isCancel(error)) {
        console.log(error.message)
      } else {
        console.log(error)
      }
    })
    source.cancel('操作被用户取消')
  }
}
</script>
