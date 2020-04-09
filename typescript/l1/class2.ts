// class getter and setter
class Person2 {
  // 一般私有属性前面都加一个_线
  constructor(private _name: string) { }
  // get 可以间接的去使用name属性,可以确保name的安全性
  get name() {
    return this._name + ' li'
  }
  set name(name: string) {
    this._name = name
  }
}

const person2 = new Person2('dell')
console.log(person2.name)
person2.name = 'Benson'
console.log(person2.name)



// 单例模式
class Demo1 {
  private static instance: Demo1;
  private constructor(public name: string) { }

  // 用了static 这个方法就相当于直接挂在类上，不需要new
  static getInstance() {
    if (!this.instance) {
      this.instance = new Demo1('benson__li')
    }
    return this.instance;
  }
}

const demo1 = Demo1.getInstance()
const demo2 = Demo1.getInstance()
console.log(demo1.name, demo2.name)