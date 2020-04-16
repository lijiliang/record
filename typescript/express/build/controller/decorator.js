"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = require("express");
exports.router = express_1.Router();
function controller(target) {
    for (var key in target.prototype) {
        // console.log(Reflect.getMetadata('path', target.prototype, key))  // 打印出元数据
        var path = Reflect.getMetadata('path', target.prototype, key); // 取到元数据
        var handler = target.prototype[key]; // 通过key值获取方法名
        if (path) {
            exports.router.get(path, handler); // 如果有path元数据，自动生成路由
        }
    }
}
exports.controller = controller;
function get(path) {
    return function (target, key) {
        Reflect.defineMetadata('path', path, target, key);
    };
}
exports.get = get;
