const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const doctorSchema = new Schema({
  doctor: {type:String,required:true, unique:true},
})
module.exports = mongoose.model('Doctor', doctorSchema)
