var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "orderList": Array,  //订单列表
  "cartList": [  // 购物车列表
    { 
      "productId": String,
      "productName": String,
      "salePrice": String,
      "productImage": String,
      "checked": String,
      "productNum": String
    }
  ],
  "addressList": [  // 地址列表
    {
      "addressId" : String, 
      "userName" : String, 
      "streetName" : String, 
      "postCode" : Number, 
      "tel" : String, 
      "isDefault" : Boolean
    }
  ]
})

module.exports = mongoose.model('User', userSchema, 'users')  // 第三个参数关联数据库的集合名字，如果不加话，就是第一个参数加's'就是集合的名字