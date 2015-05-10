'use strict';

angular.module('mean.tasks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('tasks example page', {
      url: '/tasks/example',
      templateUrl: 'tasks/views/index.html'
    });
    $stateProvider.state('all tasks', {
      url: '/tasks',
      templateUrl: 'tasks/views/list.html'
    });
    $stateProvider.state('create task', {
      url: '/tasks/create',
      templateUrl: 'tasks/views/create.html'
    });
    $stateProvider.state('report task', {
      url: '/tasks/report',
      templateUrl: 'tasks/views/report.html'
    });
  }
]);
