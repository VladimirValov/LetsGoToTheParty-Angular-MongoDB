const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Event = require('../models/events.js');



/* Список событий на которые пригласили пользователя */
router.get('/:user_id/invites', function (req, res, next) {
  let user_id = req.params.user_id;
  console.log(user_id);

  console.log(req.params);



  Event.find({"invites.targetUser_id": user_id})
    .select({
      _id: 0,
      title: 1,
      place: 1,
      "invites.$" : 1
    })
    .then(function(invites) {
      console.log("invites", invites);

      res.send(invites);
    })
    .catch(err => { console.log(err); });
});



//Список всех созданных пользователем Событий
router.get('/:user_id/events', function (req, res, next) {
  console.log("Запрос событий пользователя");
  let user_id = req.params.user_id;
  console.log(user_id);

  Event.find({author_id: user_id})
  .select(
    {
      _id: 0,
      title: 1,
      place: 1,
      drinks: 1,
      invites: 1
    })
    .then(function(events) {

      console.log("events");
      console.log(events);

      res.send(events);
    })
    .catch(err => { console.log(err); });
});

module.exports = router;
