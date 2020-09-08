const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const echoBabySchema = new Schema({
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
  doctor: {type: String, required: true},
  type: {type: String, required: true},
  bby_num: {type: Number, required: true},
  bby_gender: {type: Array, required: true},
  place_placenta: {type: String, required: true},
  bby_status: {type: String, required: true},
  status_waterfall: {type: String, required: true},
  bby_healthy: {type: String, required: true},
  bby_heartrate: {type: String, required: true},
  bby_activity: {type: String, required: true},
  bby_skull: {type: Number, required: true},
  bby_thigh_bone: {type: Number, required: true},
  bby_weight: {type: Number, required: true},
  bby_age: {type: String, required: true},
  bby_birth: {type: String, required: true},
  check_date: {type: String, required: true},
  photo_up: {type: String,default:'1vYbtjc/logo.png',required:true},
  photo_down: {type: String,default:'1vYbtjc/logo.png',required:true},
}, {timestamps:true});
module.exports = mongoose.model('EchoBaby', echoBabySchema);
