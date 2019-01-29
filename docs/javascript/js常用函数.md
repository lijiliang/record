## js常用函数

### 函数防抖实现
`函数防抖`是间隔超过一定时间后才会执行
```js
function debounce(fn, delay) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }
}
```

### 函数节流实现
`函数节流`是一定时间段内只执行一次
```js
function throttle(fn, cycle) {
  let start = Date.now();
  let now;
  let timer;
  return function () {
    now = Date.now();
    clearTimeout(timer);
    if (now - start >= cycle) {
      fn.apply(this, arguments);
      start = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arguments);
      }, cycle);
    }
  }
}
```

### async / await
Javascript中的任何Promise都可以await，只要你用的库能返回Promise，就可以await它。实际上，async/await只不过是promise的语法糖而已。为了让代码正确运行，你只需在函数前面加上async即可
```js
async function getData() {
    const result = await axios.get('https://dube.io/service/ping')
    const data = result.data

    console.log('data', data)

    return data
}

getData()
```

### 异步控制流
许多时候需要获取多个数据集并在每个数据集上做一些处理，或者在所有异步调用都返回之后执行某项任务。

`for...of`


```js
import axios from 'axios'

let myData = [{id: 0}, {id: 1}, {id: 2}, {id: 3}]

async function fetchData(dataSet) {
    for(entry of dataSet) {
        const result = await axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
        const newData = result.data
        updateData(newData)

        console.log(myData)
    }
}

function updateData(newData) {
    myData = myData.map(el => {
        if(el.id === newData.id) return newData
        return el
    })
}

fetchData(myData)
```

`Promise.all`

我们可以await所有的promise，只需用Promise.all即可
```js
import axios from 'axios' 

let myData = [{id: 0}, {id: 1}, {id: 2}, {id: 3}]

async function fetchData(dataSet) {
    const pokemonPromises = dataSet.map(entry => {
        return axios.get(`https://ironhack-pokeapi.herokuapp.com/pokemon/${entry.id}`)
    })

    const results = await Promise.all(pokemonPromises)

    results.forEach(result => {
        updateData(result.data)
    })

    console.log(myData) 
}

function updateData(newData) {
    myData = myData.map(el => {
        if(el.id === newData.id) return newData
        return el
    })
}

fetchData(myData)
```

### 解构和默认值
```js
const { data } = await axios.get(...)

// 进行重命名：
const { data: newData } = await axios.get(...)

// 解构时制定默认值
const { id = 5 } = {}
console.log(id) // 5

// 用在函数参数上
function calculate({operands = [1, 2], type = 'addition'} = {}) {
    return operands.reduce((acc, val) => {
        switch(type) {
            case 'addition':
                return acc + val
            case 'subtraction':
                return acc - val
            case 'multiplication':
                return acc * val
            case 'division':
                return acc / val
        }
    }, ['addition', 'subtraction'].includes(type) ? 0 : 1)
}

console.log(calculate()) // 3
console.log(calculate({type: 'division'})) // 0.5
console.log(calculate({operands: [2, 3, 4], type: 'multiplication'})) // 24
```

### 逻辑运算符和三元运算符
算符也是用来缩减代码的，节省下宝贵的代码行数。经常有许多工具可以保持代码干净整洁

逻辑运算符

逻辑运算符可以组合两个表达式，并返回true或false，或者匹配的值。常用的有&&，意思是“与”，还有 || 意思是“或”
```js
console.log(true && true) // true
console.log(false && true) // false
console.log(true && false) // false
console.log(false && false) // false
console.log(true || true) // true
console.log(true || false) // true
console.log(false || true) // true
console.log(false || false) // false
```

根据上一部分关于真值和假值的知识，我们可以将逻辑运算符组合起来。在使用逻辑运算符时，会使用以下规则：

- && ：返回第一个值为假的表达式的值。如果不存在，则返回最后一个值为真的值。
- || ：返回第一个值为假的表达式的值。如果不存在，则返回最后一个值为假的值。

```js
console.log(0 && {a: 1}) // 0
console.log(false && 'a') // false
console.log('2' && 5) // 5
console.log([] || false) // []
console.log(NaN || null) // null
console.log(true || 'a') // true
```