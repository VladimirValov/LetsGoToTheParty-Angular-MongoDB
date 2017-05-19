const express = require('express');
const router = express.Router();

const authRequire = require('../middleware/authRequire.js');

/* GET home page. */
router.get('/', authRequire, function(req, res, next) {
  let user = req.user;
  console.log(user);

  res.render('index', { userName: user.firstName });

});

module.exports = router;
