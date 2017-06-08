
const validator = require('../utils/validator.js')
const checkField = validator.checkField;
const checkFieldEqual = validator.checkFieldEqual;

const rules = {
  email: /^[\w\d]{2, }\.\w+$/,
  alphabet: /\]{3, 20}/,
  alphaNum: /[\d\w]{3,20}/,
  alphaNumSpace: /[\d\w]{3,20}/
}


function formRegister (user) {
  console.log(user);

  const errorValidate = {};

  checkField( "email", user.email, rules.email, errorValidate );
  checkField( "firstName", user.firstName, rules.alphabet, errorValidate );
  checkField( "lastName", user.lastName, rules.alphabet, errorValidate );
  checkField( "password", user.password, rules.alphaNum, errorValidate );

  //checkFieldEqual ("password", user.password, user.passwordRepeat, errorValidate, "Пароли не совпадают" )

  console.log("Валидация завершена");
  return errorValidate;
}


function formLogin (user) {
  console.log(user);

  const errorValidate = {};

  checkField( "email", user.email, rules.email, errorValidate );
  checkField( "password", user.password, rules.alphaNum, errorValidate );

  console.log("Валидация завершена");
  return errorValidate;
}


module.exports = {
  formRegister: formRegister,
  formLogin: formLogin
}
