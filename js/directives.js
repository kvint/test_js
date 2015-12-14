'use strict';

angular.module('userDirectives', [])
	.directive('userCard', function(){
	return {
		restrict: 'E',
		templateUrl:'templates/usercard.html',
		scope: {
			user:'=',
			onSelect:'&'
		},
		controller: function($scope){
			$scope.select = function () {
				$scope.onSelect($scope.user);
			}
		}
	};
});