'use strict';
const fs = require('fs');
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');
//HANDLEBARS
const exphbs = require('express-handlebars');

//MONGOOSE
const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
  youName: String,
  youPassword: String,
  youGo: Boolean,
  youDrink: String
});
const People = mongoose.model('People', peopleSchema);

const db = mongoose.connection,
      urlDB = 'mongodb://goparty:goparty@ds161487.mlab.com:61487/go-party';

//EXPRESS
const PORT = process.env.VCAP_APP_PORT || 7000;
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/auth", function (req, res) {
  console.log("Запрос авторизации");
   res.render('formAuth', {} );
});

app.post("/auth", function (req, res) {
  console.log("Запрос авторизации", req.body);
  //console.log("Запрос авторизации", req);
  let param = req.body;
  param.error = "";

 if(!param.youName){
   console.log("Логин не заполнен!");
   param.error = "Логин не заполнен!" ;
 }
  if(!param.youPassword) {
    console.log("Логин не заполнен!");
    param.error += " Пароль не заполнен!" ;
   }

   if(param.error) {
     res.render('formAuth', { helloUser: param.error  } );
   }

   else  {
     console.log("Форма заполнена корректно");

     People.findOne({ youName: req.body.youName }).
       then( (user) => {
         console.log("Поиск завершен", user);

         if ( !user ){
           res.render('formAuth', { helloUser: "User " + req.body.youName + " is not found" } );
         }
         else if (req.body.youPassword != user.youName) {
            res.render('formAuth', {
              helloUser: "Password is not correct",
              youName: req.body.youName
             } );
         }
         else { //Success
           res.redirect("/answer/" + user.youName) ;
         }

       });
    }

});

app.get('/answer/:userLogin', function(req, res) {
  console.log('Получен запрос по адресу ', req.url);

  People.findOne({ youName: req.params.userLogin }).
    then( (user) => {
      console.log("Поиск завершен",user);

  res.render('formGoParty', {
    helloUser: "Здравствуйте!" + user.youName,
    youGo : (user.youGo) ?"value=" + user.youGo : "",
    youDrink :(user.youDrink) ?"value=" + user.youDrink : ""
  });
  });
});

app.post('/answer/*', function(req, res) {
  console.log("поступил запрос POST ", req.body);

  let people = new People( req.body );

   people.save( (err, people) => {
     if(err) return console.log(err);
     console.log("Успешно записано", people);
   });

   res.redirect("/answer");
});


app.get("/answer", function (req, res) {
console.log("Поиск начался");
People.find({}).
  then( (result) => {
    console.log("Поиск завершен", result);
    res.render('allAnswer', { items: result } );
  });
});

app.get("/clear", function (req, res) {
  console.log("Восстановить исходное состояние");
  People.remove({}).
    then( ()=>{ res.write("Database Clean"); res.end(); } );
});

app.get("/init", function (req, res) {
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


app.get("/*", function (req, res) {
res.redirect("/auth");

});

//Connect to DB and Start Webserver

mongoose.connect( urlDB );
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('Mongoose connected to mLab');

  app.listen(PORT, function () {
    console.log("partyApp listening on port 7000!")
  })
});
