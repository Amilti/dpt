app.factory('characterData', function($http, $q){
	return {
		getCharacters: function(){
			var deferred = $q.defer();
			$http({method: 'GET', url: '/characters.json'}).
				success(function(data, status, headers, config){
					deferred.resolve(data)
				}).
				error(function(data, status, headers, config){
					deferred.reject(status)
				});

			return deferred.promise;
		},
		
	}
});
