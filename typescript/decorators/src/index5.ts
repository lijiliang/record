// 原型、方法名、参数所在的位置 
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex)
}


class Test4 {
  getInfo(name: string, @paramDecorator age: number) {
    console.log(name, age)
  }
}

const test4 = new Test4()
test4.getInfo('benson', 30)