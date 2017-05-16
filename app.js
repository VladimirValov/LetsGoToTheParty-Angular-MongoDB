'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const index = require('./routes/index');
const login = require('./routes/login.js');
const answers = require('./routes/answers.js');

const PORT = process.env.VCAP_APP_PORT || 7000;
const app = express();

const session = require('express-session');
app.set('trust proxy', 1)
app.use(session({
  secret: 'no-secret',
  resave: false,
  saveUnitialized: false,
  cookie: {secure: true}
}));







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login', login );
app.use('/answers', answers);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.render('error');
});


//MONGOOSE
const mongoose = require('mongoose');
//const urlDB = require('./config.json').urlDB;
const urlDB = require('./config.json').dbLocal;

mongoose.connect( urlDB );

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('Mongoose connected to mLab');

  app.listen(PORT, function () {
    console.log("partyApp listening on port " + PORT + "!")
  })
});

module.exports = app;
