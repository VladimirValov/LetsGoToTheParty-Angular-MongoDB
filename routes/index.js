const express = require('express');
const router = express.Router();

const User = require('../models/users.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  let status= "Неизвестный Пользоваетель";
  let userName = "Unknow user";

console.log("req.session.idUser = " + req.session.idUser);

 if(req.session.idUser) {
   status = "Авторизованный Пользователь";

   User.findOne({_id : req.session.idUser}).
     then( (user) => {
       console.log("Поиск завершен", user);
       console.log("Поиск завершен", user.userName);

       userName = user.userName;
       res.render('index', { title: status, userName: userName });

      });
 }
 else {
   console.log("Пользователь не авторизован");
   res.render('index', { title: status, userName: userName });
 }

});

module.exports = router;
