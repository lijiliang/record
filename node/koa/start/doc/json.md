# JSON 数据 

## 如何设置 JSON 格式 
<br/>

在数据传输过程中，传输的资源都可以称之为『数据』，而『数据』之所以展示出不同的形态，是因为我们已经设置了它的格式。 

<br/> 

传输的数据像是『水』一样，没有任何的格式和形状。 

我们的设置像是『器』一样，赋予它指定的形态。 

<br/> 

所以，我们只需要设置把数据挂载在响应体 `body` 上，同时告诉客户端『返回的是 `JSON` 数据』，客户端就会按照 `JSON` 来解析了。代码如下： 

```js
ctx.set("Content-Type", "application/json")
ctx.body = JSON.stringify(json)
```

<br/> 

## 提取中间件 

<br/> 

我们把上面的代码提取成一个中间件，这样更方便代码的维护性和扩展性 

<br/> 

增加文件 `/middleware/mi-send/index.js`：

```js
module.exports = () => {
  function render(json) {
      this.set("Content-Type", "application/json")
      this.body = JSON.stringify(json)
  }
  return async (ctx, next) => {
      ctx.sendjson = render.bind(ctx)
      await next()
  }
}
``` 

**注意：** 目录不存在，需要自己创建。 

<br/> 

代码中，我们把 `JSON` 数据的处理方法挂载在 `ctx` 对象中，并起名为 `sendjson`。当我们需要返回 `JSON` 数据给客户端时候，只需要调用此方法，并把 `JSON` 对象作为参数传入到方法中就行了，用法如下： 

```js
ctx.sendjson({
  status: 'success',
  data: 'hello benson'
})
``` 