app.controller('ActivitiesController', function ($scope, $http, $route, $location, $ngConfirm, ActivityService, SectorService, toastr) {
	this.index = '/activities';
	this.title = {
		new:  'Nueva Actividad',
		edit: 'Editar Actividad'
	}

	this.validation = function () {
		var data = $scope.data;
		var invalid = false;

		if (! data.name) {
			invalid = toastr.warning('Nombre requerido', 'Validaciones');
		}

		if (! data.sector_id) {
			invalid = toastr.warning('Sector requerido', 'Validaciones');
		}

		return (invalid) ? false : data;
	}

	// model data
	$scope.data = {
		id:  0,
		name: '',
		sector_id: ''
	};

	$scope.filters = {
		active: '1'
	};

	$scope.sectorsList = [];

	$scope.getSectors = function () {
        var filters = [{ 
            field: 'active', 
            value: 1
        }];

		SectorService.read({ filters: filters })
			.success(function (response) {
				$scope.sectorsList = response;
			}).error(function (response) {
				toastr.error(response.msg || 'Error en el servidor');
			});
	}

	$scope.getSectors();

	BaseController.call(this, $scope, $route, $location, $ngConfirm, ActivityService, toastr);
});