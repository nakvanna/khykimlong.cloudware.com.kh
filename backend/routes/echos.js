const express = require('express');
const router = express.Router();
const multer = require('multer');
const Echo = require('../models/echo');

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
router.post('/', upload.single('photo'), async (req, res, next) => {
  let data = JSON.parse(req.body.data);
  data.photo = 'files/' + req.file.filename;

  try {
    let _echo = new Echo(data);
    await _echo.save();
    res.json({
      status: true,
      data: _echo,
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
// GET request - get echo
router.get('/get', async (req, res, next) => {
  try {
    await Echo.find().sort('-createdAt').populate('patient').exec(function (err, echo) {
      res.json({
        status: true,
        data: echo,
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
module.exports = router;
