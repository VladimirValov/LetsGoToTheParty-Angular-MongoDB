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

  console.log(req.body);

  const currentUser = req.user;

  const paramsEvent = {
    title: req.body.title,
    place: req.body.place,
    userList: req.body.userList,
    drinkList: req.body.drinkList
  }

//Проверяем данные пользователя, если есть ошибки сообщаем
  const validateError = validate.formCreateEvent( paramsEvent );
   console.log( validateError );


   if ( Object.keys( validateError ).length ) {
     console.log("Есть ошибки валидации");

     return res.render('formCreateEvent', {
       users: allUser,
       drinks: allDrinks,
       validateError: validateError
     });
    }


    console.log("paramsEvent.userList ", paramsEvent.userList);


    //Если прошла валидация
      //Заправшиваем список имен пользователей
    Users.find({_id: { $in: paramsEvent.userList }}).select({ _id: 1, firstName: 1, lastName: 1 })
      .then((users) => {
        console.log("Поиск завершен", users);

        //формируем коллекцию приглашений
        const invites = users.map( (el) => {
          return {
            targetUser_id : el._id,
            userName: el.firstName + " " + el.lastName
           }
        });

        ///Proomise.allUser
        //Формируем список напитков

        Drinks.find({ _id: {$in: paramsEvent.drinkList }}, { _id: 1, name: 1} )
          .then ((drinkList) => {
            console.log("Напитки найдены");
            console.log(drinkList);

            const drinks = drinkList.map( (el) => {
              console.log(el);
              return {
                drink_id : el._id,
                name: el.name
               }
            });


            console.log(drinks);

            const newEvent = {}; //

            //Добавляем id автора
            newEvent.author_id = currentUser._id;

            newEvent.title = paramsEvent.title;
            newEvent.place = paramsEvent.place;

            newEvent.invites = invites;
            newEvent.drinks = drinks;

            console.log(newEvent);


            //Записываем событие в базу
              new Event( newEvent ).save()
                .then( (ev) => {
                  console.log("Событие создано", ev);
                  res.redirect("/");
                })
                .catch(err=>{ console.log(err) });
          })

      })
      .catch(err=>{ console.log(err) });
});

module.exports = router;
