const express = require('express');
const router = express.Router();
const multer = require('multer');
const Patient = require('../models/patient');
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

// POST request - create a new patient
router.post('/', upload.single('photo'), async (req, res, next) => {
  try {
    let data = JSON.parse(req.body.data);
    data.current_address_book = data.current_address_book.value;
    data.photo = 'files/' + req.file.filename;
    let patient = new Patient(data);
    await patient.save();
    res.json({
      status: true,
      data: patient,
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
// PUT request - update patient
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Patient.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('current_address_book')
      .exec(function (err, patient) {
      if (!err) {
        res.json({
          status: true,
          data: patient,
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
    await Patient.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .populate('current_address_book').exec(function (err, patient) {
      if (!err) {
        res.json({
          status: true,
          data: patient,
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
    await Patient.find().sort('-createdAt').populate('current_address_book').exec(function (err, patient) {
      res.json({
        status: true,
        data: patient,
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
    let patient = await Patient.findById(req.params.id).populate('current_address_book');
    res.json({
      status: true,
      data: patient,
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

