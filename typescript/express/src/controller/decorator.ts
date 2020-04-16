import 'reflect-metadata'
import { Router } from 'express'
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
    if (path && method && handler) {
      // router.get(path, handler)  // 如果有path元数据，自动生成路由
      router[method](path, handler)
    }
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