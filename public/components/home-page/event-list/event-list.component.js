function EventListController($http) {


}


angular.module('eventList').component('eventList', {
  templateUrl: 'components/home-page/event-list/event-list.template.html',
  controller: ['$http', EventListController],
  bindings: {
    events: '<'
  }
})
