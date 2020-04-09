// 数组
const numberArr: number[] = [1, 2, 3]
const arr: (number | string)[] = [1, '2', 3]
const stringArr: string[] = ['a', 'b']
const undefinedArr: undefined[] = [undefined, undefined]

// 类型别名 type alias
type User = { name: string, age: number }
const objectArr: User[] = [{
  name: 'adf',
  age: 28
}]


class Teacher {
  name: string;
  age: number
}
const objArr: Teacher[] = [
  new Teacher(),
  {
    name: 'benson',
    age: 28
  }
]


// 元组 tuple
const teacherInfo: [string, string, number] = ['li', 'male', 18]

// csv
// [
//   ['li', 'male', 18],
//   ['dell', 'female', 18],
// ]
// dell, male, 18
// sun, female, 26
// jeny, female, 38
const teacherList: [string, string, number][] = [
  ['li', 'male', 18],
  ['dell', 'female', 18],
]