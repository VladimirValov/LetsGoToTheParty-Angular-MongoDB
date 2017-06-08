var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');
const validate = require('../validators/user.js');


router.get("/", function (req, res) {
  console.log("Запрос авторизации");
  console.log("req.session.idUser = " + req.session.idUser);

  res.render('formRegister', {});
});


router.post("/", function (req, res) {
  console.log("Запрос авторизации", req.body);

  const paramsUser = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  }


  const validateError = validate.formRegister( paramsUser );
   console.log( validateError );

   if ( Object.keys( validateError ).length ) {
      return res.status(401).send(validateError );
    }


  console.log("Форма заполнена корректно");

  let newUser = new User( paramsUser );

  newUser.save()
    .then( (user) => {
        console.log("Учетная запись успешно создана", user);

        req.session.idUser = user._id;
        res.status(201).send(user);
    })
    .catch( (err) => { console.log(err) } );
});

module.exports = router;
