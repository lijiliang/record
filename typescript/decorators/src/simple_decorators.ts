// 装饰器 Decorators
// 装饰器 本身是一个函数
// 类装饰器接收的参数是构造函数
// 装饰器通过 @ 符号来使用
// function testDecorators(flag: boolean) {
//   if (flag) {
//     return function (constructor: any) {
//       // console.log('decorator')
//       constructor.prototype.getName = () => {
//         console.log('benson')
//       }
//     }
//   } else {
//     return function (constructor: any) { }
//   }
// }

// @testDecorators(true)
// class Test { }

// const test = new Test();
// // const test1 = new Test();
// (test as any).getName()