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

/*
app.factory('UserService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('users/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('users/'+ data.id, data) : $http.post('users', data);
		},
		read     : function(data) {
			return $http.get('users?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('users/'+ data.id);
		},
		activate : function(data) {
			return $http.post('users/'+ data.id +'/activate');
		},
		deactivate : function(data) {
			return $http.post('users/'+ data.id +'/deactivate');
		},
		reset_pass : function (data) {
			return $http.post('users/'+ data.id +'/reset_pass', data);
		}
	} 
}]);*/


/*app.factory('StateService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('states/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('states/'+ data.id, data) : $http.post('states', data);
		},
		read     : function(data) {
			return $http.get('states?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('states/'+ data.id);
		}
	} 
}]);

app.factory('CityService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('cities/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('cities/'+ data.id, data) : $http.post('cities', data);
		},
		read     : function(data) {
			return $http.get('cities?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('cities/'+ data.id);
		}
	} 
}]);

app.factory('PeriodService', ['$http', function($http) {
	return {
		get      : function (data) {
			return $http.get('periods/'+ data.id);
		},
		save     : function (data) {
			return (data.id) ? $http.patch('periods/'+ data.id, data) : $http.post('periods', data);
		},
		read     : function(data) {
			return $http.get('periods?'+ jQuery.param(data), data);
		},
		delete   : function(data) {
			return $http.delete('periods/'+ data.id);
		},
		generate : function(data) {
			return $http.post('periods/generate', data);
		}
	} 
}]);
*/