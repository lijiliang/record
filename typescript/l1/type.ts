// 基础类型 number,string,null,undefined,symbol,boolean,void
const count: number = 123;
const teacherName: string = 'Benson';


// 对象类型 {}，class, function, []
const teacher: {
  name: string,
  age: number
} = {
  name: 'Benson',
  age: 18
}
const numbers: number[] = [1, 2, 3]

class Person { }
const benson: Person = new Person()


const func = (str: string): number => {
  return parseInt(str, 10)
}

// 函数接收一个string类型的参数结果返回一个number类型
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10)
}

const data = new Date();

const getTotal: () => number = () => {
  return 123
}

// type annotation 类型注解,我们来告诉TS变量是什么类型
let num: number;
num = 123

// type inference 类型推断, TS 会自动的去尝试分拆亦是的类型
// 如果 TS 能够自动分析亦是类型，我们就什么也不需要做了
// 如果 TS 无法分析变量类型的话，我们就需要使用类型注解
// let conuntInference = 123

// const fristNumber = 1;
// const secondNumber = 2;
// const tot = fristNumber + secondNumber

function getTotals(fristNumber: number, secondNumber: number) {
  return fristNumber + secondNumber
}

const tots = getTotals(1, 2);

const obj = {
  name: 'b',
  age: 12
}

// 其它的 case
interface Person {
  name: string
}
const rawData = '{"name": "Benson"}';
const newData: Person = JSON.parse(rawData)

// 指temp变量有可能是number或string类型
let temp: number | string = 123;
temp = '456'