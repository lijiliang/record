// 泛型 generic 泛指的类型

// function join<T>(first: T, second: T) {
function join<T, P>(first: T, second: P) {
  return `${first}${second}`
}

// join('1', 1)
// join<string>('1', '1')
join<string, string>('1', '1')
join<number, number>(1, 1)
join(1, '1')


function anotherJoin<T>(first: T, second: T): T {
  return first
}

// T[]  与 Array<T> 等同
// function map<T>(params: T[]) {
function map<T>(params: Array<T>) {
  return params;
}
map<string>(['123'])