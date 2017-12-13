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
    transformRequest: [],  // 只适合PUT, POST和PATCH
    transformResponse: [],
    validateStatus: function(){},
    cancelToken
  }
  ```