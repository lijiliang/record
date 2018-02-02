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
  let sort = parseInt(req.param('sort'));
  let page = parseInt(req.param('page'));
  let pageSize = parseInt(req.param('pageSize'));
  let skip = (page - 1) * pageSize;
  var params = {}
  let priceLevel = req.param('priceLevel')
  let priceGt = ''
  let priceLte = ''
  // 根据价格进行处理 - 根据条件查询
  if (priceLevel != 'all'){
    switch (priceLevel){
      case '0':priceGt = 0;priceLte=100;break;
      case '1':priceGt = 100;priceLte=500;break;
      case '2':priceGt = 500;priceLte=1000;break;
      case '3':priceGt = 1000;priceLte=5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
    }
    }
  }
  // 查询商品列表数据
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);  // 分页
  goodsModel.sort({'salePrice': sort})  // 对数据进行排序 1为升序，-1为降序
  goodsModel.exec(function(err, doc){
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