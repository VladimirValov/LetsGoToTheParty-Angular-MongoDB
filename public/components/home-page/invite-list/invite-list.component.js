function InviteListController($http, Auth) {
  'use strict';

  const self = this;

  console.log(Auth.getUser());

  let targetUser = Auth.getUser();

  $http.get('/' + targetUser + "/invites").then(function (response) {
    console.log(response.data);
    self.invites = response.data;
  });
}


angular.module('inviteList').component('inviteList', {
  templateUrl: 'invite-list/invite-list.template.html',
  controller: ['$http', 'Auth', InviteListController ]
});
