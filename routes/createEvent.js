var express = require('express');
var router = express.Router();
const authRequire = require('../middleware/authRequire.js');

const mongoose = require('mongoose');
const User = require('../models/users.js');
const Event = require('../models/event.js');

const validate = require('../validators/event.js');
let allUsers = {};



//router.get("/", authRequire, function (req, res) {
router.get("/", function (req, res) {

  User.find({}).select({ _id: 1, firstName: 1, lastName: 1 })
    .then((users) => {
      console.log("Поиск завершен", users);

      allUsers = users; //Кешируем список пользователей

      res.render("formCreateEvent",{users: allUsers});
    })
    .catch((err) => { console.log(err); });
});

router.post("/", function (req, res) {
  console.log(req.body);

  const paramsEvent = {
    title: req.body.title,
    place: req.body.place,
    userList: req.body.userList
  }

  const resultValidate = validate.formCreateEvent( paramsEvent );
   console.log( resultValidate );


   if ( Object.keys( resultValidate ).length ) {
     console.log("Есть ошибки");
     resultValidate.users = allUsers;

     return res.render('formCreateEvent', resultValidate );
    }

  let newEvent = new Event(paramsEvent);

  newEvent.save()
    .then( (ev) => {
      console.log("Событие создано", ev);

      res.redirect("/");
    } )
    .catch(err => {console.log(err)});


});

module.exports = router;
