var express = require('express');
var router = express.Router();
var User = require('./../models/user')
require('./../util/util')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登录接口
router.post('/login', function(req, res, next){
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  
  // 查询用户是否在数据库中
  User.findOne(param, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message
      })
    }else{
      if(doc){
        // 存cookie
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        // 存session
        // req.session.user = doc;

        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName
          }
        })
      }else{
        res.json({
          status: '1',
          msg: '帐号及密码错误',
        })
      }
    }
  })
})

// 注册
router.post("/registe", function (req,res,next) {
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  // 先检测用户是否已经被注册
  User.findOne({userName: param.userName}, function(err1, doc1){
    if(err1){
      res.json({
        status: "1",
        msg: err2.message,
        result: ''
      })
    }else{
      if(doc1){
        res.json({
          status: "10009",
          msg: '用户已被注册',
          result: ''
        })
      }else{
        User.find({}, function(err, findAll){
          if(err){
            res.json({
              status: "1",
              msg: err.message,
              result: ''
            })
          }else{ 
            // 添加用户
            var _userId = {
              userId: parseInt(findAll[findAll.length - 1].userId) + 1
            }
            var userObj = Object.assign({},param, _userId )
            var addUser = new User(userObj)
            addUser.save(function(err2, doc2){
              if(err1){
                res.json({
                  status: "1",
                  msg: err2.message,
                  result: ''
                })
              }else{
                res.json({
                  status: '0',
                  msg: '',
                  result: {
                    userName: doc2.userName
                  }
                })
              }
            })
          }
        })
      }
    }
  })
  
});

// 登出
router.post('/logout', function(req, res, next){
  // 设置cookie过期
  res.cookie('userId', "", {
    path: '/',
    maxAge: -1
  })
  res.cookie("userName", '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 验证是否登录
router.get('/checkLogin', function(req, res, next){
  if(req.cookies.userId){
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    })
  }else{
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 查询当前用户的购物车列表
router.get('/cartList', function(req, res, next){
  let userId = req.cookies.userId
  User.findOne({userId: userId}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
    }
  })
})

// 购物车删除
router.post('/cartDel', function(req, res, next){
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  User.update({userId:userId},  {$pull: {'cartList': {'productId': productId}}}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result: 'success'
      })
    }
  })
})

// 修改购物车数据
router.post('/cartEdit', function(req, res, next){
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  let productNum = req.body.productNum;
  let checked = req.body.checked;
  // mongodb单独更新某条数据
  User.update({userId: userId, "cartList.productId": productId}, {
    "cartList.$.productNum": productNum,
    "cartList.$.checked": checked
  }, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{ 
      res.json({
        status: '0',
        mgs: '',
        result: 'success'
      })
    }
  })
})

// 购物车全部选中或取消
router.post('/editCheckAll', function(req, res, next){
  let userId = req.cookies.userId;
  let checkAll = req.body.checkAll ? '1' : '0';
  User.findOne({userId: userId}, function(err, userDoc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(userDoc){
        userDoc.cartList.forEach(function(item){
          item.checked = checkAll
        })
        userDoc.save(function(err1, savedoc){
          if(err1){
            res.json({
              status: '1',
              msg: err1.message,
              result: ''
            })
          }else{
            res.json({
              status: '0',
              mgs: '',
              result: 'success'
            })
          }
        })
      }
    }
  })
})

// 获取地址列表
router.get('/addressList', function(req, res, next){
  let userId = req.cookies.userId
  User.findOne({userId: userId}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({
          status: '0',
          msg: '',
          result: doc.addressList
        })
      }
    }
  })
})

