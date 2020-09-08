const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const echoNoteSchema = new Schema({
  patient: {type: Schema.Types.ObjectID, ref: 'Patient', required: true},
  doctor: {type: String, required: true},
  title: {type: String, required: true},
  check_date: {type: Date, required: true},
  description: {type: String},
  pay_status: {type: Boolean, default: false}
}, {timestamps: true});
module.exports = mongoose.model('EchoNote', echoNoteSchema);
