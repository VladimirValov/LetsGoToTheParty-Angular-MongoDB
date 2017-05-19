const Joi = require('joi');

const registerSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(3).max(30).required(),
  lastName:  Joi.string().min(3).max(30).required(),
  password:  Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  passwordRepeat:  Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});



 function formRegister(params) {
   console.log("Validate Joi");

   return Joi.validate(params, registerSchema, function(err, value) {
     console.log(err.details[0].message);
     console.log(err);
   });

 }


 module.exports = {
   formRegister: formRegister
 }
