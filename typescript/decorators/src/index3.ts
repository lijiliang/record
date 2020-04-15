// 访问器的装饰器

function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false
}

class Test2 {
  private _name: string;
  constructor(name: string) {
    this._name = name
  }
  get name() {
    return this._name;
  }
  @visitDecorator
  set name(name: string) {
    this._name = name
  }
}

const test2 = new Test2('benson')
// test2.name = '12345678'
console.log(test2.name)
