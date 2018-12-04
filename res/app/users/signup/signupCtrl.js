module.exports = ($location, $scope, UserService) => {
  $scope.addUser = () => {
    UserService.addUser($scope.username, $scope.useremail)
      .then(() => {
        $location.path("/users");
      });
  }
};
