const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const saleSchema = new Schema({
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
  examine: {type: Schema.Types.ObjectID, ref: 'Examine'},
  user_cashier: {type: Schema.Types.ObjectID, ref: 'User'}, //For cashier
  user_admin: {type: Schema.Types.ObjectID, ref: 'User'}, //For admin & doctor
  sale_date: {type: Date, required: true},
  sale_status: {type: String, required: true},
  amount: {type: Number, required: true},
  paid_amount: {type: Number, required: true},
  due_amount: {type: Number, required: true},
  description: {type: String, required: true},
  paid_balance: {type: Number, required: true},
  due_balance: {type: Number, required: true},
},{timestamps:true});
module.exports = mongoose.model('Sale', saleSchema)


