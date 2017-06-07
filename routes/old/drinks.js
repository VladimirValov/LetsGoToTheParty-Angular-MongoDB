var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Drink = require('../models/drinks.js');
const validate = require('../validators/drinks.js');

let allDrinks;


router.get("/", function (req, res) {


  Drink.find({})
    .then( (drinks) => {
        console.log("Успешно найдено", drinks);
        res.render('drinks', {drinks});
    })
    .catch( (err) => { console.log(err) } );

});


router.post("/", function (req, res) {
  console.log(req.body);

  const paramsDrink = {
    name: req.body.name
  }

/*
  const validateError = validate.formRegister( paramsDrink );
   console.log( validateError );

   if ( Object.keys( validateError ).length ) {
      return res.render('drinks', validateError );
    }

*/

  console.log("Форма заполнена корректно");

  new Drink( paramsDrink ).save()
    .then( (drink) => {
        console.log("Успешно сохранено", drink);
        res.redirect('/drinks');
    })
    .catch( (err) => { console.log(err) } );
});

module.exports = router;
