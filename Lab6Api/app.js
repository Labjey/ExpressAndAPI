var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
var fs=require('fs');
const validator=require('express-validator');
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gradesRouter=require('./routes/grades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev', {stream: accessLogStream}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//for validation
app.use(validator());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grades', gradesRouter);




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


let port=3500;
app.listen(port, function(){
  console.log(`The server is running on port ${port}`);
});
//module.exports = app;
