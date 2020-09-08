const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const staffSchema = new Schema({
  fname: {type: String, required: true},
  lname: {type: String, required: true},
  flatin: {type: String, required: true},
  llatin: {type: String, required: true},
  photo: {type: String,default:'1vYbtjc/logo.png',required:true},
  hostname: {type: String,default:'https://i.ibb.co/',required:true},
  gender: {type: String, required: true},
  dob: {type: String, required: true},
  national_id: {type: String, required: true},
  bank_account_no: {type: String, required: true},
  bank_name: {type: String, required: true},
  email: {type: String, required: true},
  tel: {type: String, required: true},
  telegram: {type: String, required: true},
  facebook: {type: String, required: true},
  pob_address_book: {type: Schema.Types.ObjectID, ref: 'AddressBook', required: true},
  current_address_book: {type: Schema.Types.ObjectID, ref: 'AddressBook', required: true},
},{timestamps:true});
module.exports = mongoose.model('Staff', staffSchema)

