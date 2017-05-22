const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Event = require('../models/events.js');

const authRequire = require('../middleware/authRequire.js');

/* GET home page. */
router.get('/', authRequire, function(req, res, next) {
  let user = req.user;
  console.log(user);


//вывод событий созданных пользователем
  Event.find({author_id: user._id}).select(
    {
      _id: 0,
      title: 1,
      place: 1,
      invites: 1
    })
    .then ( (events) => {
      console.log(events);

      //вывод событий созданных пользователем
      Event.find({"invites.targetUser_id": user._id},
        {
          _id: 0,
          title: 1,
          place: 1,
          "invites.$" : 1
        })
        .then ( (invites) => {
          console.log("invites", invites);

         res.render('index', {
          userName: user.firstName,
          events: events,
          myInvites: invites
          });
      })
    })
    .catch( err => {
      console.log(err);
    });

















});

module.exports = router;
