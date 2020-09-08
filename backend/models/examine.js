const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const examineSchema = new Schema({
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
  room: {type: Schema.Types.ObjectID, ref: 'Room', required: true},
  exa_date: {type:Date,required:true},
  exit_date: {type: Date},
  reason: {type:String,required:true},
  his_reaction: {type:String,required:false},
  his_ill: {type:String,required:true},
  ex_ill: {type:Array,required:false},
  gen_status: {type:String,required:true},
  heat: {type:String,required:true},
  blood_pressure: {type:String,required:true},
  pulse: {type:String,required:true},
  spo: {type:String,required:true},
  weight: {type:String,required:true},
  signal_ill: {type:String,required:true},
  mark_ill: {type:String,required:true},
  diagnose_in: {type:String,required:true},
  check_at: {type:String,required:true},
  diagnose_out: {type:String,required:true},
  is_stay: {type:Boolean, required:true},
},{timestamps:true})
module.exports = mongoose.model('Examine', examineSchema)
