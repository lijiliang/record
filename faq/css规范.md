# css 源码规范

## 基础
- 样式采用 less 语法
- 样式则以，类似: 'xx' 为命名空间

## 语义化
如xx-tab、xx-nav,不要使用red、left等表象的词命名

## 类名有前缀
```html
<div className="xx-dialog">
   <h2 class="xx-dialog-hd">dialog header</h2>
   <p class="xx-dialog-bd">dialog body</p>
</div>
```
子模块：{命名空间}-{模块名}-{子模块名} 常用模块名有：bd(body)、cnt(content)、hd(header)、text(txt)、img(image/pic)、title、item 、cell等，词义表达组件要实现的功能

上面的代码中，模块的名为 dialog，模块最外层使用 {命名空间}-{模块名} 的方式命名 Class。
模块子元素以在此基础上进行命名。如果不继承父级的类名，很容易造成命名冲突。

##状态
模块状态：{命名空间}-{模块名}-{状态描述} 常用状态有：hover,current,selected,disabled,focus,blur,checked,success,error等
