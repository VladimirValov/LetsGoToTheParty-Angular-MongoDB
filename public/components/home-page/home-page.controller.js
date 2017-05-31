

angular.module('homePage').controller('HomePageController', function (Auth, $state) {



  this.user = Auth.getUser()

  if (!this.user) {
    console.log("Требуется авторизация!");
    $state.go('login');
  }

  console.log('home-page');
  console.log(this.user);
//  console.log(user.userName);
});
