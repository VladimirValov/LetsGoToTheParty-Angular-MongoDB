var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get("/", function (req, res) {
  console.log("Запрос авторизации");
   res.render('formAuth', {} );
});

router.post("/", function (req, res) {
  const userName = req.body.userName,
        password = req.body.password;
  let errorName,
      errorPassword;

  console.log("Запрос авторизации", req.body);
  console.log(req.session);


 if (!userName) {
   console.log("Логин не заполнен!");
   errorName = "Логин не заполнен!" ;
 }

 if (!password) {
    console.log("Пароль не заполнен!");
    errorPassword = "Пароль не заполнен!" ;
 }

 if (errorName && errorPassword) {
     res.render('formAuth', { helloUser: errorName + errorPassword  } );
 }

 else  {
   console.log("Форма заполнена корректно");

//Добавление пользователя в базу
  let newUser = new User( req.body );

  newUser.save( (err, user) => {
    if(err) { return console.log(err); }
    console.log("Учетная запись успешно создана", user);
    req.session.cookie.id = user._id;
    res.redirect('/answers/' + userName)
  });
  }
});

module.exports = router;
