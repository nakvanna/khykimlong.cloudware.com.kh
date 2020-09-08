const express = require('express');
const router = express.Router();
const PatientDetail = require('../models/patient-detail');

// POST request - create a new patient
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    let patient = new PatientDetail(req.body);
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
    await PatientDetail.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('current_address_book')
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
// GET request - get address books
router.get('/get', async (req, res, next) => {
  try {
    await PatientDetail.find().sort('-createdAt').populate('current_address_book').exec(function (err, patient) {
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
//Get by Patient
router.get('/:id/get', async (req, res, next) => {
  try {
    let patient = await PatientDetail.find({patient: req.params.id}).sort('-createdAt');
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

