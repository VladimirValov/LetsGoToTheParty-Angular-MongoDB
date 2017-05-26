const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Event = require('../models/events.js');

/* GET home page. */
router.get('/:user_id/invites', function(req, res, next) {
  let user_id = req.params.user_id;

  console.log(req.params);

  console.log(user_id);

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
    .catch( err => {
      console.log(err);
    });
});

module.exports = router;
