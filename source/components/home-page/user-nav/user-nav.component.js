angular.module('userNav').component('userNav', {
    templateUrl: 'components/home-page/user-nav/user-nav.template.html',
    controller: UserNavigateController,
    bindings: {
      name: '='
    }
  });

  function UserNavigateController(Auth) {
    console.log('this.mame');
    console.log(this.name);
  }
