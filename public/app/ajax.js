app.factory('WindowService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('windows/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('windows/'+ data.id, data) : $http.post('windows', data);
		},
		read     : function(data) {
			return $http.get('windows?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('windows/'+ data.id);
		},
		activate : function(data) {
			return $http.post('windows/'+ data.id +'/activate');
		},
		deactivate : function(data) {
			return $http.post('windows/'+ data.id +'/deactivate');
		}
	} 
}]);

app.factory('ComponentService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('components/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('components/'+ data.id, data) : $http.post('components', data);
		},
		read     : function(data) {
			return $http.get('components?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('components/'+ data.id);
		},
		activate : function(data) {
			return $http.post('components/'+ data.id +'/activate');
		},
		deactivate : function(data) {
			return $http.post('components/'+ data.id +'/deactivate');
		}
	} 
}]);

app.factory('SectorService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('sectors/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('sectors/'+ data.id, data) : $http.post('sectors', data);
		},
		read     : function(data) {
			return $http.get('sectors?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('sectors/'+ data.id);
		},
		activate : function(data) {
			return $http.post('sectors/'+ data.id +'/activate');
		},
		deactivate : function(data) {
			return $http.post('sectors/'+ data.id +'/deactivate');
		}
	} 
}]);