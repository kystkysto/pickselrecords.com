(function() {
	
	'use strict';

	angular.module('Admin', ['ngRoute', 'ngResource', 'Admin.controllers', 'Admin.services', 'Admin.directives']);

	angular.module('Admin.controllers', ['angularFileUpload','ngSanitize']);

	angular.module('Admin.services', []);

	angular.module('Admin.directives', []);

	angular.module('Admin')

		.config(config);

	function config($routeProvider) {
		$routeProvider

			.when('/releases', {
				templateUrl: '/tmpl/release.html',
				controller: 'ReleaseController',
				controllerAs: 'Release',
				resolve: {
					releases: function(Release) {
						return Release.query();
					},

					route: function() {
						return 0;
					}
				}
			})
			.when('/artists', {
				templateUrl: '/tmpl/artist.html',
				controller: 'ArtistController',
				controllerAs: 'Artist',
				resolve: {
					artists: function(Artist) {
						return Artist.query();
					},

					route: function() {
						return 1;
					}
				}
			})

			.otherwise({redirectTo: '/releases'});
	}

})();