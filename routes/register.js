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
  const userName = req.body.userName,
        password = req.body.password;
        passwordRepeat = req.body.passwordRepeat;
  let errorName,
      errorPassword;

  console.log("Запрос авторизации", req.body);
  console.log(req.session);


 if (!userName) {
   console.log("Логин не заполнен!");
   errorName = "Логин не заполнен!" ;
 }

 if (!password || !passwordRepeat) {
    console.log("Введите пароль и подтверждение!");
    errorPassword = "Введите пароль и подтверждение!" ;

 } else if (password != passwordRepeat) {
    console.log("Введеные пароли не совпадают");
    errorPassword = "Введеные пароли не совпадают!" ;
 }

 if (errorName || errorPassword) {
     res.render('formRegister', {
       title: "Форма регистрации",
       errorName: errorName,
       errorPassword: errorPassword
     });
 }

 else  {
   console.log("Форма заполнена корректно");

//Добавление пользователя в базуgi
  let newUser = new User( req.body );

  newUser.save( (err, user) => {
    if(err) { return console.log(err); }
    console.log("Учетная запись успешно создана", user);
    req.session.idUser = user._id;
    res.redirect('/');
  //  res.redirect('/answers/' + userName)
  });
  }
});

module.exports = router;
