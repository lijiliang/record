// 装饰器 Decorators
// 装饰器 本身是一个函数
// 类装饰器接收的参数是构造函数
// 装饰器通过 @ 符号来使用

// function testDecorators<T extends new (...args: any[]) => {}>(constructor: T) {
//   return class extends constructor {
//     name = 'Li';
//     getName() {
//       return this.name
//     }
//   }
// }

// @testDecorators
// class Test {
//   name: string;
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const test = new Test('Benson');
// // console.log(test)
// console.log((test as any).getName())


function testDecorators() {
  return function <T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      name = 'Li';
      getName() {
        return this.name
      }
    }
  }
}

const Test = testDecorators()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name
    }
  }
)

const test = new Test('bli')
console.log(test.getName())