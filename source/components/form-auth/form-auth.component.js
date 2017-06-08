angular.module('formAuth').component('formAuth', {
  templateUrl: 'components/form-auth/form-auth.template.html',
  controller: FormAuthController
})


function FormAuthController($http, Auth, $state) {

  this.authError;

  this.login = function(user) {
    console.log('Auth.getUser()');
    console.log(Auth.getUser());

    console.log(user);

    $http.post('/login', user).then(function(response) {
      console.log(response.data);

      if(response.data.id) {
        Auth.setUser(response.data);
        $state.go('home');
      }
    }).catch(err => {
      console.log(err.data);
      this.authError = err.data;
    })
  }
}
