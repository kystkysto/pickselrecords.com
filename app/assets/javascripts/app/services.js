(function() {

	'use strict';

	angular.module('Admin.services')

		.factory('Release',Release)

		.factory('Artist',Artist);

	function Release($resource) {
		var Release = $resource('/releases/:id.json', {id: '@id'}, {
			update: {
				method: 'PUT'
			}
		});

		return Release;
	}

	function Artist($resource) {
		var Artist = $resource('/artists/:id.json', {id: '@id'}, {
			update: {
				method: 'PUT'
			}
		});

		return Artist;
	}

})();