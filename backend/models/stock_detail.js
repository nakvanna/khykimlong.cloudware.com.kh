const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockDetailSchema = new Schema({
  stock: {type: Schema.Types.ObjectID, ref: 'Stock', required: true},
  product: {type: Schema.Types.ObjectID, ref: 'Product', required: true},
  qty: {type: Number, required: true},
  invent_type: {type: String, required: true},
  stock_qty: {type: Number, required: true},
  buy_price: {type: Number, default: 0, required: true},
  sale_price: {type: Number,default: 0, required: true},
  purchase_status: {type: String, required: true}
},{timestamps:true});
module.exports = mongoose.model('StockDetail', stockDetailSchema)


