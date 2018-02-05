var express = require('express');
var router = express.Router();
var User = require('./../models/user')

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

module.exports = router;
