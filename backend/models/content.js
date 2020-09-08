const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogContentSchema = new Schema({
  content: {type: String, required: true},
  blog: {type: Schema.Types.ObjectID, ref: 'Blog'}
})
module.exports = mongoose.model('BlogContent', blogContentSchema)
