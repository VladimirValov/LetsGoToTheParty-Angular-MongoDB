angular.module('partyApp').config(function($stateProvider) {

  var authState = {
    name: 'login',
    url: '/login',
    component: 'formAuth'
  }

  const homeState = {
    name: 'home',
    url: '/',
    component: 'homePage'
    //,
    //onEnter: checkAuth
  }
  const logoutState = {
    name: 'logout',
    url: '/logout',
    template: '<h2>Вы покинули сайт</h2>',
    onEnter: logoutFunc
  }

  $stateProvider.state(authState);
  $stateProvider.state(homeState);
  $stateProvider.state(logoutState);




  function checkAuth( Auth, $state ) {

    if (!Auth.getUser()) {
      console.log("Пользователь не зарегистрирован");
      $state.go('login');
    }
  }

  function logoutFunc( Auth, $state ) {

    console.log(Auth.getUser());

    Auth.setUser("");

    console.log(Auth.getUser());
  }

});
