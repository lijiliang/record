var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [
    {
      "productId": String,
      "productName": String,
      "salePrice": String,
      "productImage": String,
      "checked": String,
      "productNum": String
    }
  ],
  "addressList": Array
})

module.exports = mongoose.model('User', userSchema, 'users')  // 第三个参数关联数据库的集合名字，如果不加话，就是第一个参数加's'就是集合的名字