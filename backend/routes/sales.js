const express = require('express');
const router = express.Router();
const Sale = require('../models/sale')
//Store data to db
router.post('/', async (req, res, next) =>{
  try {
    let sale = new Sale(req.body);
    await sale.save();
    res.json({
      status: true,
      data: sale,
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
    await Sale.find()
      .sort('-createdAt')
      .populate('patient', 'kh_name lt_name')
      .populate('user_admin', 'name email user_type')
      .populate('user_cashier', 'name email user_type')
      .select('description sale_date sale_status amount paid_amount due_amount')
      .exec(function (err, sale) {
      res.json({
        status: true,
        data: sale,
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
//Fetch data from db by patient
router.get('/:id/get-by-patient', async (req, res, next) => {
  try {
    await Sale.find({patient: req.params.id, sale_status: "Pending"})
      .populate('user_admin', 'name email user_type')
      .populate('user_cashier', 'name email user_type')
      .exec(function (err, sale) {
      res.json({
        status: true,
        data: sale,
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
//View data by sale id
router.get('/:id/view', async (req, res, next) => {
  try {
    let sale = await Sale.findById(req.params.id)
      .populate('patient', 'kh_name lt_name phone')
      .select('description sale_date sale_status amount paid_amount due_amount')
    ;
    res.json({
      status: true,
      data: sale,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
//Sort data by date
router.post('/get/by-date', async (req, res, next) => {
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  try {
    await Sale.find({sale_date: {$gte: start_date, $lte: end_date}})
      .populate('patient', 'lname fname')
      .exec(function (err, sale) {
      res.json({
        status: true,
        data: sale,
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
router.get('/:id/get/by-examination', async (req, res, next) => {
  const id = req.params.id;
  try {
    await Sale.find({examine: id}).populate('patient', 'lname fname').sort('-createdAt')
      .exec(function (err, sale) {
      res.json({
        status: true,
        data: sale,
        message: 'Successfully fetched!'
      });
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
    let sale = await Sale.findById(req.params.id).populate('supplier');
    res.json({
      status: true,
      data: sale,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
//Fetch data after store sale detail
router.get('/:id/get-after', async (req, res, next) => {
  try {
    let sale = await Sale.findById(req.params.id).populate('patient', 'kh_name').populate('user_admin', 'name');
    res.json({
      status: true,
      data: sale,
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
    let sale = await Sale.findById(req.params.id).populate('patient');
    res.json({
      status: true,
      data: sale,
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
    await Sale.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, sale) {
        if (!err) {
          res.json({
            status: true,
            data: sale,
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
