const express = require('express');
const router = express.Router();
const Echo_Setting = require('../models/echo-setting');

// POST request - create a new labo setting
router.post('/', async (req, res, next) => {
  try {
    let echo_setting = new Echo_Setting(req.body);
    await echo_setting.save();
    res.json({
      status: true,
      data: echo_setting,
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
    await Echo_Setting.find().sort('-createdAt').exec(function (err, echo_setting) {
      res.json({
        status: true,
        data: echo_setting,
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
    let staff = await Echo_Setting.findById(req.params.id);
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
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    let blog = await Echo_Setting.findByIdAndUpdate(id, {$set: req.body}, {new: true});
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
module.exports = router;
