define(["ractive"], function (Ractive) {
	
	'use strict';

	var Soon = Ractive.extend({	

		template: '<section><h1 class="gray-blur middle soon">Coming soon...</h1><section>',
		el: "content"
	});

	return Soon;
});