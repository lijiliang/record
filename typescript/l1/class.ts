class Person1 {
  name = 'benson';
  getName() {
    return this.name
  }
}

class Teacher1 extends Person1 {
  getTeacherName() {
    return 'li'
  }
  // 重写父类的方法
  getName() {
    return super.getName() + ' lee'  // 可以利用super去重新调用父类的方法
    // return 'lee'
  }
}

// const person1 = new Person1();
// console.log(person1.getName())

const teacher1 = new Teacher1();
console.log(teacher1.getName())
console.log(teacher1.getTeacherName())