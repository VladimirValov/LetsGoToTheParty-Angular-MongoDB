function EventListController($http) {
  const self = this;

  this.targetUser = "5927c4ecedc48b0518abdcdd";

  $http.get('/' + this.targetUser + "/events").then(function (response) {
    console.log(response);
    self.events = response.data
  });
}


angular.module('eventList').component('eventList', {
  templateUrl: 'event-list/event-list.template.html',
  controller: ['$http', EventListController]
})
