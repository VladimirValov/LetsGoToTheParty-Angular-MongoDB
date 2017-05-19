var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');
const userValidate = require('../validators/user.js');


router.get("/", function (req, res) {
  console.log("req.session.idUser = " + req.session.idUser);
   res.render('formLogin', {});
});

router.post("/", function (req, res) {
  console.log("Запрос авторизации", req.body);

  const params = {
    email: req.body.email,
    password: req.body.password
  }

  const validateError = userValidate.formLogin(params);
   console.log(validateError );

   if ( Object.keys( validateError ).length ) {
      return res.render('formLogin', validateError );
    }


  console.log("Форма заполнена корректно");

  //Добавление пользователя в базуg
  let newUser = new User( params );

  User.findOne({ email: params.email })
    .then( (user) => {
      console.log("Результат пойска: ", user);

      if ( !user ) {
         error.email = "Такого пользователя в базе не обнаружено";
         return res.render ('formLogin',{ errorName: error.email });
      }

      if ( user.password == params.password ) {
        console.log("Успешная авторизация");

        req.session.idUser = user._id;

        res.redirect("/");
      }

      else {
        console.log("неверный пароль");
        error.password = "Неверный пароль";
        return res.render ('formLogin',{ errorPassword: error.password });
      }
  });
});

module.exports = router;
