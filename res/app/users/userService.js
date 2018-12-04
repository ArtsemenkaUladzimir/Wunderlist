module.exports = ($http) => {
  function removeUser (id) {
    return $http({
      method: 'delete',
      url: 'user/' + id + '/deleteuser',
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

  return {
    removeUser,
    addUser,
    getUsers
  }
};
