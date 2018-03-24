var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hike = require('./routes/hike');
var monitor = require('./routes/monitor');
var home = require('./routes/home');
var gallery = require('./routes/gallery');
var enrollment = require('./routes/enrollment');
var myaccount = require('./routes/myaccount');
var myschedule = require('./routes/myschedule');
var mypayment = require('./routes/mypayment');
var mycommunication = require('./routes/mycommunication');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
app.get('/hikes', hike.index);
app.get('/monitor', monitor.index);
app.get('/myaccount', myaccount.index);
app.get('/myschedule', myschedule.index);
app.get('/mycommunication', mycommunication.index);
app.get('/mypayment', mypayment.index);
app.post('/add_hike', hike.add_hike)
app.get('/home', home.index);
app.get('/gallery', gallery.index);
app.get('/enrollment', enrollment.index);
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
