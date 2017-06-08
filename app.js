'use strict';

const express = require('express');
const session = require('express-session');

const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');


//MONGOOSE
const mongoose = require('mongoose');
const urlDB = require('./config.json')

const PORT = process.env.VCAP_APP_PORT || 3000;
const app = express();


//Route
//const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users.js');
const loginRoute = require('./routes/login.js');
const registerRoute = require('./routes/register.js');
//const logoutRoute = require('./routes/logout.js');

const eventsRoute = require('./routes/events.js');
const inviteRoute = require('./routes/invite.js');

const drinksRoute = require('./routes/drinks.js');




app.use(session({
  secret: 'no-secret',
  resave: false,
  saveUnitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  console.log("req.session.idUser = " + req.session.idUser);
  next();
});

app.use('/users', usersRoute);
// app.use('/', indexRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
//app.use('/logout', logoutRoute);

app.use('/events', eventsRoute);
app.use('/invite/', inviteRoute);
app.use('/drinks/', drinksRoute);




app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.send('error');
});


mongoose.connect( urlDB.dbLocal );
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose connected to DB');

  app.listen(PORT, function () {
    console.log("partyApp listening on port " + PORT + "!")
  })
});

module.exports = app;
