var express = require('express');
var router = express.Router();


app.get("/", function (req, res) {
  console.log("Восстановить исходное состояние");

  for(let i = 0; i < 10; i++) {
    let people = new People( {
      youName: "User" + i,
      youPassword: "" + i + i + i,
      youGo: "",
      youDrink: ""
    });

    people.save( (err, people) => {
       if(err) return console.log(err);
       console.log("Успешно записано", people);
    }) ;
    }
    res.redirect("/answer");
    });


    module.exports = router;
