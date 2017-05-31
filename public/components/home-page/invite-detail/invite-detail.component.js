
function inviteDetailController() {
  const ctrl = this;
}

angular.module('inviteDetail').component('inviteDetail', {
  templateUrl: 'components/home-page/invite-detail/invite-detail.template.html',
  controller: inviteDetailController,
  bindings: {
    invite: '='
  }
});
