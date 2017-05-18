
const User = require('../models/users.js');

module.exports = function(req, res, next) {

  let idUser = req.session.idUser;
  console.log("req.session.idUser = " + idUser);

  if ( idUser ){
    User.findOne({ _id : idUser })
      .then((user) => {
        console.log("Поиск завершен", user);
        req.user = user;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  else {
    next();
  }

}
/*
    id = const zzzzz = require('zzzzz');

    User.findOne().then(user => {
      if (!user) throw new Error('Unauthorized');
      req.user = user;
      next();
    }).catch(err => {
      next(err);
    })
}
*/
