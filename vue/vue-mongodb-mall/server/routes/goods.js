var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods')

// 连接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall')

// 连接成功
mongoose.connection.on('connected', function(){
  console.log('Mongodb connected success')
})

// 连接失败
mongoose.connection.on('error', function(){
  console.log('Mongodb connected fail')
})

// 断开连接
mongoose.connection.on('disconnected', function(){
  console.log('Mongodb connected disconnected')
})

router.get('/', function (req, res, next) {
  // res.send('hello,good')
  // 查询商品列表数据
  Goods.find({}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router;