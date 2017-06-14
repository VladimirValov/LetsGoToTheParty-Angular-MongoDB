angular.module('partyApp').config(function($stateProvider) {
"ngInject";

  const authState = {
    name: 'login',
    url: '/login',
    component: 'formAuth'
  }

  const registerState = {
    name: 'register',
    url: '/register',
    component: 'formRegister'
  }

  const homeState = {
    name: 'home',
    url: '/',
    component: 'homePage'
    //, onEnter: checkAuth
  }

  const logoutState = {
    name: 'logout',
    url: '/logout',
    template: '<h2>Вы покинули сайт</h2> <a ui-sref="login">Войти</a>',
    onEnter: logoutFunc
  }

  $stateProvider.state(authState);
  $stateProvider.state(registerState);

  $stateProvider.state(homeState);
  $stateProvider.state(logoutState);

  let xxx = {
     $stateProvider: () => $stateProvider
}


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
