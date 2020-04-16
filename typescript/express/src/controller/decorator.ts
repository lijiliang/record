import 'reflect-metadata'
import { Router } from 'express'
export const router = Router();

export function controller(target: any) {
  for (let key in target.prototype) {
    // console.log(Reflect.getMetadata('path', target.prototype, key))  // 打印出元数据
    const path = Reflect.getMetadata('path', target.prototype, key) // 取到元数据
    const handler = target.prototype[key]  // 通过key值获取方法名
    if (path) {
      router.get(path, handler)  // 如果有path元数据，自动生成路由
    }
  }
}

export function get(path: string) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('path', path, target, key);
  }
}