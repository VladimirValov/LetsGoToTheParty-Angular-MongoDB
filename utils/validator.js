

function checkField(fieldName, field, ruleName, error) {
  console.log(field);

  let message = "";

  if ( !field ) {
    message  = "Поле " + fieldName + " не заполнено!" ;
  }
/*
  else if ( !ruleName.test( field )  ) {
    message = "Поле " + fieldName + " в неверном формате!";
  }
  console.log("ruleName.test( field )");
  console.log(ruleName);
  console.log(ruleName.test( field ));
*/

  if (message) {
    error[ fieldName ] =  message;
    console.log( message );
  }
}


function checkFieldEqual(errName, field1, field2, error, messageError ) {
   if ( field1 != field2 ) {
    error[ errName ] = messageError;
  }
}

module.exports = {
  checkField: checkField,
  checkFieldEqual: checkFieldEqual
}
