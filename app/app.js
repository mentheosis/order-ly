var orderlyApp = angular.module('orderlyApp',[
  'angoose.client',
  'ngRoute',
  'orderlyControllers'
]);

orderlyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'task-list.html',
        controller: 'taskListCtrl'
      }).
      when('/create-task', {
        templateUrl: 'create-task.html',
        controller: 'createTaskCtrl'
      }).
      when('/login', {
        templateUrl: 'login.html'
      }).
      when('/signup', {
        templateUrl: 'signup.html'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);
