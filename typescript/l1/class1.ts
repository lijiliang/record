// private, protected, public 访问类型
// public 允许我们在类的内外被调用 
// private 允许在类内被使用
// protected 允许在类内及继承的子类中使用
class Per {
  public name = 'benson';
  public sayHi() {
    this.name;
    console.log('hi')
  }
  private sayABC() {
    this.sayHi()
  }
}

class Tea1 extends Per {
  public sayBye() {
    this.name
  }
}

const per = new Per();
per.name = 'benson li'
console.log(per.name)
per.sayHi()


// contructor
class Per1 {
  // 传统写法
  // private name: string = '';
  // constructor(name: string) {  // constructor 在 new 一个实例的瞬间会被执行
  //   this.name = name
  // }

  // 简化写法
  constructor(public name: string) {
  }
}

const per1 = new Per1('benson per1')
console.log(per1.name)


class Per2 {
  constructor(public name: string) { }
}

class Tea2 extends Per2 {
  constructor(public age: number) {
    super('dell')  // super的意思是调用父类的构造函数
  }
}

const tea2 = new Tea2(28)