(function () {

	require.config({

		baseUrl: 'js',

		paths: {
			"jquery" : "//yastatic.net/jquery/2.1.1/jquery.min",
			'Modernizr': '/js/modernizr'
			//,			'ractive' : 'http://cdn.ractivejs.org/latest/ractive'
		},
		

		shim: {
			'Modernizr': {
				exports: 'Modernizr'
			}
		}	
		//urlArgs: "bust=" + (new Date()).getTime()
	});

	require(["ractive", "home","mastering","artists","soon","header"], function(Ractive ,Home, Mastering, Artists, Soon, Header) {

		var header = new Header();

		Ractive.partials.social = '<section><div class="{{#if !small}}gray-blur{{/if}} middle social"><div class="cubic facebook"><a target="_blank" href="https://www.facebook.com/pick.sel.underground?fref=ts"><span class="cubic"></span></a></div><div class="cubic soundcloud"><a target="_blank" href="https://soundcloud.com/pickselrecords/"><span class="cubic"></span></a></div><div class="beatport"><a target="_blank" href="https://pro.beatport.com/label/pick-sel-records/45304"><span class="cubic"></span></a></div></div></section>';

		window.onhashchange = hashChaged;

		hashChaged();

		function hashChaged() {
			if (location.hash === "#!home" || location.hash === "") {
				var home = new Home();
			} else if(location.hash === "#!mastering") {
				var mastering = new Mastering();
			} else if(location.hash === "#!artists") {
				var artists = new Artists();
			} else {
				var soon = new Soon();
			}
		}
	});
})();