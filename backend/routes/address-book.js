const express = require('express');
const router = express.Router();
const Province = require('../models/province');
const District = require('../models/district');
const Commune = require('../models/commune');
const Village = require('../models/village');
const AddressBook = require('../models/address-book');
// POST request - create a new province
router.post('/', async (req, res, next) => {
  try {
    let address_book = new AddressBook();
    address_book.province = req.body.address_province.label;
    address_book.district = req.body.address_district.label;
    address_book.commune = req.body.address_commune.label;
    address_book.village = req.body.address_village.label;
    await address_book.save();
    res.json({
      status: true,
      data: address_book,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get address books
router.get('/', async (req, res, next) => {
  try {
    let address_books = await AddressBook.find();
    res.json({
      status: true,
      data: address_books,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// POST request - create a new province
router.post('/province', async (req, res, next) => {
  try {
    let province = new Province();
    province.name = req.body.name;
    await province.save();
    res.json({
      status: true,
      data: province,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get provinces
router.get('/province', async (req, res, next) => {
  try {
    let provinces = await Province.find();
    res.json({
      status: true,
      data: provinces,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// POST request - create a new district
router.post('/district', async (req, res, next) => {
  try {
    let district = new District();
    district.name = req.body.name;
    await district.save();
    res.json({
      status: true,
      data: district,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get districts
router.get('/district', async (req, res, next) => {
  try {
    let districts = await District.find();
    res.json({
      status: true,
      data: districts,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// POST request - create a new commune
router.post('/commune', async (req, res, next) => {
  try {
    let commune = new Commune();
    commune.name = req.body.name;
    await commune.save();
    res.json({
      status: true,
      data: commune,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get communes
router.get('/commune', async (req, res, next) => {
  try {
    let communes = await Commune.find();
    res.json({
      status: true,
      data: communes,
      message: 'Successfully fetched!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// POST request - create a new village
router.post('/village', async (req, res, next) => {
  try {
    let village = new Village();
    village.name = req.body.name;
    await village.save();
    res.json({
      status: true,
      data: village,
      message: 'Successfully saved!'
    })
  } catch (e) {
    res.json({
      status: false,
      message: e.message.split(':')[0]
    })
  }
});
// GET request - get villages
router.get('/village', async (req, res, next) => {
  try {
    let villages = await Village.find();
    res.json({
      status: true,
      data: villages,
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
