const express = require('express');
const router = express.Router();
const Salary = require('../models/salary');

router.post('/', async (req, res, next)=>{
  console.log(req.body);
  try {
    let salary = new Salary(req.body);
    await salary.save();
    res.json({
      status: true,
      data: salary,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});

router.get('/:id/get', async (req, res, next)=>{
  let staff_id = req.params.id;
  try {
    await Salary.find({staff: staff_id}).sort('-createdAt').populate('staff').exec(function (err, salary) {
      res.json({
        status: true,
        data: salary,
        message: 'Successfully fetched!'
      })
    });
  }catch (e) {
    res.json({
      status: false,
      message: e.message
    })
  }
});
router.post('/get/by-date', async (req, res, next) => {
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  try {
    await Salary.find({pay_date: {$gte: start_date, $lte: end_date}})
      .populate('staff', 'lname fname')
      .exec(function (err, salary) {
        res.json({
          status: true,
          data: salary,
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
