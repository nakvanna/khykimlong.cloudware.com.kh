const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const payBackSchema = new Schema({
  pay_back: {type: Number, required: true},
  pay_date: {type: Date, required: true},
  description: {type: String, required: true},
  stock: {type: Schema.Types.ObjectID, ref: 'Stock', required: true},
},{timestamps:true});
module.exports = mongoose.model('PayBack', payBackSchema)

