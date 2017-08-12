app.controller('ComponentsController', function ($scope, $http, $route, $location, $ngConfirm, ComponentService, WindowService, toastr) {
	this.index = '/components';
	this.title = {
		new:  'Nuevo Componente',
		edit: 'Editar Componente'
	}

	this.validation = function () {
		var data = $scope.data;
		var invalid = false;

		if (! data.name) {
			invalid = toastr.warning('Nombre requerido', 'Validaciones');
		}

		if (! data.window_id) {
			invalid = toastr.warning('Ventanilla requerida', 'Validaciones');
		}

		return (invalid) ? false : data;
	}

	// model data
	$scope.data = {
		id:  0,
		name: '',
		window_id: ''
	};

	$scope.filters = {
		active: '1'
	};

	$scope.windowsList = [];

	$scope.getWindows = function () {
        var filters = [{ 
            field: 'active', 
            value: 1
        }];

		WindowService.read({ filters: filters })
			.success(function (response) {
				$scope.windowsList = response;
			}).error(function (response) {
				toastr.error(response.msg || 'Error en el servidor');
			});
	}

	$scope.getWindows();

	BaseController.call(this, $scope, $route, $location, $ngConfirm, ComponentService, toastr);
});