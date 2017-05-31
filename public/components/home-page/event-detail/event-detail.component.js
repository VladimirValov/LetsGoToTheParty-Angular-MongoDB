function EventDetailController() {
  const ctrl = this;
}

angular.module('eventDetail').component('eventDetail', {
  templateUrl: "/event-detail/event-detail.template.html",
  controller: EventDetailController,
  bindings: {
    event: '='
  }
});
