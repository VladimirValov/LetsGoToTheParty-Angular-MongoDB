function InviteListController($http, Auth) {
  'use strict';

  const self = this;

  console.log('iduser');
  console.log('this', self);


  this.$onInit = function() {
    console.log('this', this);
    console.log('this.iduser', this.iduser);

    $http.get('/' + self.iduser + "/invites").then(function (response) {
      console.log(response.data);
      self.invites = response.data;
    });
  }





}


angular.module('inviteList').component('inviteList', {
  templateUrl: 'components/home-page/invite-list/invite-list.template.html',
  controller: ['$http', InviteListController ],
  bindings: {
    iduser: '<'
  }
});
