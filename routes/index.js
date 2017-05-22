const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Event = require('../models/event.js');

const authRequire = require('../middleware/authRequire.js');

/* GET home page. */
router.get('/', authRequire, function(req, res, next) {
  let user = req.user;
  console.log(user);

  Event.find({}).populate('userList', 'firstName')
    .then ( (events) => {
      console.log(events);

      res.render('index', {
        userName: user.firstName,
        events: events
       });
    })
    .catch( err => {
      console.log(err);
    });



});

module.exports = router;
