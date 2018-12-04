const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/wunderlist';

const app = express();

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'res/app/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static/images', serveStatic(path.join(__dirname, 'res/common/images')));
app.use('/static/app', serveStatic(path.join(__dirname, 'res/dist')));

app.use('/adduser', require('./routes/adduser'));
app.use('/users', require('./routes/users'));
app.use('/users/:userId', require('./routes/list'));
app.use('/tasks', require('./routes/task'));

app.get('/', (req, res) => {
  res.render('index')
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
