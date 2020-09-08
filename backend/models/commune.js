const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const communeSchema = new Schema({
  name: {type:String,required:true,unique:true},
})
module.exports = mongoose.model('Commune', communeSchema)
