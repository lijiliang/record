# middleware 中间件
> 正是因为中间件的扩展性才使得 `Koa` 的代码简单灵活。

<br> 

在 `app.js` 中，有这样一段代码： 

```js
app.use(async (ctx, next)=>{
  await next()
  ctx.response.type = 'text/html'
  ctx.response.body = '<h1>Hello World</h1>'  
})
``` 

它的作用是：每收到一个`http`请求，`koa`都会调用通过`app.use()`注册的`async`函数，同时为该函数传入`ctx`和`next`两个参数，而这个`async`函数就是我们所有的中间件

下面我们简介介绍一下传入中间件的两个参数

## ctx

<br>

`ctx`作为上下文使用，包含了基本的`ctx.request`和`ctx.response`。另外，还对`koa`内部一些常用的属性或者方法做了代理操作，使得我们可以直接通过`ctx`获取。比如`ctx.request.url`可以写成`ctx.url`

<br> 

除此之外，`Koa` 还约定了一个中间件的存储空间 `ctx.state`。通过 `state` 可以存储一些数据，比如用户数据，版本信息等。如果你使用 `webpack` 打包的话，可以使用中间件，将加载资源的方法作为 `ctx.state` 的属性传入到 `view` 层，方便获取资源路径。

## next
<br>

`next` 参数的作用是将处理的控制权转交给下一个中间件，而 `next()` 后面的代码，将会在下一个中间件及后面的中间件（如果有的话）执行结束后再执行。

**注意：** 中间件的顺序很重要！ 
 
<br>  


流程是一层层的打开，然后一层层的闭合，像是剥洋葱一样 —— 洋葱模型。

此外，如果一个中间件没有调用 `await next()`，会怎样呢？答案是『后面的中间件将不会执行』。

