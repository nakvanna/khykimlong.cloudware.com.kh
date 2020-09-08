const express = require('express');
const router = express.Router();
const ExpenseType = require('../models/expense-type')

router.post('/', async (req, res, next) =>{
  try {
    let expense_type = new ExpenseType(req.body);
    await expense_type.save();
    res.json({
      status: true,
      data: expense_type,
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
    await ExpenseType.find().exec(function (err, expense_type) {
      res.json({
        status: true,
        data: expense_type,
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
