const express = require('express');
const router = express.Router();
const SaleDetail = require('../models/sale_detail');
const StockDetail = require('../models/stock_detail');

router.post('/', async (req, res, next) => {
  let stock_detail_id = req.body.stock_detail_id;
  var sale_qty = req.body.sale_qty;
  let invent_type = req.body.invent_type;
  let sale_status = req.body.sale_status;
  let product_id = req.body.product;
  try {
    let sale_detail = new SaleDetail(req.body);
    await sale_detail.save();
    if (invent_type !== 'Service'){
      if (sale_status === 'Receive' || sale_status === 'Stay'){
        await StockDetail.find({product: product_id}).exec(async function (err, stock_detail){
          console.log(stock_detail);
          for (var i = 0; i < stock_detail.length; i ++){
            if (sale_qty <= stock_detail[i].stock_qty){
              await StockDetail.findByIdAndUpdate(stock_detail[i]._id, {$inc: {stock_qty: -(sale_qty)}}, {new: true});
              sale_qty = 0;
              break;
            }else {
              await StockDetail.findByIdAndUpdate(stock_detail[i]._id, {$inc: {stock_qty: -(stock_detail[i].stock_qty)}}, {new: true});
              sale_qty -= stock_detail[i].stock_qty;
            }
          }
        })
      }
    }
    res.json({
      status: true,
      data: sale_detail,
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
//select by sale invoice
router.get('/:id/get', async (req, res, next) => {
  try {
    await SaleDetail.find({sale: req.params.id})
      .sort('-createdAt')
      .populate('product', 'name description invent_type')
      .select('sale_qty sale_price buy_price stock_detail_id')
      .exec(function (err, sale_detail) {
      res.json({
        status: true,
        data: sale_detail,
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
router.get('/get', async (req, res, next) => {
  try {
    await SaleDetail.find().populate('stock').populate('product').exec(function (err, sale_detail) {
      res.json({
        status: true,
        data: sale_detail,
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
router.get('/get-pending', async (req, res, next) => {
  try {
    await SaleDetail.find().populate('stock').populate('product').populate('user_admin').exec(function (err, sale_detail) {
      res.json({
        status: true,
        data: sale_detail,
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
    await SaleDetail.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, sale_detail) {
        if (!err) {
          res.json({
            status: true,
            data: sale_detail,
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
router.delete('/:id/delete', async (req, res, next) => {
  let sale_id = req.params.id;
  try {
    await SaleDetail.deleteMany({sale: sale_id}).exec(function (err, sale_delete) {
      if (!err) {
        res.json({
          status: true,
          data: sale_delete,
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
