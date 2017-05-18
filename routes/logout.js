var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {
  let idUser = req.session.idUser;

  console.log("req.session.idUser = " + idUser);

  if (idUser) {
    delete req.session.idUser
  }

  res.redirect('/');

});

module.exports = router;
