var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {

  if (idUser) {
    delete req.session.idUser
  }

  res.redirect('/');

});

module.exports = router;
