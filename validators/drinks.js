
const validator = require('../utils/validator.js')
const checkField = validator.checkField;
const checkFieldArray = validator.checkFieldArray;


const rules = {
  email: /^[\w\d]{2, }\.\w+$/,
  alphabet: /\]{3, 20}/,
  alphaNum: /[\d\w]{3,20}/,
  alphaNumSpace: /[\d\w]{3,20}/
}


function formCreateEvent ( event ) {
  console.log("Валидация");
  console.log( event );

  const errorValidate = {};

  checkField( "title", event.title, rules.alphaNumSpace, errorValidate );
  checkField( "place", event.place, rules.alphaNumSpace, errorValidate );

  checkFieldArray( "userList", event.userList, errorValidate, "Выберите список участников" );

  console.log("Валидация завершена");
  return errorValidate;
}


function formInvite ( invite ) {
  console.log("Валидация");
  console.log( invite );

  const errorValidate = {};

  checkField( "isReady", invite.isReady, rules.alphaNumSpace, errorValidate );
  //checkFieldArray( "drinks", invite.drinks, errorValidate, "Выберите список напитков" );

  console.log(errorValidate);
  console.log("Валидация завершена");

  return errorValidate;
}


module.exports = {
  formCreateEvent: formCreateEvent,
  formInvite: formInvite
}
