const express = require('express');
const router = express.Router();
const Labo_Setting = require('../models/labo-setting');

// POST request - create a new labo setting
router.post('/', async (req, res, next) => {
  try {
    let labo_setting = new Labo_Setting(req.body);
    await labo_setting.save();
    res.json({
      status: true,
      data: labo_setting,
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

// GET request - get labo setting
router.get('/get', async (req, res, next) => {
  try {
    await Labo_Setting.find().sort('createdAt').exec(function (err, labo_setting) {
      res.json({
        status: true,
        data: labo_setting,
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
// GET request - get labo setting
router.get('/:id/get', async (req, res, next) => {
  try {
    await Labo_Setting.findById(req.params.id).exec(function (err, labo_setting) {
      res.json({
        status: true,
        data: labo_setting,
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
// PUT request - update patient
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Labo_Setting.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, labo_setting) {
        if (!err) {
          res.json({
            status: true,
            data: labo_setting,
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

module.exports = router;
