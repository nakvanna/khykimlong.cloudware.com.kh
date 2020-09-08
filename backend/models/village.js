const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const villageSchema = new Schema({
  name: {type:String,required:true,unique:true},
})
module.exports = mongoose.model('Village', villageSchema)
