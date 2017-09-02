app.controller('ProjectsController', function ($scope, $http, $route, $location, $ngConfirm, ProjectService, toastr) {
	this.index = '/projects';
	this.title = {
		new:  'Nuevo Proyecto',
		edit: 'Editar Proyecto'
	}

	this.validation = function () {
		var data = $scope.data;
		var invalid = false;

		if (data.name && data.name.length < 10){
			invalid = toastr.warning('Nombre demasiado corto', 'Validaciones');
		}

		return (invalid) ? false : data;
	}

	// model data
	$scope.data = {
		id:  0,
		name: '',
		code: '',
		window_id: '',
		component_id: '',
		sector_id: '',
		activity_id: '',
		project_date: '',
		location: '',
		has_act: 0,
		has_evaluation: 0,
		amount: 0,
		comments: ''
	};

	$scope.filters = {
		active: '1'
	};

	BaseController.call(this, $scope, $route, $location, $ngConfirm, ProjectService, toastr);
});