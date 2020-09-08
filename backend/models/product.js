const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
  name: {type: String, required: true, unique: true},
  type: {type: String, required: true},
  unit: {type: String, required: true},
  stock_alert: {type: Number},
  photo: {type: String,default:'1vYbtjc/logo.png',required:true},
  hostname: {type: String,default:'https://i.ibb.co/',required:true},
  buy_price: {type: Number, required: true},
  sale_price: {type: Number, required: true},
  invent_type: {type: String, required: true},
  description: {type: String, required: true},
},{timestamps:true});
module.exports = mongoose.model('Product', productSchema)

