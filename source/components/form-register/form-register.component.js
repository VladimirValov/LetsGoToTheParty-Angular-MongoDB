angular.module('formRegister').component('formRegister', {
  templateUrl: 'components/form-register/form-register.template.html',
  controller: FormRegisterController
})

function FormRegisterController($http, $state) {
  this.errorValidate ;

  this.register = function(user) {
    console.log(user);

    $http.post('/register', user).then(response => {
      console.log('response',response);

      $state.go('home');

    }).catch(err => {
      console.log(err);
      console.log(err.data);
      this.errorValidate = err.data
    });
  }

}
