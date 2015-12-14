'use strict';

var userControllers = angular.module('userControllers', ['userServices', 'ui.router']);

userControllers.controller('ViewUserCtrl',
	/**
	 * @param $scope
	 * @param {UserService} userService
	 * @param $state
	 */
	function ($scope, userService, $state) {
		$scope.state = $state;
		$scope.user = userService.findUser($state.params.user);

		this.edit = function (user) {
			$scope.state.go('users.user_edit', {user:user._id.$oid});
		};
		this.deleteUser = function(user){
			if(confirm("Are you sure?")){
				userService.deleteUser(user).then(function(){
					$state.go('users');
				}, function(err){
					console.log(err);
				});
			}
		};
	}
);

userControllers.controller('EditUserCtrl',
	/**
	 * @param $scope
	 * @param {UserService} userService
	 * @param $state
	 */
	function ($scope, userService, $state) {

		$scope.enabledCancel = true;
		$scope.enabledDelete = true;
		$scope.user = userService.findUser($state.params.user);
		$scope.editingUser = angular.copy($scope.user);

		this.save = function () {

			if(!$scope.editUserForm.$dirty){
				this.cancel();
				return;
			}

			if(!$scope.editUserForm.$invalid){
				$scope.user = $scope.editingUser;
				userService.updateUser($scope.user).then(this.goBack.bind($scope), function(err){
					console.log(err);
				});
			}
		};

		this.cancel = function () {
			$state.go('users.user', {user:$state.params.user});
		};

		this.goBack = function () {
			$state.go("users.user", {user:$scope.user._id.$oid});
		}
	}
);

userControllers.controller('AddUserCtrl',
	/**
	 * @param $scope
	 * @param {UserService} userService
	 * @param $state
	 */
	function ($scope, userService, $state) {
		$scope.state = $state;
		this.save = function(user){
			if(!$scope.editUserForm.$dirty) return;

			if(!$scope.editUserForm.$invalid) {
				var that = this;
				userService.insertUser(user).then(function () {
					that.goBack();
				}, function (err) {
					console.log(err);
				});
			}
		};
		this.cancel = function(){
			$scope.goBack();
		};
		this.goBack = function () {
			$scope.state.go('users');
		}
	}
);

userControllers.controller("UsersCtrl",
	/**
	 * @param $scope
	 * @param $state
	 * @param {UserService} userService
	 * @param user_list
	 */
	function($scope, $state, userService, user_list){
		$scope.loading = true;
		$scope.data = user_list;

		this.selectUser = function (user) {
			$state.go("users.user", {user:user._id.$oid});
		}
	}
);

