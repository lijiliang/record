## web移动端开发问题小结

## CSS常见问题

### Mete标签
```html
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />
```

### 禁止选择文本
```css
-webkit-user-select:none
```
禁止用户选择文本，但在IOS下的textarea出现不能编辑的情况，我们用了以下的解决方案

```css
textarea{
    -webkit-user-select: text;//如果设置为none 会导致iphone(或者其他)一些手机下不能编辑
}
```

### 屏蔽阴影
```css
-webkit-appearance:none
```
可以同时屏蔽输入框怪异的内阴影，解决iOS下无法修改按钮样式。但ios默认还是会带有圆角，可以使用border-radius属性修改

### 让页面字体变清晰
```css
-webkit-font-smoothing: antialiased;
```
让页面里的字体变清晰 抗锯齿 灰度平滑

### 设置placeholder时候 focus时候文字没有隐藏
```CSS
input:focus::-webkit-input-placeholder{
	opacity: 0;
}
```

### css之border-box
- 布局的好东西，常用。为元素设定的宽度和高度决定了元素的边框盒，即是只要设置了这个值，在布局中使用`padding-left` 或 `padding-right`都不会影响整体布局。
- 设置的宽高将包含 边框及 padding

### css3多文本换行
```css
p {
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```
Webkit支持一个名为-webkit-line-clamp的属性，也就是说这个属性并不是标准的一部分，可能是Webkit内部使用的，或者被弃用的属性。需要注意的是display需要设置成box，-webkit-line-clamp表示需要显示几行。

### IOS里面fixed的文本框焦点居中
```html
<!DOCTYPE html>
    <head>
    input {
       position:fixed;
       top:0;left:0;
    }
    </head>
    <body>
        <div class="header">
            <form action="">
                <label>Testfield: <input type="text" /></label>
            </form>
        </div>
    </body>
</html>
```
在ios里面，当一个文本框的样式为fixed时候，如果这个文本框获得焦点，它的位置就会乱掉，由于ios里面做了自适应居中，这个fixed的文本框会跑到页面中间。
#### 解决办法有两个：
可以在文本框获得焦点的时候将fixed改为absolute，失去焦点时在改回fixed，但是这样会让屏幕有上下滑动的体验不太好。

```javascript
.fixfixed {
position:absolute;
}
$(document)
    .on('focus', 'input', function(e) {
        $this.addClass('fixfixed');
    })
    .on('blur', 'input', function(e) {
        $this.removeClass('fixfixed');
    });
```
还有一种就是用一个假的fixed的文本框放在页面顶部，一个absolute的文本框隐藏在页面顶部，当fixed的文本框获得焦点时候将其隐藏，然后显示absolute的文本框，当失去焦点时，在把absolute的文本框隐藏，fixed的文本框显示

```javascript
.fixfixed {
position:absolute;
}
$(document)
    .on('focus', 'input', function(e) {
        $absolute..show();
        $this.hide();
    })
    .on('blur', 'input', function(e) {
         $fixed..show();
        $this.hide();
    });
```
最后一种就是顶部的input不参与滚动，只让其下面滚动。

### 移动端做文本尾行留空截断处理的一个方案
 - http://www.w3ctech.com/topic/616

## JS常见问题
###  获取滚动条的值
```javascript
window.scrollY 
window.scrollX
```
