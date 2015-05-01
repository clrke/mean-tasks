'use strict';

/* jshint -W098 */
angular.module('mean.tasks').controller('TasksController', ['$scope', '$location', 'Global', 'Tasks',
  function($scope, $location, Global, Tasks) {
    $scope.global = Global;
    $scope.package = {
      name: 'tasks'
    };
    $scope.create = function(isValid) {
      if (isValid) {
        var task = new Tasks({
          title: this.title,
          content: this.content
        });
        task.$save(function(response) {
          $location.path('tasks/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };
  }
]);
