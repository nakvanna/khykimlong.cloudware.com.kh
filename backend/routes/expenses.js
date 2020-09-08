const express = require('express');
const router = express.Router();
const Expense = require('../models/expense')

router.post('/', async (req, res, next) =>{
  try {
    let expense = new Expense(req.body);
    await expense.save();
    res.json({
      status: true,
      data: expense,
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
    await Expense.find().sort('-createdAt').exec(function (err, expense) {
      res.json({
        status: true,
        data: expense,
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
    await Expense.find({expense_date: {$gte: start_date, $lte: end_date}})
      .exec(function (err, expense) {
        res.json({
          status: true,
          data: expense,
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
