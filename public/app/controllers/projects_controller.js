app.controller('ProjectsController', function ($scope, $http, $route, $location, $ngConfirm, toastr, ProjectService, 
	                                           WindowService, ComponentService, SectorService, ActivityService) {
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
		active: '1',
		status: 'P'
	};

	$scope.tab = 'C';
	$scope.windowsList = [];
	$scope.componentsList = [];
	$scope.sectorsList = [];
	$scope.activitiesList = [];

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

	$scope.getComponents = function () {
        var filters = [
        	{ 
            	field: 'active', 
            	value: 1
        	},{
        		field: 'window_id',
        		value: $scope.data.window_id
        	}

        ];

		ComponentService.read({ filters: filters })
			.success(function (response) {
				$scope.data.component_id = '';
				$scope.componentsList = response;
			}).error(function (response) {
				toastr.error(response.msg || 'Error en el servidor');
			});
	}

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

	$scope.getActivities = function () {
        var filters = [
        	{ 
            	field: 'active', 
            	value: 1
        	},{
        		field: 'sector_id',
        		value: $scope.data.sector_id
        	}

        ];

		ActivityService.read({ filters: filters })
			.success(function (response) {
				$scope.data.activity_id = '';
				$scope.activitiesList = response;
			}).error(function (response) {
				toastr.error(response.msg || 'Error en el servidor');
			});
	}

	$scope.$on('$viewContentLoaded', function (view) {
		$scope.getWindows();
		$scope.getSectors();
	});

	BaseController.call(this, $scope, $route, $location, $ngConfirm, ProjectService, toastr);
});