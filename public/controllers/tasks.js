'use strict';

/* jshint -W098 */
angular.module('mean.tasks').controller('TasksController', ['$scope', '$location', 'Global', 'Tasks',
	function($scope, $location, Global, Tasks) {
		$scope.global = Global;
		$scope.package = {
			name: 'tasks'
		};
		$scope.tasksTab = 0;

		$scope.filterByTab = function () {
			if($scope.tasksTab == 2)
				return null;

			return {
				done: $scope.tasksTab == 1
			}
		}
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

		$scope.update = function (task) {
			task.$update(function (response) {
				return response;
			});
		}

		$scope.find = function() {
			Tasks.query(function(tasks) {
				$scope.tasks = tasks;
			});
		};
	}
	]);
