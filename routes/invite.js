const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Event = require('../models/events.js');
const Drinks = require('../models/drinks.js');

const validate = require('../validators/event.js');
const authRequire = require('../middleware/authRequire.js');

//Сохранение приглашения,для отправки при ошибках валидации
let paramsInvite;

router.post('/:id', function(req, res) {
  console.log( "запрос на сохранение ответа пользователя");

  const userAnswer = req.body;
  console.log('userAnswer');
  console.log(userAnswer);

  const inviteId = req.params.id;
  console.log(inviteId);

  Event.update(
    {"invites._id": inviteId},
    {
      $set: {
      "invites.$.answered": true,
      "invites.$.isReady": userAnswer.isReady,
      "invites.$.drinks": userAnswer.drinks
    }})
    .then( (result) => {
      console.log("result.invites")
      console.log(result)
    });


});

/*

//Получаем Id Invite
router.get('/:id', authRequire, function(req, res, next) {
  let user = req.user;
  console.log(user);
  console.log(req.params.id);

  const inviteId = req.params.id;

  Event.findOne({"invites._id": inviteId},
    {
      _id: 0,
      title: 1,
      place: 1,
      drinks: 1,
      "invites.$" : 1
    })
    .then ( (result) => {
      console.log(result);

      paramsInvite = {
        title: result.title,
        place: result.place,
        invite: result.invites[0],
        drinks: result.drinks,
        }

     return res.render('invite', paramsInvite);
     })
     .catch( err => {
        console.log(err);
      });
});


/*
router.post('/:id', authRequire, function(req, res) {
  const inviteId = req.params.id;

  console.log(req.body);

  const userAnswer = {
    isReady: req.body.isReady,
    drinks: req.body.drinks
  }

  const validateError = validate.formInvite( userAnswer );
   console.log( validateError );

   if ( Object.keys( validateError ).length ) {

     paramsInvite.validateError = validateError;

      return res.render('invite', paramsInvite );
    }


  console.log("Форма заполнена корректно");

  Drinks.find({ _id: {$in: userAnswer.drinks }}, { _id: 1, name: 1} )
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
      //Обновляем ответ пользователя
      Event.update(
        {"invites._id": inviteId},
        {
          $set: {
          "invites.$.answered": true,
          "invites.$.isReady": userAnswer.isReady ,
          "invites.$.drinks": drinks
        }})
        .then( (result) => {
          console.log("result.invites")
          console.log(result)

            res.redirect("/");
        });
    });
});
*/

module.exports = router;
