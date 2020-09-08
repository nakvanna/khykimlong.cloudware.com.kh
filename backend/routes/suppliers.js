const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplier')

router.post('/', async (req, res, next) =>{
  try {
    let supplier = new Supplier(req.body);
    await supplier.save();
    res.json({
      status: true,
      data: supplier,
      message: 'Successfully stored!'
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
    await Supplier.find().exec(function (err, supplier) {
      res.json({
        status: true,
        data: supplier,
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
