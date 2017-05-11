'use strict';
const fs = require('fs');
const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

//MONGOOSE
const mongoose = require('mongoose');
const peopleSchema = mongoose.Schema({
   youGo: Boolean,
   youDrink: String,
   youName: String
});
const People = mongoose.model('People', peopleSchema);

const db = mongoose.connection,
      urlDB = 'mongodb://goparty:goparty@ds161487.mlab.com:61487/go-party';

//EXPRESS

app.use( bodyParser.json() );

app.get('/*', function(req, res) {
  res.setHeader('Context-Type', 'text/html; charset=utf8');
  console.log('Получен запрос по адресу ', req.url);

  let fileName = (req.url == "/") ? 'app/index.html' : 'app' + req.url;

  if( fs.existsSync(fileName) ) {
    let content =fs.readFileSync(fileName, {encoding: 'utf-8'});
    res.write( content );
  }
  else {
    res.status(404);
  }
  res.end();
});


app.post("/save", function (req, res ) {
  console.log("поступил запрос POST ", req.body);

  let people = new People( req.body );

   people.save( (err, people) => {
     if(err) return console.log(err);
     console.log("Успешно записано", people);
   });

   res.end();
});

//Connect to DB and Start Webserver

mongoose.connect( urlDB );
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function() {
  console.log('Mongoose connected to mLab');

  app.listen(7000, function () {
    console.log("partyApp listening on port 7000!")
  })
});
