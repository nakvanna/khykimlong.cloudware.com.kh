const express = require('express');
const router = express.Router();
const UnitType = require('../models/unit-type')

router.post('/', async (req, res, next) =>{
  try {
    let unit_type = new UnitType(req.body);
    await unit_type.save();
    res.json({
      status: true,
      data: unit_type,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
});
router.get('/get', async (req, res, next) => {
  try {
    await UnitType.find().exec(function (err, unit_type) {
      res.json({
        status: true,
        data: unit_type,
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
