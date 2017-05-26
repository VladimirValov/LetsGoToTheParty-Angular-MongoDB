'use strict';

angular.
  module('userNav').
  component('userNav', {
    templateUrl: 'user-nav/user-nav.template.html',
    controller: function UserNavigateController() {
      this.userName = "Vladimir";
    }
  });
