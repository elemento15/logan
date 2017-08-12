var app = angular.module('mainApp', ['ngRoute', 'ui.bootstrap', 'ui.select', 'toastr', 'cp.ngConfirm']);

app.config(function ($routeProvider, $provide, toastrConfig) {
	angular.extend(toastrConfig, {
		autoDismiss: false,
		containerId: 'toast-container',
		maxOpened: 0,    
		newestOnTop: true,
		positionClass: 'toast-bottom-right',
		preventDuplicates: false,
		preventOpenDuplicates: false,
		target: 'body'
	});
	
	$routeProvider
		.when('/',{
				controller: 'HomeController',
				templateUrl: '/partials/home.html'
			})
		.when('/accounts',{
				controller: 'AccountsController',
				templateUrl: '/partials/accounts/index.html'
			})
		.when('/accounts-new',{
				controller: 'AccountsController',
				templateUrl: '/partials/accounts/edit.html'
			})
		.when('/accounts-edit/:id',{
				controller: 'AccountsController',
				templateUrl: '/partials/accounts/edit.html'
			})

		.otherwise({ redirectTo: '/' });

	// regular expression definitions
	app.regexpRFC = /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/;
	app.regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
});
