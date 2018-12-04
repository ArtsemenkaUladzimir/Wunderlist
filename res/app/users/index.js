module.exports = angular.module('users', [

])
  .config(($routeProvider) => {
    $routeProvider
      .when('/user/all', {
        template: require('./userList/userList.pug'),
        controller: 'UserListCtrl'
      })
      .when('/user/signup', {
        template: require('./signup/signup.pug'),
        controller: 'SignupCtrl'
      })
  })
  .factory('UserService', require('./userService'))
  .controller('UserListCtrl', require('./userList/userListCtrl'))
  .controller('SignupCtrl', require('./signup/signupCtrl'));
