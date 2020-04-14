interface Bird {
  fly: boolean;
  sing: () => {}
}

interface Dog {
  fly: boolean;
  bark: () => {}
}

function trainAnial(animal: Bird | Dog) {
  if (animal.fly) {
    // 类型断言
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark()
  }
}

// in 语法来做类型保护
function trainAnialSecond(animal: Bird | Dog) {
  // 类型保护
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}

// typeof 语法来做类型保护
function add(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string') {
    return `${first}${second}`
  }
  return first + second
}

// 使用 instanceof 语法来做类型保护
class NumberObj {
  count: number
}
function addSecond(first: object | NumberObj, second: object | NumberObj) {
  if (first instanceof NumberObj && second instanceof NumberObj) {
    return first.count + second.count
  }
  return 0;
}