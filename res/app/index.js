require.ensure([], (require) => {
  require('angular');
  require('angular-route');

  require('../common/styles/reset.scss');
  require('../common/styles/font-face.scss');
  require('../common/styles/main.scss');

  angular.module('app', [
    'ngRoute',
    require('./users').name
  ])
    .config(($routeProvider, $locationProvider) => {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .otherwise({
          redirectTo: '/home'
        })
    })
});
