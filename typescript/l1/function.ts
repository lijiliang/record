function hello() { }

const hello1 = function () { }

const hello2 = () => { }

// function add(first: number, second: number): number {
//   return first + second
// }

// const total = add(1, 2)

function sayHello(): void {
  console.log('hello')
  // return '';
}

// never 代表这个函数永远不可能执行到最后
function errorEmitter(): never {
  // throw new Error()
  // console.log(123)
  while (true) { }
}

// 参数解析参数
function add(
  { first, second }: { first: number, second: number }
): number {
  return first + second
}

const total = add({ first: 1, second: 2 })


function getNumber({ first }: { first: number }): number {
  return first
}
const counts = getNumber({ first: 1 })