var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const schedule = require('node-schedule');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var schedulesRouter = require('./routes/schedules');
var schedulesusersRouter = require('./routes/scheduleusers');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/schedules', schedulesRouter);
app.use('/scheduleusers', schedulesusersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const cronService = require('./services').cron;
schedule.scheduleJob('* * * * *', function(){
  console.log(`Cron running at ${(new Date())} `);
  cronService.runSchedules();

  setTimeout(function() {
    cronService.runCheckSMSStatus();
  }, 5000);
});

module.exports = app;
