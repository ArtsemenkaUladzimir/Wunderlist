var wunderlist = angular.module('wunderlist', [
	'ngRoute',
	'wunderlistCtrl'
]);

wunderlist.config(['$routeProvider', '$locationProvider',function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/views/home.html'
		})
		.when('/users', {
			templateUrl: '/views/users.html',
			controller: 'usersCtrl'
		})
		.when('/newuser', {
			templateUrl: '/views/newuser.html',
			controller: 'newUserCtrl'
		})
		.when('/users/:userId', {
			templateUrl: 'views/userdet.html',
			controller: 'userDetCtrl'
		})
		.when('/users/:userId/createList', {
			templateUrl: 'views/createlist.html',
			controller: 'createListCtrl'
		})
		.when('/users/:userId/:listId', {
			templateUrl: 'views/list.html',
			controller: 'listCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
	$locationProvider.html5Mode(true);
}]);