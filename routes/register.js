var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');
const userValidate = require('../validators/user.js');


router.get("/", function (req, res) {
  console.log("Запрос авторизации");
  console.log("req.session.idUser = " + req.session.idUser);

  res.render('formRegister', {});
});


router.post("/", function (req, res) {
  console.log("Запрос авторизации", req.body);

  const params = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    passwordRepeat: req.body.passwordRepeat
  }


  const validateError = userValidate.formRegister(params);
   console.log(validateError );

   if ( Object.keys( validateError ).length ) {
      return res.render('formRegister', validateError );
    }



  console.log("Форма заполнена корректно");

  let newUser = new User( params );

  newUser.save()
    .then( (user) => {
        console.log("Учетная запись успешно создана", user);

        req.session.idUser = user._id;

        res.redirect('/');
    })
    .catch( (err) => { console.log(err) } );


});

module.exports = router;
