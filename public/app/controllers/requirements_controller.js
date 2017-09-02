app.controller('RequirementsController', function ($scope, $http, $route, $location, $ngConfirm, RequirementService, toastr) {
	this.index = '/requirements';
	this.title = {
		new:  'Nuevo Requisito',
		edit: 'Editar Requisito'
	}

	this.validation = function () {
		var data = $scope.data;
		var invalid = false;

		if (! data.name) {
			invalid = toastr.warning('Nombre requerido', 'Validaciones');
		}

		return (invalid) ? false : data;
	}

	// model data
	$scope.data = {
		id:  0,
		name: ''
	};

	$scope.filters = {
		active: '1'
	};

	BaseController.call(this, $scope, $route, $location, $ngConfirm, RequirementService, toastr);
});