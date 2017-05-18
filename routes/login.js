var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {
  console.log("req.session.idUser = " + req.session.idUser);
   res.render('formAuth', {});
});

router.post("/", function (req, res) {
  console.log("Запрос авторизации", req.body);

  const params = {
    userName: req.body.userName,
    password: req.body.password
  }

  const error = {};

//Валидация данных формы
  if (!params.userName) {
    console.log("Логин не заполнен!");
    error.userName = "Логин не заполнен!" ;
  }

  if (!params.password) {
    console.log("Пароль не заполнен!");
    error.password = "Пароль не заполнен!" ;
  }

  if ( Object.keys(error).length ) {

     return res.render('formAuth', {
       errorName: error.userName,
       errorPassword: error.password
     });
  }

  console.log("Форма заполнена корректно");


  //Добавление пользователя в базуg
  let newUser = new User( params );

  User.findOne({ userName: params.userName })
    .then( (user) => {
      console.log("Результат пойска: ", user);

      if ( !user ) {
         error.name = "Такого пользователя в базе не обнаружено";

         return res.render ('formAuth',{ errorName: error.name });
      }

      if ( user.password == params.password ) {
        console.log("Успешная авторизация");

        req.session.idUser = user._id;

        res.redirect("/");
      }
      else {
        console.log("неверный пароль");
        error.password = "Неверный пароль";

        return res.render ('formAuth',{ errorPassword: error.password });
      }
  });
});

module.exports = router;
