const express = require('express');
const router = express.Router();
const Room = require('../models/room')

router.post('/', async (req, res, next) => {
  try {
    let room = new Room(req.body);
    await room.save();
    res.json({
      status: true,
      data: room,
      message: 'Successfully saved!'
    });
    console.log(room)
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
    await Room.find().sort('-createdAt').exec(function (err, room) {
      res.json({
        status: true,
        data: room,
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
router.put('/toggle/:id/update', async (req, res, next) => {
  let id = req.params.id;
  console.log(req.body)
  try {
    await Room.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, room) {
        if (!err) {
          res.json({
            status: true,
            data: room,
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
