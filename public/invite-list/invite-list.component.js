'use strict';

angular.
  module('inviteList').
  component('inviteList', {
    templateUrl: 'invite-list/invite-list.template.html',
    controller: function InviteListController() {
      this.userName = "Vladimir";

      this.myInviteList = [
        {
          title: 'Вечеринка 1',
          place: 'Шумное место',
          invites: [
            {
              targetUser_id: "5927c4ecedc48b0518abdcdd",
              userName: 'Vladimir Valov',
              _id: "5927c60bedc48b0518abdce5",
              answered: false,
              drinks: []
            }
          ]
        },{
          title: 'Вечеринка 2',
          place: 'Тихое место',
          invites: [
            {
              targetUser_id: "5927c4ecedc48b0518abdcdd",
              userName: 'Vladimir Valov',
              _id: "5927c60bedc48b0518abdce5",
              answered: false,
              drinks: []
            }
          ]
        }
      ]

    }
  });
