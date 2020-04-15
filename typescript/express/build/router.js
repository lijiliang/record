"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var dellAnalyzer_1 = __importDefault(require("./utils/dellAnalyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        res.send("\n      <html>\n        <body>\n          <a href=\"/logout\">\u9000\u51FA</a>\n          <a href=\"/getData\">\u722C\u53D6\u5185\u5BB9</a>\n          <a href=\"/showData\">\u5C55\u793A\u5185\u5BB9</a>\n        </body>\n      </html>\n      ");
    }
    else {
        res.send("\n    <html>\n      <body>\n        <form method=\"post\" action=\"/login\">\n          <input type=\"password\" name=\"password\" />\n          <button>\u63D0\u4EA4</button>\n        </form>\n      </body>\n    </html>\n  ");
    }
});
router.get('/logout', function (req, res) {
    // const isLogin = req.session ? req.session.login : undefined
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect('/');
});
router.post('/login', function (req, res) {
    // if (password === '123') {
    //   const secret = 'secretKey';
    //   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    //   const analyzer = DellAnalyzer.getInstance();
    //   new Crowller(url, analyzer);
    //   res.send('getDate Success')
    // } else {
    //   res.send(`${req.teacherName} password Error!`)
    // }
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : undefined;
    // 已经登录过了
    if (isLogin) {
        res.send('已经登录过');
    }
    else {
        if (password === '123' && req.session) {
            req.session.login = true;
            res.send('登录成功');
        }
        else {
            res.send('登录失败');
        }
    }
});
router.get('/getData', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        var secret = 'secretKey';
        var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
        var analyzer = dellAnalyzer_1.default.getInstance();
        new crowller_1.default(url, analyzer);
        res.send('getDate Success');
    }
    else {
        res.send("\u8BF7\u767B\u5F55\u540E\u722C\u53D6\u5185\u5BB9");
    }
});
router.get('/showData', function (req, res) {
    var isLogin = req.session ? req.session.login : undefined;
    if (isLogin) {
        try {
            var position = path_1.default.resolve(__dirname, '../data/course.json');
            var result = fs_1.default.readFileSync(position, 'utf8');
            res.json(JSON.parse(result));
        }
        catch (e) {
            res.send('尚未爬取到内容');
        }
    }
    else {
        res.send('请登录后查看内容');
    }
});
exports.default = router;
