angular.module('formRegister').component('formRegister', {
  templateUrl: 'components/form-register/form-register.template.html',
  controller: FormRegisterController
})

function FormRegisterController($http, $state) {
  this.errorValidate ;

  this.register = function(user, form) {
    console.log('form.$invalid', form.$invalid);
    console.log(form.firstName.$error.required);
    console.log(user);

    if(form.$valid) {
      $http.post('/register', user).then(response =>{
        console.log(response);
        this.errorValidate = "OKKKKKKKK"
        $state.go('home');

      }).catch(err => {
        console.log(err);
        console.log(err.data);
        this.errorValidate = err.data
      });
    }




  }

}
