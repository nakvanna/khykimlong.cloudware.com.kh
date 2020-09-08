const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const laboSchema = new Schema({
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
  doctor: {type: String, required: true},
  title: {type: String, required: true},
  labo_date: {type: Date, required: true},
  pay_status: {type: Boolean, default: false}
}, {timestamps:true});
module.exports = mongoose.model('Labo', laboSchema);
