function FormAuthController($http, Auth,  $state) {
  console.log('Auth.getUser()');
  console.log(Auth.getUser());

  this.login = function(user) {
    console.log('Auth.getUser()');
    console.log(Auth.getUser());

    console.log(user);

    $http.post('/login', user).then(function(response) {
      console.log(response.data);


      if(response.data.user_id) {
        console.log(response.data.user_id);

        Auth.setUser(response.data);
        $state.go('home');

      }
    })
  }
}


angular.module('formAuth').component('formAuth', {
  templateUrl: 'components/form-auth/form-auth.template.html',
  controller: FormAuthController
})
