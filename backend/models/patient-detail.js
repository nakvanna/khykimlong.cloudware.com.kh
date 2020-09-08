const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const patientDetailSchema = new Schema({
  diagnosis: {type: String, required: true},
  ta: {type: String, required: true},
  t: {type: String, required: true},
  spo: {type: String, required: true},
  poules: {type: String, required: true},
  note: {type: String, required: true},
  date: {type: Date, required: true},
  ordenance: {type: String, default: ''},
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
}, {timestamps: true});
module.exports = mongoose.model('PatientDetail', patientDetailSchema)

