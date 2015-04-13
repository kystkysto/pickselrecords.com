define(["ractive", "preserve", "jquery", "touch", "fade", "text!/tmpl/home.html"], function (Ractive, preserve, $, Touch, Fade, tmpl) {
	
	'use strict';

	var Home = Ractive.extend({

		template: tmpl,
		el: "content",
		
		data: {
			ang: 0,
			sc: 0,
			item: 2,
			count: 18,
			panel: 480,
			tz: 0,
			spin: 1,
			small: 0,
			dummies: [
				{
					plate:"gray.png",
					rot:0,
					gray:100,
					blur:5,
					annonce: "uknown",
					txt: "uknown",
					title: "uknown:",
					cover: "unknown.png"
				}
			],
			releases: [],
/*			releases: [
				{
					annonce: "coming soon",
					cover: "img/release/cover/slobodanzivanovic.png",
					logo: "img/release/logo/lightblue.png",
					title: "SLobodan Zivanovic - Moon EP",
					txt: "</br>Moon - Original Mix</br>Moon - L<span class='lotte'>ø</span>tte Remix</br>Street - Original Mix</br>Street - Radu Mirica Remix",
					current: 0,
					player: '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/83403109&amp;color=01dac3&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>'
				},
				{
					annonce: "out now",
					cover: "img/release/cover/vladimirmarinkovic.png",
					logo: "img/release/logo/white.png",
					title: "Vladimir Marinkovic - Midnight Hunter EP",
					txt: "</br>Remixes:</br>Overshift</br>Little Black Dress</br>Ian Tribb",
					current: 1,
					player: '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/77712775&amp;color=01dac3&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>'
				},
				{
					annonce: "02.09.2015",
					cover: "img/release/cover/julianflores.png",
					logo: "img/release/logo/orange.png",
					title: "Julian Flores - Lowjam EP",
					txt: "</br>Remixes:</br>Agustin Cooper</br>Flyhigher</br>Emiliano Ferreyra",
					//txt: "Battric  Mivu, Coriesu, Reelow, F.eht, Demika, Dejvid, Manna From Sky, Monreal  Horn, Duky, Radu Mirica, Phil Cole, Mr. Deka, Rawness, Yanee, Simone Liberali, Matt Rich, Jerome.C, Ramiro Felippe, Joseph Krause, Lohan P.Raw",
					current: 0,
					player: '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/73635860&amp;color=01dac3&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>'
				},
				{
					annonce: "19.01.2015",
					cover: "img/release/cover/vedrankomm.png",
					logo: "img/release/logo/blue.png",
					title: "Vedran Komm - Sickness Dub EP",
					txt: "</br>Remixes:</br>Dejvid</br>Patresse</br>Markus Horn",
					//txt: "Shaf Huse, Radu Mirica, Daniel Jef, Reelow, Sebastian Olano, Philip Wolgastm Coriesu, Lohan P.Raw, James Hutchison, Rawness, Battric Mivu, Ian Tribb, Joseph Krause, Ramiro Felippe, Peter Lavallem Overshift, Julian Flores, Slobadan Zhivanovich",
					current: 0,
					player: '<iframe width="100%" height="450" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/65456554&amp;color=01dac3&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>'
				}
			]*/
		},

		onconstruct: function() {
			var self = this;

			$.get('/data/releases.json',function(data) {
				self.set('releases',data);

				if(parseInt(window.getComputedStyle(window.document.body,null).getPropertyValue("width")) <= 480) {
					self.set("small", 1)
				}
				if(preserve()) {
					var carousel = self.nodes.carousel;

					self.set("panel",parseInt(window.getComputedStyle(carousel,null).getPropertyValue("width")));

					self.fillDumies();

				} else {
					self.set("spin", 0)
				}

				self.on({
					left: function(e) {
						if(self.data.spin) self.setAng(self.get("ang")-(360/this.data.count));
					},

					right: function(e) {
						if(self.data.spin) self.setAng(self.get("ang")+(360/this.data.count));
					},

					player: function() {
						self.set("sc",!self.get("sc"));
						$('html, body').animate({
							scrollTop: $("#player").offset().top
						}, 2000);
					}
				});
			});
		},

/*		onrender: function() {

		},*/

		oncomplete: function() {
			this.set("style","-webkit-transition: all 2s cubic-bezier(0.4, 1, 0.2, 1);-moz-transition: all 2s cubic-bezier(0.4, 1, 0.2, 1);-o-transition: all 2s cubic-bezier(0.4, 1, 0.2, 1);transition: all 2s cubic-bezier(0.4, 1, 0.2, 1);");
		},

		setAng: function(ang) {
			var self = this;
			var prev = self.get("item");
			var item = this.get("item");

			if(self.get("ang") < ang) ++item;
			else --item;

			if(item==self.data.releases.length+1) return;//i = 0;
			else if(item==-1) return;//i = self.get("count")-1;
			
			if(self.get("releases["+(item-1)+"]")) {
				self.set("dummies["+item+"].plate",self.get("releases["+(item-1)+"].logo"));
			}

			self.set("item",item);			
			self.set("ang", ang);

			self.set("dummies["+prev+"].gray", 100);
			self.set("dummies["+prev+"].plate", "gray.png");
			self.set("dummies["+prev+"].blur", 5);

			self.set("dummies["+item+"].gray", 0);
			self.set("dummies["+item+"].blur", 0);

			self.set("sc",0);	
			

		},

		itemsZ: function() {
			this.set("tz", Math.round((this.data.panel/2)/Math.tan(((Math.PI*2)/this.data.count)/2)));
		},

		fillDumies: function() {
			this.itemsZ();

			var ang = -(360/this.data.count);
			for(var i = 1; i < this.data.count; i++) {
				
				var gray = 100;
				var blur = 5;

				var logo ="gray.png";

				if(this.data.releases[i-1]) {
					this.set("dummies["+i+"]", this.get("releases["+(i-1)+"]"));
					if(this.get("releases["+(i-1)+"].current")) {
						this.set("ang", Math.abs(ang));
						this.set("item", i);
						logo = this.get("releases["+(i-1)+"].logo");
						gray = 0;
						blur = 0;
					}
				} else {
					this.set("dummies["+i+"]",{});
				}
				
				this.set("dummies["+i+"].plate", logo);
				
				this.set("dummies["+i+"].gray", gray);
				this.set("dummies["+i+"].blur", blur);
				
				this.set("dummies["+i+"].rot", ang);

				ang -= (360/this.data.count);
			}
		}
	});

	return Home;
});