angular.module('usersCtrl', [
  'UserService'
])
  .run(['$templateCache', $templateCache => {
    $templateCache.put('users/usersList/usersList.pug',
      require('./usersList.pug')
    )
  }])
  .controller(require('./usersListCtrl'));