// 设置默认地址
router.post('/addressSetDefault', function(req, res, next){
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  if(!addressId){
    res.json({
      status: '10003',
      msg: 'addressId is null',
      result: ''
    })
  }else{
    User.findOne({userId: userId}, function(err, doc){
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        let addressList = doc.addressList
        addressList.forEach((item) => {
          if(item.addressId == addressId){
            item.isDefault = true
          }else{
            item.isDefault = false
          }
        })
        doc.save(function(err1, doc1){
          if(err){
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          }else{
            res.json({
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    })
  }
})

// 删除地址
router.post('/delAddress', function(req, res, next){
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  User.update({userId: userId}, {$pull: {addressList: {'addressId': addressId}}}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      res.json({
        status: '0',
        msg: '',
        result: 'suc'
      })
    }
  })
})

// 添加地址
router.post('/addAddress', function(req, res, next){
  let userId = req.cookies.userId;
  let userName = req.body.userName;
  let streetName = req.body.streetName;
  let postCode = req.body.postCode;
  let tel = req.body.tel;
  let isDefault = req.body.isDefault;

  User.findOne({userId:userId}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      let addressId = '1000001'
      let addressList = doc.addressList
      if(addressList.length >= 1){
        addressId = (parseInt(addressList[addressList.length - 1].addressId) + 1) + ''
      }
      
      let addressItem = {
        addressId: addressId,
        userName: userName,
        streetName: streetName,
        postCode: postCode,
        tel: tel,
        isDefault: isDefault
      }
      if(addressItem.isDefault){
        addressList.forEach(item=>{
          item.isDefault = false
        })
      }
      addressList.push(addressItem)
      doc.save(function(err1, doc1){
        if(err1){
          res.json({
            status: '1',
            msg: err1.message,
            result: ''
          })
        }else{
          res.json({
            status: '0',
            msg: '',
            result: 'success'
          })
        }
      })
    }
  })

})

// 提交订单
router.post('/payMent', function(req, res, next){
  let userId = req.cookies.userId
  let addressId = req.body.addressId
  let orderTotal = req.body.orderTotal
  // 拿到用户信息 -> 获取用户订单列表 -> 获取配送地址列表 -> 创建订单号 -> 创建订单时间 -> 拼接数据push
  User.findOne({userId: userId}, function(err, doc){
    if(err){
      res.json({
        status: '1',
        msg: err.messgae,
        result: ''
      })
    }else{
      let address = {}
      let goodsList = []
      // 获取当前用户的地址信息
      doc.addressList.forEach((item)=>{
        if(addressId==item.addressId){
          address = item
        }
      })

      // 获取用户购物车的商品
      doc.cartList.forEach((item)=>{
        if(item.checked == '1'){
          goodsList.push(item)
        }
      })

      let platform = '866'  // 平台信息
      let r1 = Math.floor(Math.random()*10)
      let r2 = Math.floor(Math.random()*10)

      let sysDate = new Date().Format('yyyyMMddhhmmss')
      let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
      var orderId = platform+r1+sysDate+r2; // 订单号
      // 拼接数据
      let order = {
        orderId: orderId,
        orderTotal: orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate: createDate
      }

      doc.orderList.push(order)

      // 保存
      doc.save(function(err1, doc1){
        if(err){
          res.json({
            status: '1',
            msg: err.messgae,
            result: ''
          })
        }else{
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: order.orderId,
              orderTotal: order.orderTotal
            }
          })
        }
      })

    }
  })
})

// 根据订单id查询订单信息
router.get('/orderDetail', function(req, res, next){
  let userId = req.cookies.userId;
  let orderId = req.param('orderId')
  User.findOne({userId:userId}, function(err, userInfo){
    if(err){
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      let orderList = userInfo.orderList
      if(orderList.length > 0){
        var orderTotal = 0
        orderList.forEach((item) => {
          if(item.orderId == orderId){
            orderTotal = item.orderTotal
          }
        })
        if(orderTotal > 0){
          res.json({
            status: '0',
            msg: '',
            result: {
              orderId: orderId,
              orderTotal: orderTotal
            }
          })
        }else{
          res.json({
            status: '12002',
            msg: '无此订单',
            result: ''
          })
        }
      }else{
        res.json({
          status: '12001',
          msg: '无此订单',
          result: ''
        })
      }
    }
  })
})

// 查询购物车商品数量
router.get('/getCartCount', function(req, res, next){
  if(req.cookies && req.cookies.userId){
    var userId = req.cookies.userId
    User.findOne({userId: userId}, function(err, doc){
      if(err){
        res.json({
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        let cartList = doc.cartList
        let cartCount = 0
        cartList.map(function(item){
          cartCount += parseInt(item.productNum)
        })
        res.json({
          status: '0',
          msg: '',
          result: cartCount
        })
      }
    })
  }
})
module.exports = router;
       