const express = require('express');
const router = express.Router();
const multer = require('multer');
const Staff = require('../models/staff');
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

// POST request - create a new staff
router.post('/', upload.single('photo'), async (req, res, next) => {
  try {
    let data = JSON.parse(req.body.data);
    data.pob_address_book = data.pob_address_book.value;
    data.current_address_book = data.current_address_book.value;
    data.photo = 'files/' + req.file.filename;
    let staff = new Staff(data);
    await staff.save();
    res.json({
      status: true,
      data: staff,
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
// PUT request - update staff
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  console.log('id');
  try {
    await Staff.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('pob_address_book').populate('current_address_book').exec(function (err, staff) {
      if (!err) {
        res.json({
          status: true,
          data: staff,
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
    await Staff.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .populate('pob_address_book').populate('current_address_book').exec(function (err, staff) {
      if (!err) {
        res.json({
          status: true,
          data: staff,
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
    await Staff.find().sort('-createdAt').populate('current_address_book').exec(function (err, staffs) {
      res.json({
        status: true,
        data: staffs,
        message: 'Successfully fetched!'
      })
    });
  } catch (e) {
    console.log(e)
    // res.json({
    //   status: false,
    //   message: e.message.split(':')[0]
    // })
  }
});
router.get('/:id/edit', async (req, res, next) => {
  try {
    let staff = await Staff.findById(req.params.id).populate('pob_address_book').populate('current_address_book');
    res.json({
      status: true,
      data: staff,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
router.get('/:id/salary', async (req, res, next) => {
  try {
    let staff = await Staff.findById(req.params.id).populate('pob_address_book').populate('current_address_book');
    res.json({
      status: true,
      data: staff,
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

