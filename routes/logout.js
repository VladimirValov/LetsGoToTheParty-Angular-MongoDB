var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {

  console.log("Before req.session.idUser = " + req.session.idUser);

  if(req.session.idUser) {
    delete req.session.idUser
  }

  res.redirect('/');
  
  console.log("After req.session.idUser = " + req.session.idUser);

});

module.exports = router;
