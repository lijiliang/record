// 对类的方法进行装饰
// 普遍方法,target 对应的是类的 prototype
// 静态方法, target 对应的类的构造函数
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target, key)
  // descriptor.writable = false  // 方法不可被重写，即外部不能重写
  descriptor.value = function () {  // 可以对原有的方法做一个变更
    return 'descriptor'
  }
}

class Test1 {
  name: string;
  constructor(name: string) {
    this.name = name
  }
  @getNameDecorator
  getName() {
    return this.name
  }
}

const test1 = new Test1('benson')
// test1.getName = () => {
//   return '1234'
// }
console.log(test1.getName())
