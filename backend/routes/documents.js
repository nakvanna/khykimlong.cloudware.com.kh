const express = require('express');
const router = express.Router();
const Document = require('../models/document')
// POST request - create a new document
router.post('/', async (req, res, next) => {
  let document = new Document(req.body)
  await document.save();
  try {
    res.json({
      status: true,
      data: document,
      message: 'Successfully added!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// PUT request - update document
router.put('/:id/update', async (req, res, next) => {
  let id = req.params.id;
  try {
    let document = await Document.findByIdAndUpdate(id, {$set: req.body}, {new: true});
    res.json({
      status: true,
      data: document,
      message: 'Successfully updated!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get documents
router.get('/', async (req, res, next) => {
  try {
    let documents = await Document.find()
    res.json({
      status: true,
      data: documents,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get document by id
router.get('/:id/edit', async (req, res, next) => {
  try {
    let document = await Document.findById(req.params.id)
    res.json({
      status: true,
      data: document,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get document by id
router.get('/:id', async (req, res, next) => {
  try {
    let document = await Document.findById(req.params.id)
    res.json({
      status: true,
      data: document,
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
