app.controller('ProjectsController', function ($scope, $http, $route, $location, $ngConfirm, toastr, $uibModal,
	                                           ProjectService, WindowService, ComponentService, SectorService, 
	                                           ActivityService, RequirementService, MemberService) {
	this.index = '/projects';
	this.title = {
		new:  'Nuevo Proyecto',
		edit: 'Editar Proyecto'
	}

	this.validation = function () {
		var data = $scope.data;
		var invalid = false;
		var representative = false;

		if (! data.name) {
			invalid = toastr.error('Nombre requerido', 'Validaciones');
		}

		if (data.name && data.name.length < 10){
			invalid = toastr.error('Nombre demasiado corto', 'Validaciones');
		}

		if (! data.code) {
			invalid = toastr.error('Código requerido', 'Validaciones');
		}

		if (data.code && data.code.length < 5){
			invalid = toastr.error('Código demasiado corto', 'Validaciones');
		}

		if (! data.amount || data.amount == 0) {
			invalid = toastr.error('Cantidad requerida', 'Validaciones');
		}

		if (! data.activity_id) {
			invalid = toastr.error('Actividad requerida', 'Validaciones');
		}

		if (! data.component_id) {
			invalid = toastr.error('Componente requerido', 'Validaciones');
		}

		if (! data.requirements || data.requirements.length < 1) {
			invalid = toastr.error('Agregue por lo menos 1 requisito', 'Validaciones');
		}

		if (! data.members || data.members.length < 1) {
			invalid = toastr.error('Agregue por lo menos 1 integrante', 'Validaciones');
		} else {
			// one member must be representative
			data.members.forEach(function (item) {
				if (item.pivot && item.pivot.representative) {
					representative = true;
				}
			});

			if (! representative) {
				invalid = toastr.error('Asigne un integrante como representante', 'Validaciones');
			}
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
		comments: '',
		requirements: [],
		members: []
	};

	$scope.filters = {
		active: '1',
		status: 'P'
	};

	$scope.member = {
		id: 0,
		name: '',
		curp: '',
		email: '',
		phone: '',
		mobile: ''
	};

	$scope.selectionMember = {
		id: 0
	};

	$scope.selRequirement = '';

	$scope.tab = 'C';
	$scope.windowsList = [];
	$scope.componentsList = [];
	$scope.sectorsList = [];
	$scope.activitiesList = [];
	$scope.requirementsList = [];

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

	$scope.getRequirements = function () {
		var filters = [{ 
            field: 'active', 
            value: 1
        }];

		RequirementService.read({ filters: filters })
			.success(function (response) {
				$scope.requirementsList = response;
			}).error(function (response) {
				toastr.error(response.msg || 'Error en el servidor');
			});
	}

	$scope.addRequirement = function () {
		var selected = $scope.selRequirement;
		var reqs = $scope.requirementsList;
		var added = $scope.data.requirements;
		var exists = false;

		// can't add twice the same requirement
		added.forEach(function (item) {
			if (item.id == selected) {
				exists = true;
			}
		});

		if (! exists) {
			reqs.forEach(function (item) {
				if (item.id == selected) {
					$scope.data.requirements.push({
						id: item.id,
						name: item.name
					});
				}
			});
		} else {
			toastr.warning('El requisito ya se agregó', 'Validaciones');
		}
	}

	$scope.removeRequirement = function (index) {
		// delete by index
		$scope.data.requirements.splice(index, 1);
	}

	$scope.searchMemberName = function (evt) {
		var name;

		if (evt.keyCode == 13) {
			evt.preventDefault();

			name = $scope.member.name;

			MemberService.search_name({
				name: name
			}).success(function (response) {
				if (response.success) {
					if (response.member) {
						$scope.setMember(response.member);
						$('#btnAddMember').focus();
					} else {
						$scope.openMemberSearch(name);
					}
				} else {
					toastr.warning(response.msg);
					$scope.clearMember();
				}
			}).error(function (response) {
				toastr.error(response.msg || 'Error en el servidor');
			});
		}
	}

	$scope.openMemberSearch = function (search) {
		var modal = $uibModal.open({
			ariaLabelledBy: 'modal-title',
			ariaDescribedBy: 'modal-body',
			templateUrl: '/partials/_tpls/modal_members.html',
			controller: 'ModalMembersSearch',
			controllerAs: '$ctrl',
			resolve: {
				items: function () {
					return {
						search: search || ''
					};
				}
			}
		});

		modal.result.then(function (member) {
			if (member) {
				$scope.setMember(member);
				$('#btnAddMember').focus();
			}
		});
	}

	$scope.addMember = function () {
		var member = $scope.member;
		var added = $scope.data.members;
		var exists = false;

		if (! member.id) {
			toastr.warning('Seleccione un integrante válido');
			$('input[ng-model="member.name"]').focus().select();
			return false;
		}

		// can't add twice the same requirement
		added.forEach(function (item) {
			if (item.id == member.id) {
				exists = true;
			}
		});

		if (! exists) {
			$scope.data.members.push({
				id: member.id,
				name: member.name,
				curp: member.curp,
				email: member.email,
				phone: member.phone,
				mobile: member.mobile,
				pivot: {}
			});
		} else {
			toastr.warning('El integrante ya se agregó', 'Validaciones');
		}

		$scope.clearMember();
		$('input[ng-model="member.name"]').focus().select();
	}

	$scope.removeMember = function (index) {
		// delete by index
		$scope.data.members.splice(index, 1);
	}

	$scope.setMember = function (rec) {
		$scope.member = {
			id: rec.id,
			name: rec.name,
			curp: rec.curp,
			email: rec.email,
			phone: rec.phone,
			mobile: rec.mobile
		};
	}

	$scope.clearMember = function () {
		$scope.member = {
			id: 0,
			name: '',
			curp: '',
			email: '',
			phone: '',
			mobile: ''
		};
	}

	$scope.setRepresentative = function (key) {
		var members = $scope.data.members;

		members.forEach(function (item, index) {
			if (index == key) {
				item.pivot.representative = 1;
			} else {
				item.pivot.representative = 0;
			}
		});
	}

	$scope.selectMember = function (rec) {
		// 
		$scope.selectionMember = rec;
	}

	$scope.isReceived = function (requirement) {
		var docs = $scope.data.docs_received || [];
		var member = $scope.selectionMember;
		var received = false;

		docs.forEach(function (item) {
			if (member.id == item.member_id && requirement.id == item.requirement_id) {
				received = item.received;
			}
		});

		return received;
	}

	$scope.getUnreceived = function (member) {
		var unreceived = 0;
		var docs = $scope.data.docs_received || [];

		docs.forEach(function (item) {
			if (member.id == item.member_id && item.received == 0) {
				unreceived++;
			}
		});

		return unreceived;
	}

	$scope.changeReceived = function (requirement, value) {
		console.log('CHANGE RECEIVED')
	}


	$scope.$on('$viewContentLoaded', function (view) {
		$scope.getWindows();
		$scope.getSectors();
		$scope.getRequirements();
	});

	BaseController.call(this, $scope, $route, $location, $ngConfirm, ProjectService, toastr);
});