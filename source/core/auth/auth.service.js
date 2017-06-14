angular.module('core.auth').factory('Auth', [ function() {
  var user;

  return {
    getUser: function() {
      return user;
    },
    setUser: function( data ) {
      user = data;
      console.log( "Пользователь сохранен");
    }
  }
}]);
