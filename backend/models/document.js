const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  auth: {type: String, required: true},
  isPublished: {type: Boolean, default: false, required: true},
  content: {type: String},
  views: {type: Number, default: true},
}, {timestamps: true})
module.exports = mongoose.model('Document', blogSchema)
