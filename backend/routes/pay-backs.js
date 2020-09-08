const express = require('express');
const router = express.Router();
const PayBack = require('../models/pay-back');
const Stock = require('../models/stock')

router.post('/', async (req, res, next) =>{
  try {
    let pay_back = new PayBack(req.body);
    await pay_back.save();
    await Stock.findById(req.body.stock).populate('supplier').exec(function (err, stock) {
      if (!err){
        res.json({
          status: true,
          data: stock,
          message: 'Successfully fetched!'
        })
      }
    })
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
});
router.get('/:id/get', async (req, res, next)=>{
  try {
    const payback = await PayBack.find({stock: req.params.id});
    res.json({
      status: true,
      data: payback,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      // message: e.message.split(':')[0]
      message: e.message
    })
  }
})
module.exports = router;
