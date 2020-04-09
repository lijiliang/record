
// class Person3 {
//   public readonly name: string = ''
//   constructor(name: string) {
//     this.name = name;
//   }
// }

// const person3 = new Person3('Benson')
// person3.name = 'hello'  // readonly 只能读，不能改
// console.log(person3.name)

// 抽象类
abstract class Geom {
  getType() {
    return 'Gemo';
  }
  abstract getArea(): number;
}

class Circle extends Geom {
  getArea() {
    return 1234;
  }
}
class Square { }
class Triangle { }


interface Teacher2 {
  name: string,
  age: number
}
interface Studend {
  name: 'less',
  age: 18
}

const teacher2 = {
  name: 'less'
}
const studend = {
  name: 'less',
  age: 18
}
const getUserInfo = (user: Teacher2 | Studend) => {
  console.log(user.name)
}

