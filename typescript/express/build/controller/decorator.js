"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = require("express");
exports.router = express_1.Router();
var Method;
(function (Method) {
    Method["get"] = "get";
    Method["post"] = "post";
    Method["put"] = "put";
    Method["delete"] = "delete";
})(Method || (Method = {}));
function controller(target) {
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key))  // 打印出元数据
        var path = Reflect.getMetadata('path', target.prototype, key); // 取到元数据
        var method = Reflect.getMetadata('method', target.prototype, key); // 取到元数据
        var handler = target.prototype[key]; // 通过key值获取方法名
        var middleware = Reflect.getMetadata('middleware', target.prototype, key);
        if (path && method && handler) {
            // router.get(path, handler)  // 如果有path元数据，自动生成路由
            if (middleware) {
                exports.router[method](path, middleware, handler); // 如果有中间件，自动注册中间件
            }
            else {
                exports.router[method](path, handler);
            }
        }
    }
}
exports.controller = controller;
// 中间件装饰器
function use(middleware) {
    return function (target, key) {
        Reflect.defineMetadata('middleware', middleware, target, key); // 定义元数据
    };
}
exports.use = use;
// 封装一个工厂函数去自动生成get,post等请求
function getRequestDecorator(type) {
    return function (path) {
        return function (target, key) {
            Reflect.defineMetadata('path', path, target, key);
            Reflect.defineMetadata('method', type, target, key);
        };
    };
}
exports.get = getRequestDecorator('get');
exports.post = getRequestDecorator('post');
exports.put = getRequestDecorator('put');
exports.del = getRequestDecorator('delete');
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
