define(["ractive", "text!/tmpl/artists.html"], function (Ractive, tmpl) {
	
	'use strict';

	var Artists = Ractive.extend({

		template: tmpl,
		el: "content",

		data: {
			small: 0,
			artists: []
		},

		onconstruct: function() {
			var self = this;
			$.get('/data/artists.json',function(data) {
				self.set('artists',data);
				if(parseInt(window.getComputedStyle(window.document.body,null).getPropertyValue("width")) <= 480) {
					self.set("small", 1)
				}
			});
		}
	});

	return Artists;
});