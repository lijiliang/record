// 类的泛型

// class DataManager<T> {
//   constructor(private data: T[]) { }
//   getItem(index: number): T {
//     return this.data[index]
//   }
// }

// const data = new DataManager<string>(['1'])
// const data1 = new DataManager<number>([1])
// data.getItem(0)


/*
interface Item {
  name: string
}
class DataManager<T extends Item> {
  constructor(private data: T[]) { }
  getItem(index: number): string {
    return this.data[index].name
  }
}

const data = new DataManager([
  {
    name: 'Benson'
  }
])
*/


class DataManager<T extends number | string> {
  constructor(private data: T[]) { }
  getItem(index: number): T {
    return this.data[index]
  }
}

interface Test {
  name: string
}

const data = new DataManager<number>([])


// const func: <T>() => string = <T>() => {
//   return '123'
// }

// 如果使用泛型作为一个具体的类型注解
function hello<T>(params: T) {
  return params
}

const func: <T>(param: T) => T = hello