const express = require('express');
const router = express.Router();
const ProductType = require('../models/product-type')

router.post('/', async (req, res, next) =>{
  try {
    let product_type = new ProductType(req.body);
    await product_type.save();
    res.json({
      status: true,
      data: product_type,
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
    await ProductType.find().exec(function (err, product_type) {
      res.json({
        status: true,
        data: product_type,
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
