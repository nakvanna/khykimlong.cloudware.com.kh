const express = require('express');
const router = express.Router();
const Examine = require('../models/examine');
const Room = require('../models/room');

router.post('/', async (req, res, next) => {
  try {
    const examine_add = new Examine(req.body);
    await examine_add.save();
    await Room.findByIdAndUpdate(req.body.room, {$set: {status: true}});
    await Examine.findById(examine_add._id).populate('patient').populate('room').exec((err, examine) => {
      res.json({
        status: true,
        data: examine,
        message: 'Successfully saved!'
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
    await Examine.find().sort('-createdAt').populate('patient').populate('room').exec((err, examine) => {
      res.json({
        status: true,
        data: examine,
        message: 'Successfully saved!'
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
router.get('/:id/get', async (req, res, next) => {
  try {
    await Examine.findById(req.params.id).populate('patient').populate('room').exec((err, examine) => {
      res.json({
        status: true,
        data: examine,
        message: 'Successfully saved!'
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
router.put('stay/:id/update', async (req, res, next) => {
  let examine_id = req.params.id;
  let room_id = req.body.room_id;
  try {
    await Examine.findByIdAndUpdate(examine_id, {is_stay: false}, {new: true});
    await Room.findByIdAndUpdate(room_id, {status: false}, {new: true});
    res.json({
      status: true,
      data: patient,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Examine.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('patient').populate('room')
      .exec(function (err, patient) {
        if (!err) {
          res.json({
            status: true,
            data: patient,
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
