var wunderlistServices = angular.module('wunderlistServices', [
	'ngResource'
]);

wunderlistServices.factory('User', ['$resource',
 function ($resource) {
	return $resource('users/:userId', {}, {
		getUsers: {method: 'GET', params: {userId: ''}, isArray: true}
	});
}]);

wunderlistServices.service('UserDel', ['$http', '$q',
 function ($http, $q) {
 	return ({
 		removeUser: removeUser,
 		addUser: addUser,
 		getUsers: getUsers
 	});

 	function removeUser (id) {
 		return $http({
 			method: 'delete',
 			url: 'users/' + id + '/deleteuser',
 			params: {
 				userId: id
 			}
 		});
 	}

 	function addUser (name, email) {
 		return $http({
 			method: 'post',
 			url: 'adduser',
 			params: {
 				username: name,
 				useremail: email
 			}
 		});
 	}

 	function getUsers () {
 		return $http({
 			method: 'get',
 			url: 'users'
 		});
 	}
 }]);

wunderlistServices.service('List', ['$http', '$q', 
 function ($http, $q){
	return ({
		addList: addList,
		getList: getList,
		removeList: removeList,
		sharedList: sharedList
	});

	function addList (id, title) {
		return $http({
			method: 'post',
			url: '/users/' + id + '/addlist',
			params: {
				title: title,
				userId: id
			}
		});
	}

	function getList (userId, listId) {
		return $http({
			method: 'get',
			url: '/users/' + userId + '/' + listId
		});
	}

	function removeList (userId, listId) {
		return $http({
			method: 'delete',
			url: '/users/' + userId + '/' + listId + '/removelist',
			params: {
				userId: userId
			}
		});
	}

	function sharedList (userId, listId) {
		return $http({
			method: 'put',
			url: '/users/' + userId + '/' + listId + '/sharedlist',
			params: {
				userId: userId,
				listId: listId
			}
		});
	}
}]);

wunderlistServices.service('Task', ['$http', '$q', 
 function ($http, $q) {
	return ({
		getTasks: getTasks,
		addTask: addTask,
		removeTask: removeTask
	});

	function getTasks (listId) {
		return $http({
			method: 'get',
			url: '/tasks',
			params: {
				listId: listId
			}
		});
	}

	function addTask (owner, listId, content) {
		return $http({
			method: 'post',
			url: '/tasks/addtask',
			params: {
				owner: owner,
				listId: listId,
				content: content
			}
		});
	}

	function removeTask (taskId, listId) {
		return $http({
			method: 'delete',
			url: '/tasks/removetask',
			params: {
				taskId: taskId,
				listId: listId
			}
		});
	}
}]);