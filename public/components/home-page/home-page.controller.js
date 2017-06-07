

angular.module('homePage').controller('HomePageController', function (Auth, $state, $http) {

  const self = this;

  self.user = Auth.getUser()
  console.log('home-page');
  console.log(this.user);

  if (!self.user) {
    console.log("Требуется авторизация!");
    $state.go('login');
  }

  // Запрос всех приглашений пользователя

  $http.get('/users/' + self.user.id + "/invites").then(function (response) {
    console.log(response.data);
    self.allInvites = response.data;
  });


  $http.get('/users/' + self.user.id + "/events").then(function (response) {
    console.log(response);
    self.events = response.data
  });

});
