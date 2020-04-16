"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./router"));
// 问题1： express 库的类型定义文件 .d.ts 文件类型描述不准确
// 问题2： 当我使用中间件的时候，对req 或者 res 做了修改之后呢，实际上类型并不能改变
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    name: 'session',
    keys: [
        'Benson'
    ],
    maxAge: 24 * 60 * 60 * 1000 // 24小时
}));
app.use(function (req, res, next) {
    req.teacherName = 'Benson';
    next();
});
app.use(router_1.default); // 加载路由
app.listen(7001, function () {
    console.log('server is runing');
});
