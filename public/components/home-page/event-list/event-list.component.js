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
