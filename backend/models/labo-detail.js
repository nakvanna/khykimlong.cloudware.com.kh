const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const laboDetailSchema = new Schema({
  labo: {type: Schema.Types.ObjectID, ref: 'Labo', required: true},
  type: {type: String, required: true},
  name: {type: String, required: true},
  value: {type: String},
  superscript: {type: Number},
  unit: {type: String},
  min: {type: Number},
  max: {type: Number},
  result: {type: String}
}, {timestamps:true});
module.exports = mongoose.model('LaboDetail', laboDetailSchema);
