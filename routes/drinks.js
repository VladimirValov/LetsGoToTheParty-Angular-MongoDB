var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Drinks = require('../models/drinks.js');
const validate = require('../validators/drinks.js');

let allDrinks;


router.get("/", function (req, res) {


  Drinks.find({})
    .then(list => {
        console.log("Успешно найдено", list);

        let drinks = list.map(el => {
          return {
            drink_id : el._id,
            name: el.name
           }
        })

        res.send(drinks);
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

  new Drinks( paramsDrink ).save()
    .then( (drink) => {
        console.log("Успешно сохранено", drink);
        res.redirect('/drinks');
    })
    .catch( (err) => { console.log(err) } );
});

module.exports = router;
