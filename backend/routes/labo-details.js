const express = require('express');
const router = express.Router();
const Labo_Detail = require('../models/labo-detail')

// GET request - get labo
router.get('/:id/get', async (req, res, next) => {
  try {
    await Labo_Detail.find({labo: req.params.id}).sort('-createdAt').exec(function (err, labo_detail) {
      res.json({
        status: true,
        data: labo_detail,
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
