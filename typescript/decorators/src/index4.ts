// 属性的装饰器

// 修改的并不是实例上的 name, 而是原型上的 name
function nameDecorator(target: any, key: string): any {
  // const descriptor: PropertyDescriptor = {
  //   writable: false
  // }
  // return descriptor

  target[key] = 'lee'
}

// name 放在实例上
class Test3 {
  @nameDecorator
  name = 'Benson'
}

const test3 = new Test3()
// test3.name = 'asf'
console.log(test3.name)
console.log((test3 as any).__proto__.name)
