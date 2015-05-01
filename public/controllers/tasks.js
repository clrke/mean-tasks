'use strict';

/* jshint -W098 */
angular.module('mean.tasks').controller('TasksController', ['$scope', '$location', 'Global', 'Tasks',
  function($scope, $location, Global, Tasks) {
    $scope.global = Global;
    $scope.package = {
      name: 'tasks'
    };

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var task = new Tasks({
          title: this.title,
          content: 'New Content',
          done: false
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

    $scope.find = function() {
      Tasks.query(function(tasks) {
        $scope.tasks = tasks;
      });
    };
  }
]);
