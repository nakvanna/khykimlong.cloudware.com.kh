const express = require('express');
const router = express.Router();
const StockDetail = require('../models/stock_detail');

router.post('/', async (req, res, next) => {
  try {
    let stock_detail = new StockDetail(req.body);
    await stock_detail.save();
    res.json({
      status: true,
      data: stock_detail,
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
//select for stock view
router.get('/:id/get', async (req, res, next) => {
  try {
    await StockDetail.find({stock: req.params.id})
      .populate('product', 'name description invent_type stock_alert')
      .select('qty stock_qty buy_price sale_price')
      .exec(function (err, stock_detail) {
      res.json({
        status: true,
        data: stock_detail,
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
//Fetch for sale only
router.get('/get-sale', async (req, res, next) => {
  try {
    await StockDetail.find({
      purchase_status: 'Receive',
      invent_type: {$ne: 'Purchase-Only'},
      stock_qty: {$ne: 0}
    }).select('stock_qty buy_price sale_price invent_type')
      .populate('product')
      .exec(function (err, stock_detail) {
      res.json({
        status: true,
        data: stock_detail,
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
//Fetch for sale report
router.get('/get-report', async (req, res, next) => {
  try {
    await StockDetail.find({invent_type: {$nin: ['Service', 'Purchase-Only']}}).populate('stock')
      .populate('product')
      .exec(function (err, stock_detail) {
      res.json({
        status: true,
        data: stock_detail,
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
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await StockDetail.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, stock_detail) {
        if (!err) {
          res.json({
            status: true,
            data: stock_detail,
            message: 'Successfully updated!'
          })
        }
      });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
//this id is stock id
router.delete('/:id/delete', async (req, res, next) => {
  let stock_id = req.params.id;
  try {
    await StockDetail.deleteMany({stock: stock_id}).exec(function (err, stock_delete) {
      if (!err) {
        res.json({
          status: true,
          data: stock_delete,
          message: 'Successfully updated!'
        })
      }
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
module.exports = router;
