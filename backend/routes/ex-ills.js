const express = require('express');
const router = express.Router();
const ExIll = require('../models/ex-ill')

router.post('/', async (req, res, next) => {
  try {
    let ex_ill = new ExIll(req.body);
    await ex_ill.save();
    res.json({
      status: true,
      data: ex_ill,
      message: 'Successfully saved!'
    });
    console.log(ex_ill)
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
    await ExIll.find().sort('-createdAt').exec(function (err, ex_ill) {
      res.json({
        status: true,
        data: ex_ill,
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
