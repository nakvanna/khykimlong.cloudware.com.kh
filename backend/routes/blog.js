const express = require('express');
const router = express.Router();
const multer = require('multer');
const Blog = require('../models/blog')
const Content = require('../models/content')
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/files');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({storage: storage});
// POST request - create a new blog
router.post('/', upload.single('thumbnail'), async (req, res, next) => {
  let data = JSON.parse(req.body.data);
  data.thumbnail = 'files/' + req.file.filename;
  data.isPublished = data.isPublish.value
  let blog = new Blog(data)
  await blog.save();
  await new Content({content: data.content, blog: blog._id}).save()
  try {
    res.json({
      status: true,
      data: blog,
      message: 'Successfully added!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// PUT request - update blog
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    if (req.body.isPublish) {
      req.body.isPublish = req.body.isPublish.value
    }
    let blog = await Blog.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: blog,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// PUT request - update blog content
router.put('/:id/update-content', async (req, res, next) => {
  let id = req.params.id;
  console.log(req.body)
  try {
    let content = await Content.findOneAndUpdate({blog: id}, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: content,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - update thumbnail blog
router.put('/:id/thumbnail', upload.single('thumbnail'), async (req, res, next) => {
  let id = req.params.id;
  try {
    req.body.thumbnail = 'files/' + req.file.filename;
    let blog = await Blog.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: blog,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get blogs
router.get('/', async (req, res, next) => {
  try {
    let blogs = await Blog.find({})
    res.json({
      status: true,
      data: blogs,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get blog by id
router.get('/:id/edit', async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id)
    res.json({
      status: true,
      data: blog,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get blog by id
router.get('/:id', async (req, res, next) => {
  try {
    let blog = await Blog.findById(req.params.id)
    res.json({
      status: true,
      data: blog,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get content by blog  id
router.get('/:id/content', async (req, res, next) => {
  try {
    let content = await Content.findOne({blog: req.params.id})
    res.json({
      status: true,
      data: content,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
module.exports = router;
