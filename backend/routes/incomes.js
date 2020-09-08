const express = require('express');
const router = express.Router();
const Income = require('../models/income')

router.post('/', async (req, res, next) =>{
  try {
    let income = new Income(req.body);
    await income.save();
    res.json({
      status: true,
      data: income,
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
router.get('/get', async (req, res, next) => {
  try {
    await Income.find().sort('-createdAt').exec(function (err, income) {
      res.json({
        status: true,
        data: income,
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
});
router.post('/get/by-date', async (req, res, next) => {
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  try {
    await Income.find({income_date: {$gte: start_date, $lte: end_date}})
      .exec(function (err, income) {
        res.json({
          status: true,
          data: income,
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
});

module.exports = router;
