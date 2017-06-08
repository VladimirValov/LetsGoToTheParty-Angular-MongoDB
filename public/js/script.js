'use strict';

angular.module('partyApp',[
  'ui.bootstrap',
  'ui.router',
  'core',
  'components'
]);

angular.module('components',['formAuth', 'homePage', 'formRegister']);

angular.module('core', ['core.auth']);

angular.module('formAuth',['core.auth']);

angular.module('formRegister',['core.auth']);

angular.module('homePage',[
  'userNav',
  'inviteList',
  'inviteDetail',
  'eventList',
  'eventDetail'
]);

angular.module('core.auth',[]);

angular.module('eventDetail', []);

angular.module('eventList',[]);

angular.module('inviteDetail', []);

angular.module('inviteList', []);

'use strict';

angular.module('userNav', []);

angular.module('partyApp').config(function($stateProvider) {

  var authState = {
    name: 'login',
    url: '/login',
    component: 'formAuth'
  }
  var registerState = {
    name: 'register',
    url: '/register',
    component: 'formRegister'
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
    template: '<h2>Вы покинули сайт</h2> <a ui-sref="login">Войти</a>',
    onEnter: logoutFunc
  }

  $stateProvider.state(authState);
  $stateProvider.state(registerState);

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



angular.module('homePage').component('homePage', {
  templateUrl: 'components/home-page/home-page.template.html',
  controller: 'HomePageController'
});



angular.module('homePage').controller('HomePageController', function (Auth, $state, $http) {

  const self = this;

  self.user = Auth.getUser()
  console.log('home-page');
  console.log(this.user);

  if (!self.user) {
    console.log("Требуется авторизация!");
    $state.go('login');
  }
  else {
    // Запрос всех приглашений пользователя

    $http.get('/users/' + self.user.id + "/invites").then(function (response) {
      console.log(response.data);
      self.allInvites = response.data;
    });


    $http.get('/users/' + self.user.id + "/events").then(function (response) {
      console.log(response);
      self.events = response.data
    });
  }



});

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

function EventDetailController() {
  const ctrl = this;
}

angular.module('eventDetail').component('eventDetail', {
  templateUrl: "components/home-page/event-detail/event-detail.template.html",
  controller: EventDetailController,
  bindings: {
    event: '='
  }
});

angular.module('eventList').component('eventList', {
  templateUrl: 'components/home-page/event-list/event-list.template.html',
  controller: EventListController,
  bindings: {
    events: '<',
    author: '<'
  }
})



function EventListController($uibModal, $state) {
  var self = this;
  console.log( self.author );

  this.openComponentModal = function () {
    console.log( self.author );

    var modalInstance = $uibModal.open({
      animation: true,
      component: 'eventModal',
      resolve: {
        author: function () {
          return self.author;
        }
      }
    });

    modalInstance.result.then(function () {
      $state.reload()
    });
  };
}

angular.module('eventList').component('eventModal', {
  templateUrl: 'components/home-page/event-list/myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: modalComponentController
});

function modalComponentController ($http) {
  var self = this;

  $http.get('/users').then(function (response) {
    console.log(response.data);
    self.users = response.data
  });

  $http.get('/drinks').then(function (response) {
    console.log(response.data);

    self.drinks = response.data;
  });


  self.$onInit = function () {
  };

  self.ok = function (newEvent) {

    newEvent.author_id = self.resolve.author;
    console.log('newEvent', newEvent);

    $http.post('/events/', newEvent ).then(function (response) {
      console.log(response.data);
    });

  self.close({$value: self.newEvent});
  };

  self.cancel = function () {
    self.dismiss({$value: 'cancel'});
  };
}


/*
function EventListController($uibModal, $document, $state) {
  var self = this;

  this.createEventModal = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      component: 'createEvent',
      resolve: {
        invite: function () {
          return self.invite;
        }
      }
    });

    modalInstance.result.then(function () {
      $state.reload()
    });
  };

}




angular.module('eventList').component('createEvent', {
  templateUrl: 'components/home-page/invite-detail/myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: modalComponentController
});

function modalComponentController ($http) {
  var self = this;

  self.$onInit = function () {
    self.invite = self.resolve.invite;
    self.answer = {};
  };

  self.ok = function () {
/*
    let inviteId = self.invite.invites[0]._id;

    console.log(self.answer.drinks);
    delete self.answer.drinks._id;
    console.log(self.answer.drinks);

    $http.post('/invite/' + inviteId, self.answer).then(function (response) {
      console.log(response.data);
    });

    self.close({$value: self.answer});
  };

  self.cancel = function () {
    self.dismiss({$value: 'cancel'});
  };
}
*/

angular.module('inviteDetail').component('inviteDetail', {
  templateUrl: 'components/home-page/invite-detail/invite-detail.template.html',
  controller: InviteDetailController,
  bindings: {
    invite: '<',
    labelbutton: '<'
  }
});


function InviteDetailController($uibModal, $document, $state) {
  var self = this;

  this.openComponentModal = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      component: 'modalComponent',
      resolve: {
        invite: function () {
          return self.invite;
        }
      }
    });

    modalInstance.result.then(function () {
      $state.reload()
    });
  };
}

angular.module('inviteDetail').component('modalComponent', {
  templateUrl: 'components/home-page/invite-detail/myModalContent.html',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: ModalComponentController
});

function ModalComponentController ($http) {
  var self = this;

  self.$onInit = function () {
    self.invite = self.resolve.invite;
    self.answer = {};
  };

  self.ok = function () {
    let inviteId = self.invite.invites[0]._id;

    if(!self.answer.isReady){
      self.answer.drinks = [];
    }

    if(self.answer.isReady){
      console.log(self.answer.drinks);
      delete self.answer.drinks._id;
      console.log(self.answer.drinks);
    }



    $http.post('/invite/' + inviteId, self.answer).then(function (response) {
      console.log(response.data);
    });

    self.close({$value: self.answer});
  };

  self.cancel = function () {
    self.dismiss({$value: 'cancel'});
  };
}

function InviteListController() {
  'use strict';

  this.$onInit = function() {
    console.log('this.invites', this.invites);
    console.log('this.answered', this.answered);

    this.labelbutton = "Изменить решение"

    if( this.isready == null) {
      this.labelbutton = "Ответить на приглашение";
    }
  }

}


angular.module('inviteList').component('inviteList', {
  templateUrl: 'components/home-page/invite-list/invite-list.template.html',
  controller: [ InviteListController ],
  bindings: {
    invites: '<',
    isready: '<'
  }
});

function UserNavigateController(Auth) {
  console.log('this.mame');
  console.log(this.name);
}


angular.module('userNav').component('userNav', {
    templateUrl: 'components/home-page/user-nav/user-nav.template.html',
    controller: UserNavigateController,
    bindings: {
      name: '='
    }
  });
