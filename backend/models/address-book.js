const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressBookSchema = new Schema({
  province: {type:String,required:true},
  district: {type:String,required:true},
  commune: {type:String,required:true},
  village: {type:String,required:true},
})
module.exports = mongoose.model('AddressBook', addressBookSchema)
