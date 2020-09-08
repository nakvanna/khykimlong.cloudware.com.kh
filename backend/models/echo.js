const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const echoSchema = new Schema({
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
  doctor: {type: String, required: true},
  title: {type: String, required: true},
  type: {type: String, required: true},
  photo: {type: String,default:'1vYbtjc/logo.png',required:true},
  content: {type: String, required: true}
}, {timestamps:true});
module.exports = mongoose.model('Echo', echoSchema);
