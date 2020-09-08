const express = require('express');
const router = express.Router();
const Stock = require('../models/stock')
//Store data to db
router.post('/', async (req, res, next) =>{
  try {
    let stock = new Stock(req.body);
    await stock.save();
    res.json({
      status: true,
      data: stock,
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
//Fetch data from db
router.get('/get', async (req, res, next) => {
  try {
    await Stock.find().sort('-createdAt')
      .populate('supplier', 'name')
      .select(' purchase_status purchase_date description amount paid_amount due_amount')
      .exec(function (err, stock) {
      res.json({
        status: true,
        data: stock,
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
//Sort data by date
router.post('/get/by-date', async (req, res, next) => {
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  try {
    await Stock.find({purchase_date: {$gte: start_date, $lte: end_date}})
      .select('description purchase_status purchase_date amount paid_amount due_amount')
      .exec(function (err, stock) {
      res.json({
        status: true,
        data: stock,
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
//View data by id
router.get('/:id/view', async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id)
      .populate({
        path : 'supplier',
        select: 'name company contact',
        populate : {
          path : 'current_address_book',
        }
      })
      .select('purchase_date description purchase_status amount paid_amount due_amount')
    ;
    res.json({
      status: true,
      data: stock,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
//Fetch data after store stock detail
router.get('/:id/get-after', async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id).populate('supplier');
    res.json({
      status: true,
      data: stock,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
//Fetch data for edit if Pending
router.get('/:id/edit', async (req, res, next) => {
  try {
    let stock = await Stock.findById(req.params.id)
      .populate('supplier', 'name company');
    res.json({
      status: true,
      data: stock,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
//Update data
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Stock.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, stock) {
        if (!err) {
          res.json({
            status: true,
            data: stock,
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
