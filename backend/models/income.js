const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const incomeSchema = new Schema({
  income: {type: String, required: true},
  description: {type: String, required: true},
  income_type: {type: String, required: true},
  income_date: {type: Date, required: true},
})
module.exports = mongoose.model('Income', incomeSchema)
