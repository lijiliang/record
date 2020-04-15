// 元数据
import 'reflect-metadata';

// const user = {
//   name: 'Benson'
// }

// Reflect.defineMetadata('data', 'test', user)

// console.log(Reflect.getMetadata('data', user))

// 定义元数据
// @Reflect.metadata('data', 'test')
class User {
  name = 'Benson';
  @Reflect.metadata('data', 'test')
  @Reflect.metadata('data1', 'test')
  getName() {

  }
}

// console.log(Reflect.getMetadata('data', User))
console.log(Reflect.getMetadata('data', User.prototype, 'name'))
console.log(Reflect.hasMetadata('data', User.prototype, 'getName'))
console.log(Reflect.getMetadataKeys(User.prototype, 'getName'))