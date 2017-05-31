
function inviteDetailController($uibModal, $document) {
  var self = this;

  self.items = ['item1', 'item2', 'item3'];

  self

  this.openComponentModal = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return self.invite;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      self.selected = selectedItem;
    });
  };

}

angular.module('inviteDetail').component('inviteDetail', {
  templateUrl: 'components/home-page/invite-detail/invite-detail.template.html',
  controller: inviteDetailController,
  bindings: {
    invite: '='
  }
});



angular.module('inviteDetail').component('modalComponent', {
  templateUrl: 'components/home-page/invite-detail/myModalContent.html',
  bindings: {
    invite: '=',
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  controller: function () {
    var self = this;

    self.$onInit = function () {
      self.items = self.resolve.items;
      self.selected = {
        item: self.items[0]
      };
    };

    self.ok = function () {
      self.close({$value: self.selected.item});
    };

    self.cancel = function () {
      self.dismiss({$value: 'cancel'});
    };
  }
});
