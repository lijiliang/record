"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// 中间件装饰器
function use(middleware) {
    return function (target, key) {
        var originMiddlewares = Reflect.getMetadata('middlewares', target, key) || [];
        originMiddlewares.push(middleware);
        Reflect.defineMetadata('middlewares', originMiddlewares, target, key); // 定义元数据
    };
}
exports.use = use;
