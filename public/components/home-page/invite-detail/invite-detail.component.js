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
