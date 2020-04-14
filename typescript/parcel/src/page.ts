import $ from 'jquery'

$(function () {
  $('body').html('<div>1234</div>')
  new $.fn.init()
})

interface Person {
  name: string;
  age: number;
  gender: string;
}

// type T = 'name'
// key: 'name'
// Person['name']

class Teacher {
  constructor(private info: Person) { }

  // 泛型中的keyof ts 类型保护
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key]

  }
}
const teacher = new Teacher({
  name: 'LI',
  age: 28,
  gender: 'male'
})
const test = teacher.getInfo('age')
console.log(test)