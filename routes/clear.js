var express = require('express');
var router = express.Router();


app.get("/clear", function (req, res) {
  console.log("Восстановить исходное состояние");
  People.remove({}).
    then( ()=>{ res.write("Database Clean"); res.end(); } );
});


module.exports = router;
