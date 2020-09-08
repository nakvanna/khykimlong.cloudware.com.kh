const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salarySchema = new Schema({
  salary: {type: Number, required: true},
  pay_date: {type: Date, required: true},
  description: {type: String, required: true},
  staff: {type: Schema.Types.ObjectID, ref: 'Staff', required: true},
},{timestamps:true});
module.exports = mongoose.model('Salary', salarySchema)
