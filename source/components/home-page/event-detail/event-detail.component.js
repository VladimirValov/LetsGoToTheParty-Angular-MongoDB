angular.module('eventDetail').component('eventDetail', {
  templateUrl: "components/home-page/event-detail/event-detail.template.html",
  controller: EventDetailController,
  bindings: {
    event: '='
  }
});

function EventDetailController() {
}
