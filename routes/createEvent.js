var express = require('express');
var router = express.Router();
const authRequire = require('../middleware/authRequire.js');

const mongoose = require('mongoose');
const User = require('../models/users.js');
const Event = require('../models/events.js');

const validate = require('../validators/event.js');
let allUsers = {};



router.get("/", authRequire, function (req, res) {
  console.log("User = " + req.user);

  User.find({}).select({ _id: 1, firstName: 1, lastName: 1 })
    .then((users) => {
      console.log("Поиск завершен", users);

      //Кешируем список пользователей
      allUsers = users.map( (el) => {
        return {
          _id : el._id,
          userName: el.firstName + " " + el.lastName
         }
      });

      res.render("formCreateEvent",{users: allUsers});
    })
    .catch((err) => { console.log(err); });
});



router.post("/", authRequire, function (req, res) {

  const currentUser = req.user;

  const paramsEvent = {
    title: req.body.title,
    place: req.body.place,
    userList: req.body.userList
  }

//Проверяем данные пользователя, если есть ошибки сообщаем
  const resultValidate = validate.formCreateEvent( paramsEvent );
   console.log( resultValidate );


   if ( Object.keys( resultValidate ).length ) {
     console.log("Есть ошибки валидации");

     resultValidate.users = allUsers;

     return res.render('formCreateEvent', resultValidate );
    }

    //Если прошла валидация формируем:



    //Заправшиваем список имен пользователей
    console.log("paramsEvent.userList ", paramsEvent.userList);
    User.find({_id: { $in: paramsEvent.userList }}).select({ _id: 1, firstName: 1, lastName: 1 })
      .then((users) => {
        console.log("Поиск завершен", users);


        //формируем коллекцию приглашений
        const invites = users.map( (el) => {
          return {
            targetUser_id : el._id,
            userName: el.firstName + " " + el.lastName
           }
        });

        const newEvent = {}; //


        //Добавляем id автора
        newEvent.author_id = currentUser._id;

        newEvent.title = paramsEvent.title;
        newEvent.place = paramsEvent.place;

        newEvent.invites = invites;


        //Записываем событие в базу
          new Event( newEvent ).save()
            .then( (ev) => {
              console.log("Событие создано", ev);
              res.redirect("/");
            })
            .catch(err => {console.log(err)});
      })
      .catch(err=>{ console.log(err) })
});

module.exports = router;
