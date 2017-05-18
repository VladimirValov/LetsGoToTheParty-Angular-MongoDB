var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {
  console.log("Запрос авторизации");
  console.log("req.session.idUser = " + req.session.idUser);

  res.render('formRegister', {});
});

router.post("/", function (req, res) {
  console.log("Запрос авторизации", req.body);

  const params = {
    userName: req.body.userName,
    password: req.body.password,
    passwordRepeat: req.body.passwordRepeat
  }

  const error = {};

  //Валидация формы регистрации
  if (!params.userName) {
   console.log("Логин не заполнен!");
   error.userName = "Логин не заполнен!" ;
  }

  if ( !params.password || !params.passwordRepeat ) {
    console.log("Введите пароль и подтверждение!");
    error.password = "Введите пароль и подтверждение!" ;
  }

  else if (params.password != params.passwordRepeat) {
    console.log("Введеные пароли не совпадают");
    error.password = "Введеные пароли не совпадают!" ;
  }


  if ( Object.keys(error).length ) {

    return res.render('formRegister', {
      title: "Форма регистрации",
      errorName: error.userName,
      errorPassword: error.password
    });
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
