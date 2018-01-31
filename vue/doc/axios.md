# Axios
基于Promise用于浏览器和node.js的与服务端通信库

## Mock
https://easy-mock.com/

## 使用axios
 - 需要在模块中引用使用
 ```
import axios from 'axios'
 ```

 - 语法
 ```
  1.axios(config)
  2.axios[method]

  返回值为Promise
 ```

 - 支持的请求方式
 ```
  axios.get(url[, config])
  axios.post(url[, data[, config]])
  axios.delete(url[, config])
  axios.head(url[, config])
  axios.options(url[, config])
  axios.put(url[, data[, config]])
  axion.patch(url[, data[, config]])
 ```

 ## 自定义请求实例
  - 创建
  ```
  axios.create(config)
  ```

  - 配置
  ```
  {
    baseURL: '',
    timeout: 1000,
    headers: {},
    responseType: 'json',
    params: {},
    transformRequest: [],  // 只适合PUT, POST和PATCH  转换数据
    transformResponse: [], // 对请求回来的数据进行进一步处理
    validateStatus: function(){},
    cancelToken:
  }
  ```

  知识点：  'content-type': 'application/x-www-from-urlencoded'

## 取消请求
 - 创建取消请求令牌
 ```js
  var CancelToken = axios.CancelToken
  var source = CancelToken.source()
 ```

 - 配置：
 ```js
 cancelToken: source.token
 ```

 - 捕获取消错误
 ```js
  if (axios.isCancel(error)){
    console.log(error.message)
  }
 ```

 - 调用取消
 ```
 source.cancel('操作被用户取消')
 ```

## 并发请求
  - 请求
  ```
  axios.all(iterable)
  axios.spread(callback)
  ```

## 拦截器
 - 全局拦截器
  . 拦截请求
  ```js
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些事
    return config
  }, function (error) {
    // 请求错误时做些事
    return Promise.reject(error)
  })
  ```
  . 拦截响应
  ```js
  axios.interceptors.response.use()

  axios.interceptors.response.use(function (response) {
      console.log('response init.')
      return response
  })
  ```

- 取消拦截
```js
  axios.interceptors.request.eject(myInterceptor)
```

## 在vue中使用
 - 安装
  ```
  npm install axios vue-axios --save
  ```

 - 作为插件
  ```
  Vue.use(VueAxios, Axios)
  ```

 - 在组件中使用
 ```js
  this.$http[method]()
 ```
