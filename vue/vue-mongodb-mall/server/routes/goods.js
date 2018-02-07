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

// 查询商品列表
router.get('/list', function (req, res, next) {
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
});

// 加入购物车
// 整体逻辑：拿用户信息表里面的数据，判断数据是否已经在购物车列表。如果数据存在，就数据进行数量自增操作，否则就添加一条数据
router.post('/addCart', function(req, res, next) {
  var userId = req.cookies.userId;   // 默认登录用户id
  var productId = req.body.productId;  // 商品Id
  var User = require('../models/user')
  
  // 拿用户信息
  User.findOne({userId: userId}, function(err, userDoc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    }else {
      // console.log('userDoc', userDoc)
      if(userDoc){
        let goodsItem = ''
        userDoc.cartList.forEach(function(item){
          if(item.productId == productId){
            goodsItem = item;
            item.productNum++;  // 数量自增
          }
        })
        if(goodsItem){
          // 如果数据已经存在数据库，只需要更新就好了
          userDoc.save(function(err2, doc2){
            if(err2){
              res.json({
                status: '1',
                msg: err2.message
              })
            }else{
              // 添加数据成功
              res.json({
                status: '0',
                msg: '',
                result: 'success'
              })
            }
          })
        }else{
          //根据商品Id取到商品信息
          Goods.findOne({productId: productId}, function(err1, productDoc){
            if(err1){
              res.json({
                status: '1',
                msg: err1.message
              })
            }else{
              if(productDoc){
                var _doc = JSON.stringify(productDoc)
                var _productjson = JSON.parse(_doc)
                _productjson.productNum = 1;
                _productjson.checked = 1;
                // 将商品信息加到用户下
                userDoc.cartList.push(_productjson);
                userDoc.save(function(err2, doc2){
                  if(err2){
                    res.json({
                      status: '1',
                      msg: err2.message
                    })
                  }else{
                    // 添加数据成功
                    res.json({
                      status: '0',
                      msg: '',
                      result: 'success'
                    })
                  }
                })
              }
            }
          })
        }
      }
    }
  })
});

module.exports = router;