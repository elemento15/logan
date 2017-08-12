app.controller('MembersController', function ($scope, $http, $route, $location, $ngConfirm, MemberService, toastr) {
	this.index = '/members';
	this.title = {
		new:  'Nuevo Integrante',
		edit: 'Editar Integrante'
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
		name: '',
		curp: '',
		gender: 'H',
		phone: '',
		mobile: '',
		email: '',
		address: '',
		comments: ''
	};

	$scope.filters = {
		active: '1'
	};

	BaseController.call(this, $scope, $route, $location, $ngConfirm, MemberService, toastr);
});