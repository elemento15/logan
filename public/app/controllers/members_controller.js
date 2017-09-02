app.controller('MembersController', function ($scope, $http, $route, $location, $ngConfirm, MemberService, toastr) {
	this.index = '/members';
	this.title = {
		new:  'Nuevo Integrante',
		edit: 'Editar Integrante'
	}

	this.validation = function () {
		var data = $scope.data;
		var invalid = false;

        if (data.mobile && isNaN(data.mobile)) {
			invalid = toastr.warning('Celular debe contener solo dígitos', 'Validaciones');
        }
		
        if (data.phone && isNaN(data.phone)) {
			invalid = toastr.warning('Teléfono debe contener solo dígitos', 'Validaciones');
        }

		if (data.email && ! app.regexpEmail.test(data.email)) {
			invalid = toastr.warning('Formato de email inválido', 'Validaciones');
        }
		
		if (! data.name) {
			invalid = toastr.warning('Nombre requerido', 'Validaciones');
		}

		if (data.name && data.name.length < 10){
			invalid = toastr.warning('Nombre demasiado corto', 'Validaciones');
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