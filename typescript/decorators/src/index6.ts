// 通过装饰器去处理统一错误
const userInfo: any = undefined

function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      try {
        fn();
      } catch (e) {
        console.log(`${msg} 存在问题`)
      }
    }
  }
}

class Test5 {
  @catchError('userInfo.name')
  getName() {
    // try {
    //   return userInfo.name
    // } catch (e) {
    //   console.log('userinfo.name不存在')
    // }
    return userInfo.name
  }
  @catchError('userInfo.age')
  getAge() {
    return userInfo.age
  }
}

const test5 = new Test5();
test5.getName()
test5.getAge()
