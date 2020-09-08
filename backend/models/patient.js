const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientSchema = new Schema({
  kh_name: {type: String, required: true},
  lt_name: {type: String, required: true},
  photo: {type: String,default:'1vYbtjc/logo.png',required:true},
  hostname: {type: String,default:'https://i.ibb.co/',required:true},
  gender: {type: String, required: true},
  // dob: {type: Date, required: true},
  age: {type: String, required: true},
  phone: {type: String, required: true, unique: true},
  current_address_book: {type: Schema.Types.ObjectID, ref: 'AddressBook', required: true},
},{timestamps:true});
module.exports = mongoose.model('Patient', patientSchema)

