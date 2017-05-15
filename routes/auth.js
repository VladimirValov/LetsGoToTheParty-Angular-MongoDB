var express = require('express');
var router = express.Router();


router.get("/", function (req, res) {
  console.log("Запрос авторизации");
   res.render('formAuth', {} );
});

router.post("/", function (req, res) {
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

module.exports = router;
