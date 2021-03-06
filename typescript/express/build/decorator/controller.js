"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("../router"));
// enum Methods {
//   get = 'get',
//   post = 'post',
//   put = 'put',
//   delete = 'delete'
// }
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            // console.log(Reflect.getMetadata('path', target.prototype, key))  // 打印出元数据
            var path = Reflect.getMetadata('path', target.prototype, key); // 取到元数据
            var method = Reflect.getMetadata('method', target.prototype, key); // 取到元数据
            // const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
            var middlewares = Reflect.getMetadata('middlewares', target.prototype, key); // 多个middleware
            var handler = target.prototype[key]; // 通过key值获取方法名
            if (path && method) {
                // router.get(path, handler)  // 如果有path元数据，自动生成路由
                var fullPath = root === '/' ? path : "" + root + path;
                if (middlewares && middlewares.length) {
                    router_1.default[method].apply(router_1.default, __spreadArrays([fullPath], middlewares, [handler])); // 如果有中间件，自动注册中间件
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
