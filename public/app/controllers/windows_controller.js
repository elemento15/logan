app.controller('WindowsController', function ($scope, $http, $route, $location, $ngConfirm, WindowService, toastr) {
	this.index = '/windows';
	this.title = {
		new:  'Nueva Ventanilla',
		edit: 'Editar Ventanilla'
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

	$scope.filters = {};

	BaseController.call(this, $scope, $route, $location, $ngConfirm, WindowService, toastr);
});