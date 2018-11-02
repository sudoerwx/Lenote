const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database/db');
const bodyParser = require('body-parser');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
//routers
const filesRouter = require('./routes/files');
const usersRouter = require('./routes/users');
const authRouter =require('./routes/auth')

db.setUPConnection();

const app = express();

app.use(cookieSession({
	maxAge:24*60*60*1000,
	keys:[keys.session.cookieKey]
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));


//work with users
app.use('/users', usersRouter);
//work with files
app.use('/files', filesRouter);
//login handler
app.use('/auth', authRouter);

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
  res.send(err.message);
});

module.exports = app;
