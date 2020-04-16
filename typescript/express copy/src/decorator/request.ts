import 'reflect-metadata'

export enum Methods {
  get = 'get',
  post = 'post',
  put = 'put',
  delete = 'delete'
}

// 封装一个工厂函数去自动生成get,post等请求
function getRequestDecorator(type: Methods) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    }
  }
}

export const get = getRequestDecorator(Methods.get)
export const post = getRequestDecorator(Methods.post)
export const put = getRequestDecorator(Methods.put)
export const del = getRequestDecorator(Methods.delete)