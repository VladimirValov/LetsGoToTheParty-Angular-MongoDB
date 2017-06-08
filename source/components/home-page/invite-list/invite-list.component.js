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
