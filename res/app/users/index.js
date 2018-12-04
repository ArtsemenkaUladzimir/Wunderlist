module.exports = angular.module('users', [
  require('./usersList').name
])
  .factory('UserService', require('./userService'));
