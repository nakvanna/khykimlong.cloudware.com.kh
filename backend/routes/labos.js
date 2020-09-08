const express = require('express');
const router = express.Router();
const Labo = require('../models/labo');
const Labo_Detail = require('../models/labo-detail')

// POST request - create a new labo
router.post('/', async (req, res, next) => {
  // console.log(req.body)
  try {
    let labo_add = new Labo(req.body);
    await labo_add.save().then(async (data) => {
      let labo_id = data._id;
      let hem = req.body.hem;
      let leu = req.body.leu;
      let bio = req.body.bio;
      let ser = req.body.ser;
      hem.map(async (data) => {
        let labo_detail = new Labo_Detail({
          labo: labo_id,
          type: data.type,
          name: data.name,
          value: data.value,
          superscript: data.superscript,
          unit: data.unit,
          min: data.min,
          max: data.max,
          result: data.result
        });
        await labo_detail.save();
      });
      leu.map(async (data) => {
        let labo_detail = new Labo_Detail({
          labo: labo_id,
          type: data.type,
          name: data.name,
          value: data.value,
          superscript: data.superscript,
          unit: data.unit,
          min: data.min,
          max: data.max,
          result: data.result
        });
        await labo_detail.save();
      });
      bio.map(async (data) => {
        let labo_detail = new Labo_Detail({
          labo: labo_id,
          type: data.type,
          name: data.name,
          value: data.value,
          superscript: data.superscript,
          unit: data.unit,
          min: data.min,
          max: data.max,
          result: data.result
        });
        await labo_detail.save();
      });
      ser.map(async (data) =>{
        let labo_detail = new Labo_Detail({
          labo: labo_id,
          type: data.type,
          name: data.name,
          value: data.value,
          superscript: data.superscript,
          unit: data.unit,
          min: data.min,
          max: data.max,
          result: data.result
        });
        await labo_detail.save();
      });
    });
    await Labo.findById(labo_add._id).populate('patient').exec(function (err, labo) {
      res.json({
        status: true,
        data: labo,
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
// GET request - get labo
router.get('/get', async (req, res, next) => {
  try {
    await Labo.find().sort('-createdAt').populate('patient').exec(function (err, labo) {
      res.json({
        status: true,
        data: labo,
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
router.get('/:id/get', async (req, res, next) => {
  try {
    let labo = await Labo.findById(req.params.id).populate('patient');
    res.json({
      status: true,
      data: labo,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// router.get('/:id/get-by-id', async (req, res, next) => {
//   console.log('World');
//   try {
//     await Labo.findById(req.params.id).select('_id').populate('patient', '_id').exec(function (err, labo) {
//       res.json({
//         status: true,
//         data: labo,
//         message: 'Successfully fetched!'
//       })
//     });
//   } catch (e) {
//     res.json({
//       status: false,
//       message: e.message.split(':')[0]
//     })
//   }
// });
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Labo.findByIdAndUpdate(id, {$set: req.body}, {new: true}).populate('patient')
      .exec(function (err, labo) {
        if (!err) {
          res.json({
            status: true,
            data: labo,
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
router.put('/detail/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    await Labo_Detail.findByIdAndUpdate(id, {$set: req.body}, {new: true})
      .exec(function (err, labo_detail) {
        if (!err) {
          res.json({
            status: true,
            data: labo_detail,
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
router.get('/:id/edit', async (req, res, next) => {
  try {
    let labo = await Labo.findById(req.params.id).populate('patient');
    res.json({
      status: true,
      data: labo,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
module.exports = router;
