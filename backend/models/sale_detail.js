const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saleDetailSchema = new Schema({
  sale: {type: Schema.Types.ObjectID, ref: 'Sale', required: true},
  product: {type: Schema.Types.ObjectID, ref: 'Product', required: true},
  sale_qty: {type: Number, required: true},
  invent_type: {type: String, required: true},
  buy_price: {type: Number, required: true},
  sale_price: {type: Number, required: true},
  stock_detail_id: {type: Schema.Types.ObjectID, ref: 'StockDetail', required: true},
  sale_status: {type: String, required: true},
},{timestamps:true});
module.exports = mongoose.model('SaleDetail', saleDetailSchema)


