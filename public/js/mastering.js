define(["ractive", "text!/tmpl/mastering.html"], function (Ractive, tmpl) {
	
	'use strict';

	var Mastering = Ractive.extend({

		template: tmpl,
		el: "content",

		data: {
			small: 0
		},

		onrender: function() {
			var self = this;
			if(parseInt(window.getComputedStyle(window.document.body,null).getPropertyValue("width")) <= 480) {
				self.set("small", 1);
			}
		}
	});

	return Mastering;
});