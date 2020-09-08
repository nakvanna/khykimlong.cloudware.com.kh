const express = require('express');
const router = express.Router();
const IncomeType = require('../models/income-type')

router.post('/', async (req, res, next) =>{
  try {
    let income_type = new IncomeType(req.body);
    await income_type.save();
    res.json({
      status: true,
      data: income_type,
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
    await IncomeType.find().exec(function (err, income_type) {
      res.json({
        status: true,
        data: income_type,
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
