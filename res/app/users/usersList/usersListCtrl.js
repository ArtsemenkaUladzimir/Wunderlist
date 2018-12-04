module.exports = ($scope, User) => {
  $scope.users = User.getUsers();
  console.log($scope.users);
};
