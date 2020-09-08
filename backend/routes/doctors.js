const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor')

router.post('/', async (req, res, next) =>{
  console.log(req.body)
  try {
    let doctor = new Doctor(req.body);
    await doctor.save();
    res.json({
      status: true,
      data: doctor,
      message: 'Successfully saved!'
    });
    console.log(doctor)
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
});
router.get('/', async (req, res, next) => {
  try {
    await Doctor.find().sort('-createdAt').exec(function (err, doctor) {
      res.json({
        status: true,
        data: doctor,
        message: 'Successfully fetched!'
      })
    });
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
})

module.exports = router;
