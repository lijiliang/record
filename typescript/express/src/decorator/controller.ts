import router from '../router'
import { RequestHandler } from 'express'
import { Methods } from './request'
// enum Methods {
//   get = 'get',
//   post = 'post',
//   put = 'put',
//   delete = 'delete'
// }

export function controller(root: string) {
  return function (target: new (...args: any[]) => any) {
    for (let key in target.prototype) {
      // console.log(Reflect.getMetadata('path', target.prototype, key))  // 打印出元数据
      const path: string = Reflect.getMetadata('path', target.prototype, key) // 取到元数据
      const method: Methods = Reflect.getMetadata('method', target.prototype, key) // 取到元数据
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
      const handler = target.prototype[key]  // 通过key值获取方法名
      if (path && method) {
        // router.get(path, handler)  // 如果有path元数据，自动生成路由
        const fullPath = root === '/' ? path : `${root}${path}`;
        if (middleware) {
          router[method](fullPath, middleware, handler)  // 如果有中间件，自动注册中间件
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}

