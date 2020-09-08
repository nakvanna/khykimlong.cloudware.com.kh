const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  expense: {type: String, required: true},
  description: {type: String, required: true},
  expense_type: {type: String, required: true},
  expense_date: {type: Date, required: true},
})
module.exports = mongoose.model('Expense', expenseSchema)
