const express = require('express');
const router = express.Router();
const EchoNote = require('../models/echo-note');

// POST request - create a new echo
router.post('/', async (req, res, next) => {
  try {
    let _echo = new EchoNote(req.body);
    await _echo.save();
    await EchoNote.findById(_echo._id).populate('patient').exec(function (err, echo_note) {
      res.json({
        status: true,
        data: echo_note,
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
// GET request - get echo
router.get('/', async (req, res, next) => {
  try {
    await EchoNote.find().sort('-createdAt').populate('patient').exec(function (err, echo) {
      res.json({
        status: true,
        data: echo,
        message: 'Successfully fetched!'
      })
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});

router.get('/:id/edit', async (req, res, next) => {
  try {
    await EchoNote.findById(req.params.id).sort('-createdAt').populate('patient').exec(function (err, echo) {
      res.json({
        status: true,
        data: echo,
        message: 'Successfully fetched!'
      })
    });
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
module.exports = router;
