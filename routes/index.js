const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  if (req.session.cookie.id)
    req.session.cookie.id = req.session.cookie.id;

  console.log(req.session);
  res.render('index', { title: 'Express' });
});

module.exports = router;



/*
app.get("/*", function (req, res) {
res.redirect("/auth");

});

*/
