const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const blogSchema = new Schema({
  title: {type: String, required: true},
  slug: { type: String, slug: "title" },
  thumbnail: {type: String, required: true},
  hostname: {type: String, required: true},
  category: {type: String, required: true},
  description: {type: String, required: true},
  tags: {type: [String], required: true},
  auth: {type: String, required: true},
  isPublish: {type: Boolean, default: false, required: true},
  views: {type: Number, default: true},
}, {timestamps: true})
module.exports = mongoose.model('Blog', blogSchema)
