const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const incomeTypeSchema = new Schema({
  name: {type:String,required:true, unique:true},
})
module.exports = mongoose.model('IncomeType', incomeTypeSchema)
