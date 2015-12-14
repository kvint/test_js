'use strict';

angular.module("userServices", [])
	.service('userService', function($http, $q){
	var baseUrl = 'https://api.mongolab.com/api/1/databases/sf-shopping-app-stage/collections/User';
	var apiKey = '?apiKey=nWK-3jnkkQdAvAbazeLWGuYq791HDztC';

	function handleSuccess(response){
		return response.data;
	}
	function handleError(error){
		return ($q.reject("An unknown error occurred"));
	}


		/**
		 * @class
		 * @constructor
		 */
	function UserService () {}

	UserService.prototype = {

		usersCache: [],

		getAll: function () {
			var request = $http.get(baseUrl + apiKey);
			var that = this;
			return request.then(function(response){
				that.usersCache = response.data;
				return that.usersCache;
			}, handleError);
		},
		/**
		 *
		 * @param user
		 * @returns {*}
		 */
		insertUser: function (user) {
			var request = $http.post(baseUrl + '/' + apiKey, JSON.stringify(user));
			var that = this;
			return (request.then(function (response) {
				that.usersCache.push(response.data);
				handleSuccess(response);
			}, handleError));
		},
		updateUser: function(user){
			var request = $http.put(baseUrl + '/' + user._id.$oid + apiKey, user);
			var that = this;
			return (request.then(function (response) {
				var userIndex = that.findUserIndex(user._id.$oid);
				that.usersCache[userIndex] = user;
				handleSuccess(response);
			}, handleError));
		},
		deleteUser: function(user){
			var request = $http.delete(baseUrl + '/' + user._id.$oid + apiKey);
			var that = this;
			return (request.then(function (response) {
				var userIndex = that.findUserIndex(user._id.$oid);
				if(userIndex !== -1){
					that.usersCache.splice(userIndex,1);
				}
				handleSuccess(response);
			}, handleError));
		},
		findUser: function (id) {
			var idx = this.findUserIndex(id);
			return idx == -1 ? null : this.usersCache[idx];
		},
		findUserIndex: function(id){
			for(var i = 0; i < this.usersCache.length; i++){
				if(this.usersCache[i]._id.$oid == id){
					return i;
				}
			}
			return -1;
		}
	};

	return new UserService();
});
