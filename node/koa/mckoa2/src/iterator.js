/*
// 最原始的迭代器
function makeIterator (arr) {
  let nextIndex = 0

  // 返回一个迭代器对象
  return {
    next: () => {
      // next() 方法返回的结果对象
      if (nextIndex < arr.length) {
        return {
          value: arr[nextIndex++],
          done: false
        }
      } else {
        return {
          done: true
        }
      }
    }
  }
}

const it = makeIterator(['吃饭', '睡觉', '打豆豆'])

console.log('1', it.next().value)
console.log('2', it.next().value)
console.log('3', it.next().value)
console.log('4', it.next().done)
*/

// 生成器
// 让我们更简单地使用迭代器
function *makeIterator (arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const gen = makeIterator(['吃饭', '睡觉', '打豆豆'])

console.log('1', gen.next().value)
console.log('2', gen.next().value)
console.log('3', gen.next().value)
console.log('4', gen.next().done)