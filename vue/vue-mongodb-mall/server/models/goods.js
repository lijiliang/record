// 数据模型
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
  "productId" : {type: String}, 
  "productName" : String, 
  "salePrice" : Number, 
  "productImage" : String, 
  "productUrl" : String
});

module.exports = mongoose.model('Good', produtSchema)