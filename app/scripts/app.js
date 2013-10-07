'use strict';

angular.module('peacemakersApp', ['ui.router', 'ngCookies'])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    $urlRouterProvider.otherwise('/404');

    $stateProvider
      .state('main', {
        url: "/",
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        access: access.management
      })
      .state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        access: access.anonymous
      })
      .state('school', {
        url: "/school",
        templateUrl: 'views/school.html',
        controller: 'SchoolCtrl',
        access: access.management
      })
      .state('not_found', {
        url: "/404",
        templateUrl: '404.html',
        access: access.public
      });

    $locationProvider.html5Mode(true);

    var interceptor = ['$location', '$q', function($location, $q) {
      function success(response) {
        return response;
      }

      function error(response) {

        if(response.status === 401) {
          $location.path('/login');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

      return function(promise) {
        return promise.then(success, error);
      }
    }];

    $httpProvider.responseInterceptors.push(interceptor);

  })
  .run(function ($rootScope, Auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      $rootScope.doingResolve = true;
      $rootScope.error = null;
      if (!Auth.authorize(toState.access)) {
        if(Auth.isLoggedIn()) $state.go('main');
        else $state.go('login');
      }
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.doingResolve = false;
    });

  });


