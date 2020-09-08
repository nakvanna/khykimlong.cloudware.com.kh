const express = require('express');
const router = express.Router();
const multer = require('multer');
const EchoBaby = require('../models/echo-baby');

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

// POST request - create a new echo
router.post('/', upload.fields([{name: 'photos', maxCount: 2}]), async (req, res, next) => {
  try {
    let data = JSON.parse(req.body.data);
    data.photo_up = 'files/' + req.files.photos[0].filename;
    data.photo_down = 'files/' + req.files.photos[1].filename;
    let echo_bby = new EchoBaby(data);
    await echo_bby.save();
    await EchoBaby.findById(echo_bby._id).populate('patient').exec(function (err, echo_babies) {
      res.json({
        status: true,
        data: echo_babies,
        message: 'Successfully fetched!'
      })
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});
router.get('/get', async (req, res, next) => {
  try {
    await EchoBaby.find().sort('-createdAt').populate('patient').exec(function (err, echo_babies) {
      res.json({
        status: true,
        data: echo_babies,
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
router.get('/:id/get', async (req, res, next) => {
  try {
    let echo_bby = await EchoBaby.findById(req.params.id).populate('patient');
    res.json({
      status: true,
      data: echo_bby,
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
