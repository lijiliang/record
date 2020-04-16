import 'reflect-metadata'
import { Router, RequestHandler } from 'express'
export const router = Router();

enum Method {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}

export function controller(target: any) {
  for (let key in target.prototype) {
    // console.log(Reflect.getMetadata('path', target.prototype, key))  // 打印出元数据
    const path = Reflect.getMetadata('path', target.prototype, key) // 取到元数据
    const method: Method = Reflect.getMetadata('method', target.prototype, key) // 取到元数据
    const handler = target.prototype[key]  // 通过key值获取方法名
    const middleware = Reflect.getMetadata('middleware', target.prototype, key)
    if (path && method && handler) {
      // router.get(path, handler)  // 如果有path元数据，自动生成路由
      if (middleware) {
        router[method](path, middleware, handler)  // 如果有中间件，自动注册中间件
      } else {
        router[method](path, handler)
      }
    }
  }
}

// 中间件装饰器
export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)  // 定义元数据
  }
}

// 封装一个工厂函数去自动生成get,post等请求
function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    }
  }
}

export const get = getRequestDecorator('get')
export const post = getRequestDecorator('post')
export const put = getRequestDecorator('put')
export const del = getRequestDecorator('delete')


// export function post(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'post', target, key);
//   }
// }

// export function get(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'get', target, key);
//   }
// }