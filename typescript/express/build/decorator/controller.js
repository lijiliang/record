"use strict";
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
            var middleware = Reflect.getMetadata('middleware', target.prototype, key);
            var handler = target.prototype[key]; // 通过key值获取方法名
            if (path && method) {
                // router.get(path, handler)  // 如果有path元数据，自动生成路由
                var fullPath = root === '/' ? path : "" + root + path;
                if (middleware) {
                    router_1.default[method](fullPath, middleware, handler); // 如果有中间件，自动注册中间件
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
