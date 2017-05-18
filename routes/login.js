var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {
  
  console.log("Запрос авторизации");
  console.log("req.session.idUser = " + req.session.idUser);
   res.render('formAuth', {});
});

router.post("/", function (req, res) {
  const userName = req.body.userName,
        password = req.body.password;
  let errorName,
      errorPassword;

  console.log("Запрос авторизации", req.body);

  if (!userName) {
    console.log("Логин не заполнен!");
    errorName = "Логин не заполнен!" ;
  }

  if (!password) {
    console.log("Пароль не заполнен!");
    errorPassword = "Пароль не заполнен!" ;
  }

//
  if (errorName || errorPassword) {

     return res.render('formAuth', {
       errorName: errorName,
       errorPassword: errorPassword
     });
  }


  console.log("Форма заполнена корректно");

  //Добавление пользователя в базуgi
  let newUser = new User( req.body );

  User.findOne({userName: userName})
    .then( (user) => {
      console.log("Результат пойска: ", user);

      if ( !user ) {
         errorName = "Такого пользователя в базе не обнаружено";
         return res.render ('formAuth',{errorName: errorName});
      }

      if (user.password == password) {
          console.log("Успешная авторизация");
          req.session.idUser = user._id;
          res.redirect("/");
      }
      else {
        console.log("неверный пароль");
        errorPassword = "Неверный пароль";
        return res.render ('formAuth',{errorPassword: errorPassword});
      }
  });

});

module.exports = router;
