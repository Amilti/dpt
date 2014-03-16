app.factory('userData', function($http, $q){
	return {
		getCurrentUser: function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: '/session_user.json'}).
				success(function(data, status, headers, config){
					deferred.resolve(data)
				}).
				error(function(data, status, headers, config){
					deferred.reject(status)
				});

			return deferred.promise;
		},

		getUsers: function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: '/users.json'}).
				success(function(data, status, headers, config){
					deferred.resolve(data)
				}).
				error(function(data, status, headers, config){
					deferred.reject(status)
				});

			return deferred.promise;
		}
		
	}
});
