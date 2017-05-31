var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');
const validate = require('../validators/user.js');


router.get("/", function (req, res) {
  console.log("req.session.idUser = " + req.session.idUser);
   res.render('formLogin', {});
});


router.post("/", function (req, res) {
  console.log("Запрос авторизации", req.body);

  const paramsUser = {
    email: req.body.email,
    password: req.body.password
  }

  const validateError = validate.formLogin(paramsUser);
   console.log(validateError );

   if ( Object.keys( validateError ).length ) {
      return res.send(validateError );
    }


  console.log("Форма заполнена корректно");


  User.findOne({ email: paramsUser.email })
    .then( (user) => {
      console.log("Результат пойска: ", user);

      if ( !user ) {
        console.log("Такого пользователя в базе не обнаружено");

         return res.send ({ email: "Такого пользователя в базе не обнаружено"
         });
      }


      if ( user.password == paramsUser.password ) {
        console.log("Успешная авторизация");

        //Записываем в сессии ID пользователя

        req.session.idUser = user._id;

        res.send({
          userName: user.firstName + " " + user.lastName,
          user_id: user._id
        });
      }

      else {
        console.log("неверный пароль");

        return res.send({ password: "Неверный пароль" });
      }
  });
});

module.exports = router;
