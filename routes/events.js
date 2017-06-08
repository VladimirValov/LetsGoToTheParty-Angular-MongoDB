var express = require('express');
var router = express.Router();
const authRequire = require('../middleware/authRequire.js');

const mongoose = require('mongoose');
const Users = require('../models/users.js');
const Drinks = require('../models/drinks.js');
const Event = require('../models/events.js');

const validate = require('../validators/event.js');
let allUser = {};
let allDrinks = {};



router.get("/", authRequire, function (req, res) {
  console.log("Users = " + req.user);

  Users.find({}).select({ _id: 1, firstName: 1, lastName: 1 })
    .then((users) => {
      console.log("Поиск завершен", users);

      //Кешируем список пользователей
      allUser = users.map( (el) => {
        return {
          _id : el._id,
          userName: el.firstName + " " + el.lastName
         }
      });

/// Вынести в Promise.all()
      Drinks.find({})
        .then((drinks) => {

          allDrinks = drinks;
          console.log(drinks);

          res.render("formCreateEvent", {
            users: allUser,
            drinks: allDrinks
          })
        })
      })
      .catch((err) => { console.log(err); });
});



router.post("/", authRequire, function (req, res) {
  console.log("Запрос на сохранение события");
  console.log(req.body);

  const newEvent = {}; //

    console.log('newEvent');
    console.log(newEvent);

  //Добавляем id автора
  newEvent.author_id = req.body.author_id;
  newEvent.title = req.body.title;
  newEvent.place = req.body.place;
  newEvent.drinks = req.body.drinks;

  const users = req.body.users;
  //формируем коллекцию приглашений
  const invites = users.map(el => {
    return {
      targetUser_id : el._id,
      userName: el.firstName + " " + el.lastName
     }
  });

  newEvent.invites = invites;

  //Записываем событие в базу
    new Event( newEvent ).save()
      .then( (ev) => {
        console.log("Событие создано", ev);
      })
      .catch(err=>{ console.log(err) });

});

module.exports = router;
