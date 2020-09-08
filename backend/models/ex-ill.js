const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const exIllSchema = new Schema({
  ex_ill: {type: String, required: true, unique: true},
})
module.exports = mongoose.model('ExIll', exIllSchema)
