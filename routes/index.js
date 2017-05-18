const express = require('express');
const router = express.Router();

const authRequire = require('../middleware/authRequire.js');

/* GET home page. */
router.get('/', authRequire, function(req, res, next) {
  let user = req.user;

  if (user)
    res.render('index', { userName: user.userName });
  else {
    console.log("Пользователь не авторизован");
    res.redirect("/login");
  }
});

module.exports = router;
