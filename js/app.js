'use strict';

var app = angular.module("program", [
	'userFilters',
	'userDirectives',
	'userServices',
	'userControllers',
	'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');



	$stateProvider
		.state('users', {
			url:'/',
			templateUrl: 'templates/users.html',
			controller:'UsersCtrl as vm',
			resolve:{
				user_list:function(userService){
					return userService.getAll();
				}
			}
		})
		.state('users.add', {
			url:'add',
			templateUrl: 'templates/edituser.html',
			controller: 'AddUserCtrl as vm'
		})
		.state('users.user', {
			url:'user/{user}',
			templateUrl: 'templates/user.html',
			controller: 'ViewUserCtrl as vm'
		})
		.state('users.user_edit', {
			url:'user/{user}/edit',
			templateUrl: 'templates/edituser.html',
			controller: 'EditUserCtrl as vm'
		});
});