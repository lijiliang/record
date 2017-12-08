## 导航钩子函数
导航发生变化时，导航钩子主要用来拦截导航，让它完成跳转或取消

### 执行钩子函数位置
  - router全局
  - 单个路由
  - 组件占

### 钩子函数
  - routr实例上： beforeEach、afterEach
  - 单个路由中： beforeEnter
  - 组件内的钩子： beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave

### 钩子函数接收的参数
  - to: 要进入的目标路由对象，到哪里去
  - from: 正要离开的目标路由对象，从哪里来
  - next: 用来决定跳转取消导航