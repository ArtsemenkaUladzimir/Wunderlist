var wunderlistCtrl = angular.module('wunderlistCtrl', ['wunderlistServices']);

wunderlistCtrl.controller('usersCtrl', ['$scope', 'User',
	function ($scope, User) {
		$scope.users = User.getUsers();
		console.log($scope.users);
	}
]);

wunderlistCtrl.controller('newUserCtrl', ['$location', '$scope', 'UserDel',
	function ($location, $scope, UserDel) {
		$scope.addUser = function () {
			UserDel.addUser($scope.username, $scope.useremail).then(function () {
				$location.path("/users");
			});
		}
	}
]);

wunderlistCtrl.controller('userDetCtrl', ['$scope', '$location', 'User', '$routeParams', 'UserDel', 'List',
	function ($scope, $location, User, $routeParams, UserDel, List) {
		$scope.userId = $routeParams.userId;
		$scope.lists = [];
		$scope.shared = [];
		$scope.user = User.get({userId: $scope.userId}, function (user) {
			$scope.listsId = user.list;
			$scope.sharedId = user.shared;

			$scope.listsId.forEach(function (cur, index, arr) {
				List.getList($scope.userId, cur).then(function (data) {
					if (data.data) {
						$scope.lists.push(data.data);
						console.log(data);
					}
				});
			});

			$scope.sharedId.forEach(function (cur, index, arr) {
				List.getList($scope.userId, cur).then(function (data) {
					if (data.data) {
						$scope.shared.push(data.data);
						console.log(data);
					}
				});
			});

			// $location.path('/users/' + $scope.userId);
		});

		$scope.removeUser = function() {
			event.preventDefault();
			var confirmation = confirm('Are you sure you want to delete this user?');

			if(confirmation) {
				UserDel.removeUser($scope.userId).then(function () {
					$location.path('/users');
				});
			}
		}
	}
]);

wunderlistCtrl.controller('createListCtrl', ['$scope', 'List', '$routeParams', '$location',
	function ($scope, List, $routeParams, $location) {
		$scope.addList = function() {
			event.preventDefault();

			List.addList($routeParams.userId, $scope.title).then(function (data) {
				$location.path('/users/' + $routeParams.userId);
			});
		}
	}
]);

wunderlistCtrl.controller('listCtrl', ['$scope', 'User', 'List', '$routeParams', '$location', 'Task',
	function ($scope, User, List, $routeParams, $location, Task) {
		$scope.removeList = function () {
			event.preventDefault();
			var confirmation = confirm('Are you sure you want to delete this list?');

			if(confirmation) {
				List.removeList($routeParams.userId, $routeParams.listId).then(function (data) {
					$location.path('/users/' + $routeParams.userId);
				});
			}
		}

		List.getList($routeParams.userId, $routeParams.listId).then(function (response) {
			$scope.list = response.data;
		});

		$scope.users = User.getUsers();

		$scope.addToShared = function () {
			event.preventDefault();

			List.sharedList(event.toElement.pathname.slice(1), $routeParams.listId);
		}

		$scope.addTask = function () {
			event.preventDefault();

			Task.addTask($routeParams.userId, $routeParams.listId, $scope.content).then(function (response) {
				Task.getTasks($routeParams.listId).then(function (response) {
					if (response.data) {
						$scope.tasks = response.data;
						$scope.content = '';
					}
				});
			});
		}

		Task.getTasks($routeParams.listId).then(function (response) {
			if (response.data) {
				$scope.tasks = response.data;
			}
		});

		$scope.removeTask = function () {
			event.preventDefault();
			Task.removeTask(this.task.task._id, $routeParams.listId).then(function (response) {
				if (response.data) {
					Task.getTasks($routeParams.listId).then(function (response) {
						if (response.data) {
							$scope.tasks = response.data;
						}
					});
				}
			});
		}
	}
]);