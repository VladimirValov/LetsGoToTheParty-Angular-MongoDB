var express = require('express');
var router = express.Router();
const authRequire = require('../middleware/authRequire.js');

const mongoose = require('mongoose');
const User = require('../models/users.js');
const Invite = require('../models/invite.js');


//router.get("/", authRequire, function (req, res) {
router.get("/", function (req, res) {

  User.find({}).select({ _id: 1, firstName: 1, lastName: 1 })
    .then((users) => {
      console.log("Поиск завершен", users);


      res.render("formCreateEvent",{users: users});
    })
    .catch((err) => {
      console.log(err);
    });




});

module.exports = router;
