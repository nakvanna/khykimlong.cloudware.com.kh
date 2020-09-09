const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
require('dotenv').config();
// mongodb connection
const mongoose = require('mongoose');
const localUri = 'mongodb://localhost/khykimlong-hospital-db';
mongoose.connect(localUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
// end mongodb connection

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
app.use(cors());
app.options('*', cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/auths', require('./routes/auth'));
app.use('/file-upload', require('./routes/file-upload'));
app.use('/blogs', require('./routes/blog'));
app.use('/address-books', require('./routes/address-book'));
app.use('/staffs', require('./routes/staffs'));
app.use('/staff-payrolls', require('./routes/salarys'));
app.use('/patients', require('./routes/patients'));
app.use('/labos', require('./routes/labos'));
app.use('/labo-details', require('./routes/labo-details'));
app.use('/labo-settings', require('./routes/labo-settings'));
app.use('/echos', require('./routes/echos'));
app.use('/echo-babies', require('./routes/echo-babies'));
app.use('/echo-settings', require('./routes/echo-settings'));
app.use('/reports', require('./routes/reports'));
app.use('/rooms', require('./routes/rooms'));
app.use('/examines', require('./routes/examines'));
app.use('/product-types', require('./routes/product-types'));
app.use('/unit-types', require('./routes/unit-types'));
app.use('/products', require('./routes/products'));
app.use('/suppliers', require('./routes/suppliers'));
app.use('/stocks', require('./routes/stocks'));
app.use('/stock-details', require('./routes/stock_details'));
app.use('/stock-pay-backs', require('./routes/pay-backs'));
app.use('/sales', require('./routes/sales'));
app.use('/sale-details', require('./routes/sale_details'));
app.use('/pdf-make', require('./routes/pdfmake'));
app.use('/income-types', require('./routes/income-types'));
app.use('/expense-types', require('./routes/expense-types'));
app.use('/incomes', require('./routes/incomes'));
app.use('/expenses', require('./routes/expenses'));
app.use('/documents', require('./routes/documents'));
app.use('/doctors', require('./routes/doctors'));
app.use('/echo-notes', require('./routes/echo-notes'));
app.use('/ex-ills', require('./routes/ex-ills'));
app.use('/patient-details', require('./routes/patient-details'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
