function InviteListController($http) {
  'use strict';

  const self = this;

  this.targetUser = "5927c4ecedc48b0518abdcdd";

  $http.get('/' + this.targetUser + "/invites").then(function (response) {
    console.log(response.data);

  self.invites = response.data;
  });
}


angular.module('inviteList').component('inviteList', {
  templateUrl: 'invite-list/invite-list.template.html',
  controller: ['$http', InviteListController ]
});
