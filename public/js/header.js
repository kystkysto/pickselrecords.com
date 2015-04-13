define(["ractive", "jquery", "touch", "fade", "typewriter"], function (Ractive, $, Touch, Fade, Typewriter) {
	
	'use strict';

	var Header = Ractive.extend({

		template: "#headerTmpl",
		el: "header",
		
		data: {
			lines: 1,
			small: 0,
			height: 0,
			nav: 0
		},

		onrender: function() {
			var self = this;

			if(parseInt(window.getComputedStyle(window.document.body,null).getPropertyValue("width")) <= 480) {
				self.set("small", 1)
			}

			self.on({
				toogle: function(e) {
					if(self.get("lines")) {
						self.set("height", 360).then(function() {
							self.set("nav", 1);
						});
						self.set("lines", 0).then(function() {
							self.set("cross", 1);
						});
					} else if(self.get("cross")) {
						self.set("nav", 0).then(function() {
							self.set("height", 0);
						});
						self.set("cross", 0).then(function() {
							self.set("lines", 1);
						});
					}
				}
			});
		}
	});

	return Header;
});