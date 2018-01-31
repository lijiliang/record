
## AMD是RequireJS在推广过程中对模块化的规范化产出
AMD一个异步模块定义
```js
define(['package/lib'], function(lib){
    function foo() {
        lib.log('hello world')
    }

    return {
        foo: foo
    }
})
```

## CMD是SeaJS在推广过程中对模块定义的规范化产出
CMD是同步模块定义，就近原则,需要时再引用
```js
define(function(require, exports, modules){
    // 通过 require引入依赖
    var $ = require('jquery')
    var spinning = require('./spinning')
})
```
## CommonJS规范 - module.exports
CommonJs是node的一个模块规范，浏览器不支持
```js
export.erea = function (r) {
    return Math.PI * r * r;
}
```

## ES6特性 export/import
```js
export default function(x,y){
    return x + y;
}

export var sum = function(x, y){
    return x + y
}

import * as from '../util.js'
import { sum } from '../util.js'
import('../util.js')
```
