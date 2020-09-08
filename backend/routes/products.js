const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/product');
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

// POST request - create a new product
router.post('/', upload.single('photo'), async (req, res, next) => {
  try {
    let data = JSON.parse(req.body.data);
    data.photo = 'files/' + req.file.filename;
    let product = new Product(data);
    await product.save();
    res.json({
      status: true,
      data: product,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
});
// PUT request - update product
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Product.findByIdAndUpdate(id, {$set: req.body}, {new: true}).exec(function (err, product) {
        if (!err) {
          res.json({
            status: true,
            data: product,
            message: 'Successfully updated!'
          })
        }
      });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
router.put('/:id/thumbnail', upload.single('photo'), async (req, res, next) => {
  let id = req.params.id;
  try {
    req.body.photo = 'files/' + req.file.filename;
    await Product.findByIdAndUpdate(id, {$set: req.body}, {new: true}).exec(function (err, product) {
        if (!err) {
          res.json({
            status: true,
            data: product,
            message: 'Successfully updated!'
          })
        }
      });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get address books
router.get('/get', async (req, res, next) => {
  try {
    await Product.find().sort('-createdAt').exec(function (err, product) {
      res.json({
        status: true,
        data: product,
        message: 'Successfully fetched!'
      })
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
router.get('/:id/edit', async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    res.json({
      status: true,
      data: product,
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
