const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stockSchema = new Schema({
  supplier: {type: Schema.Types.ObjectID, ref: 'Supplier', required: true},
  purchase_date: {type: Date, required: true},
  purchase_status: {type: String, required: true},
  amount: {type: Number, required: true},
  paid_amount: {type: Number, required: true},
  due_amount: {type: Number, required: true},
  description: {type: String, required: true},
  paid_balance: {type: Number, required: true},
  due_balance: {type: Number, required: true},

},{timestamps:true});
module.exports = mongoose.model('Stock', stockSchema)


