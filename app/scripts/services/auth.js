'use strict';

angular.module('peacemakersApp')
  .factory('Auth', function ($cookieStore, $http) {

    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        currentUser = $cookieStore.get('user') || { username: '', role: userRoles.public };

    $cookieStore.remove('user');

    function changeUser(user) {
      _.extend(currentUser, user);
    };

    return {
      authorize: function(accessLevel, role) {
        if(role === undefined)
          role = currentUser.role;

        return accessLevel.bitMask & role.bitMask;
      },
      isLoggedIn: function(user) {
        if(user === undefined)
          user = currentUser;
        return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
      },
      login: function(user, success, error) {
        $http.post('/login', user).success(function(user){
          changeUser(user);
          success(user);
        }).error(error);
      },
      logout: function(success, error) {
        $http.post('/logout').success(function(){
          changeUser({
            username: '',
            role: userRoles.public
          });
          success();
        }).error(error);
      },
      accessLevels: accessLevels,
      userRoles: userRoles,
      user: currentUser
    };

  });


angular.module('peacemakersApp')
  .factory('Users', function($http) {
    return {
      getAll: function(success, error) {
        $http.get('/users').success(success).error(error);
      }
    };
  });