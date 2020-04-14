"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var dellAnalyzer_1 = __importDefault(require("./dellAnalyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('hello word');
});
router.get('/getData', function (req, res) {
    var secret = 'secretKey';
    var url = "http://www.dell-lee.com/typescript/demo.html?secret=" + secret;
    var analyzer = dellAnalyzer_1.default.getInstance();
    new crowller_1.default(url, analyzer);
    res.send('getDate Success');
});
exports.default = router;
