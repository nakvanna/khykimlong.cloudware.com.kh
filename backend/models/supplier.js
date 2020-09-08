const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const supplierSchema = new Schema({
  name: {type: String, required: true, unique: true},
  company: {type: String, required: true},
  contact: {type: String, required: true},
  description: {type: String, required: true},
  current_address_book: {type: Schema.Types.ObjectID, ref: 'AddressBook', required: true},
},{timestamps:true});
module.exports = mongoose.model('Supplier', supplierSchema)

