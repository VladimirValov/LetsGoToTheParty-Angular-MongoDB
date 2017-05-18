var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/users.js');


router.get('/:userName', function(req, res) {
  userName = req.params.userName;
  console.log('Получен запрос по адресу ', req.url);
  console.log("req.session.idUser = " + req.session.idUser);
  res.render('formGoParty', {
    helloUser: "Здравствуйте!" + req.session.idUser
  });

  /*
  User.findOne({ userName: userName }).
    then( (user) => {
      console.log("Поиск завершен",user);

  res.render('formGoParty', {
    helloUser: "Здравствуйте!" + user.userName
//    ,
//    youGo : (user.youGo) ?"value=" + user.youGo : "",
//    youDrink :(user.youDrink) ?"value=" + user.youDrink : ""
  });
  });

  */


});

router.post('/*', function(req, res) {
  console.log("поступил запрос POST ", req.body);

  let people = new People( req.body );

   people.save( (err, people) => {
     if(err) return console.log(err);
     console.log("Успешно записано", people);
   });

   res.redirect("/answer");
});


router.get("/", function (req, res) {
console.log("Поиск начался");
People.find({}).
  then( (result) => {
    console.log("Поиск завершен", result);
    res.render('allAnswer', { items: result } );
  });
});

module.exports = router;
